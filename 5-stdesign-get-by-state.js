const {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

(async () => {
  try {
    console.time("querytime");
    const results = await client.send(
      new QueryCommand({
        TableName: "GenericAppName",
        IndexName: "GSI1",
        KeyConditionExpression: "#S = :S",
        ExpressionAttributeNames: { "#S": "GSI1PK" },
        ExpressionAttributeValues: {
          ":S": { S: "STATE#SC" },
        },
      })
    );
    console.log(results.Items?.length);
    console.timeEnd("querytime");
  } catch (err) {
    console.error(err);
  }
})();
