import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";


// Initialize the SQS client
const sqsClient = new SQSClient({ region: 'us-west-1' });
const queueUrl = "https://sqs.us-west-1.amazonaws.com/641987980875/pump-engine-dev";

const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_DB_REGION });
const s3Client = new S3Client({ region: process.env.AWS_BUCKET_REGION });

export const handler = async (event) => {
  const authHeader = event.headers?.Authorization || event.headers?.authorization;
  const token = authHeader?.split(' ')[1];
  console.log("Received token:", token);

  if (!token || token !== process.env.API_TOKEN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid or missing token' }),
    };
  }

  try {
    console.log(event.body)

    // Decode the base64 encoded event body
    const decoded = Buffer.from(event.body, 'base64').toString('utf-8');

    // Split the decoded string by newlines to get individual lines
    const lines = decoded.split('\n');

    // The first line is the boundary
    const boundary = lines[0].trim();

    // Split the decoded content by boundary to get individual parts
    const parts = decoded.split(boundary);

    // Find the part that contains the CSV data
    const csvPart = parts.find(part => {
      const isCsvFile = /filename=".*\.csv"/i.test(part);
      const isTextCsv = /Content-Type: text\/csv/i.test(part);
      return isCsvFile && isTextCsv;
    });

    // If no CSV part found, handle the error
    if (!csvPart) {
      console.error('CSV part not found');
      return;
    }

    const csvContent = csvPart.split('\n').slice(4).join('\n').trim();
    console.log(csvContent);
    const csvLines = csvContent.split('\n');
    const headers = csvLines[0].split(';');
    const parsedRows = [];

    for (let i = 1; i < csvLines.length; i++) {
      const values = csvLines[i].split(';');
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = values[j];
      }
      parsedRows.push(obj);
    }

    console.log('CSV parsed:', parsedRows);
    const batchName = event.headers['X-Batch'] || event.headers['x-batch'] || "";

    const listParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: batchName + '/',
    };
    const listObjectsOutput = await s3Client.send(new ListObjectsV2Command(listParams));

    const fileList = listObjectsOutput.Contents;
    const fileKeys = [];

    if (fileList && fileList.length > 0) {
      for (const file of fileList) {
        const objectKey = file.Key;

        // Skip if objectKey is not available or if it's the folder itself
        if (!objectKey || objectKey === batchName + '/') {
          continue;
        }

        // Add object key to array
        fileKeys.push(objectKey);
      }
    } else {
      console.log("No files found.");
    }

    // Log or return the list of object keys
    console.log("Files:", fileKeys);

    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    for (const key of fileKeys) {

      // Upload data to DynamoDB
      for (const row of parsedRows) {

        // Insert a record into DynamoDB
        const receivedPrompt = row.prompt;
        const receivedNegPrompt = row.negative_prompt;
        const numInferenceSteps = row.num_inference_steps;
        const adapterConditioningScale = row.adapter_conditioning_scale;
        const adapterConditioningFactor = row.adapter_conditioning_factor;
        const guidanceScale = row.guidance_scale;
        const seed = parseInt(row.seed) === -1 ? Math.floor(Math.random() * 1000000) : row.seed;

        // Insert a record into DynamoDB
        const uid = uuidv4();
        const dynamoParams = {
          TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
          Item: {
            'image_id': { S: uid },
            'user_id': { S: 'system' },
            'status': { S: 'REQUESTED' },
            'created_at': { N: `${Math.floor(Date.now() / 1000)}` },
            'updated_at': { N: `${Math.floor(Date.now() / 1000)}` },
            'prompt': { S: receivedPrompt },
            'negative_prompt': { S: receivedNegPrompt },
            'num_inference_steps': { N: numInferenceSteps.toString() },
            'adapter_conditioning_factor': { N: adapterConditioningFactor.toString() },
            'adapter_conditioning_scale': { N: adapterConditioningScale.toString() },
            'guidance_scale': { N: guidanceScale.toString() },
            'seed': { N: seed.toString() },
            'url': { S: 'https://'+ process.env.AWS_S3_BUCKET_NAME + '.s3.' + process.env.AWS_BUCKET_REGION + '.amazonaws.com/' + key },
          }
        };
        console.log("DynamoDB params:", dynamoParams);
        const putItemResult = await dynamoDBClient.send(new PutItemCommand(dynamoParams));
        console.log('DynamoDB Put Item result:', putItemResult);

        // Send the message to the SQS queue
        const SQS_params = {
          MessageBody: uid,
          QueueUrl: queueUrl,
        };

        const send_data = await sqsClient.send(new SendMessageCommand(SQS_params));
        console.log("Message sent successfully", send_data);

        await sleep(500);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'CSV uploaded and processed successfully',
      }),
    };

  } catch (err) {
    // Handle errors
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server Error', error: err.message }),
    };
  }
};
