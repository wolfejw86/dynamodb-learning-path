const {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ endpoint: "http://localhost:8000" });

(async () => {
  try {
    console.time("querytime");
    const results = await client.send(
      new QueryCommand({
        TableName: "ChickfiletLocations",
        IndexName: "StoreLocationIndex",
        KeyConditionExpression: "#S = :S AND begins_with(#cp, :city)",
        ExpressionAttributeNames: { "#S": "State", "#cp": "CityPostalcode" },
        ExpressionAttributeValues: {
          ":S": { S: "SC" },
          ":city": { S: "Spart" },
        },
      })
    );
    console.log(results.Items.forEach((item) => console.log(item.Website)));
    console.timeEnd("querytime");
  } catch (err) {
    console.error(err);
  }
})();
