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

      const receivedPrompt = event.headers['X-Prompt'] || event.headers['x-prompt'] || " ";
      const receivedNegPrompt = event.headers['X-Neg-Prompt'] || event.headers['x-neg-prompt'] || " ";
      const numInferenceSteps = event.headers['X-Num-Inference-Steps'] || event.headers['x-num-inference-steps'] || "25";
      const adapterConditioningScale = event.headers['X-Adapter-Conditioning-Scale'] || event.headers['x-adapter-conditioning-scale'] || "0.5";
      const adapterConditioningFactor = event.headers['X-Adapter-Conditioning-Factor'] || event.headers['x-adapter-conditioning-factor'] || "0.8";
      const guidanceScale = event.headers['X-Guidance-Scale'] || event.headers['x-guidance-scale'] || "7.5";

      let seed = event.headers['X-Seed'] || event.headers['x-seed'] || "-1";
      seed = seed === "-1" ? String(Math.floor(Math.random() * 1000000)) : seed;

      console.log("Received prompt:", receivedPrompt);
      console.log("Received negative prompt:", receivedNegPrompt);
      console.log("Received numInferenceSteps:", numInferenceSteps);
      console.log("Received guidanceScale:", guidanceScale);
      console.log("Received adapterConditioningScale:", adapterConditioningScale);
      console.log("Received adapterConditioningFactor:", adapterConditioningFactor);
      console.log("Received seed:", seed);

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
          'adapter_conditioning_scale': { N: adapterConditioningScale },
          'adapter_conditioning_factor': { N: adapterConditioningFactor },
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

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Batch one submitted and processed successfully',
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
