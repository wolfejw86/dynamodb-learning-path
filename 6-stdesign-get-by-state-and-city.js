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
        KeyConditionExpression: "#S = :S AND begins_with(#cp, :city)",
        ExpressionAttributeNames: { "#S": "GSI1PK", "#cp": "GSI1SK" },
        ExpressionAttributeValues: {
          ":S": { S: "STATE#NC" },
          ":city": { S: "STORELOCATION#Charlotte" },
        },
      })
    );
    console.log(results.Items?.length);
    console.timeEnd("querytime");
  } catch (err) {
    console.error(err);
  }
})();
