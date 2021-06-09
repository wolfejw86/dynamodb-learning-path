const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ endpoint: "http://localhost:8000" });

(async () => {
  try {
    console.time("querytime");
    const results = await client.send(
      new GetItemCommand({
        TableName: "ChickfiletLocations",
        Key: { StoreId: { S: "03422" } },
      })
    );
    console.log(results);
    console.timeEnd("querytime");
  } catch (err) {
    console.error(err);
  }
})();
