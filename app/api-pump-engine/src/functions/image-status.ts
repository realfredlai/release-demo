import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize the AWS SDK clients
const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_DB_REGION });

export const handler = async (event) => {
  const authHeader = event.headers?.Authorization || event.headers?.authorization;
  const token = authHeader?.split(' ')[1];
  console.log("Received token:", token);

  // Retrieve the image ID from the path parameters
  const imageId = event.pathParameters?.id;
  if (!imageId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing image ID' }),
    };
  }

  console.log("Received image ID:", imageId); // Debugging line

  if (!token || token !== process.env.API_TOKEN) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid or missing token' }),
    };
  }

  try {
    // Define the get parameters
    const getParams = {
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
      Key: {
        "image_id": { S: imageId },
        "user_id": { S: "system" }
      }
    };
    console.log("getParams:", getParams); // Debugging line

    // Fetch the item from DynamoDB
    const data = await dynamoDBClient.send(new GetItemCommand(getParams));
    console.log("DynamoDB response:", data); // Debugging line

    // Extract the status from the fetched item
    const itemStatus = data.Item ? data.Item.status.S : null;

    if(itemStatus === null) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'call successful',
        itemStatus: itemStatus,
        imageId: imageId
      }),
    };

  } catch (err) {
    console.error("DynamoDB error: ", err);  // Debugging line
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
