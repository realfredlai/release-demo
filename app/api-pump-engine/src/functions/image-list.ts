import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

console.log("AWS_DB_REGION:", process.env.AWS_DB_REGION);
console.log("AWS_DYNAMODB_TABLE_NAME:", process.env.AWS_DYNAMODB_TABLE_NAME);

// Initialize the AWS SDK clients
const dynamoDBClient = new DynamoDBClient({ region: process.env.AWS_DB_REGION });

async function getLastFiveHundredImages() {

  const queryParams = {
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
    IndexName: 'user_id-updated_at-index',
    KeyConditionExpression: "#uid = :userId",
    ExpressionAttributeNames: {
      "#uid": "user_id",
    },
    ExpressionAttributeValues: {
      ":userId": { S: 'system' },
    },
    ScanIndexForward: false,
    Limit: 500,
  };

  try {
    const data = await dynamoDBClient.send(new QueryCommand(queryParams));

    if (data.Items) {
      return data.Items;
    } else {
      console.warn("No items found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw new Error("Failed to fetch data");
  }
}

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
    const data = await getLastFiveHundredImages();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Query successful',
        itemData: data
      }),
    };

  } catch (err) {
    console.error("DynamoDB error: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
