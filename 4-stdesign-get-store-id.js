const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

(async () => {
  try {
    console.time("querytime");
    const results = await client.send(
      new GetItemCommand({
        TableName: "GenericAppName",
        Key: { PK: { S: "STOREID#03422" }, SK: { S: "STOREID#03422" } },
      })
    );
    console.log(results);
    console.timeEnd("querytime");
  } catch (err) {
    console.error(err);
  }
})();
