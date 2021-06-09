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

// city too
// (async () => {
//   try {
//     console.time("querytime");
//     const results = await client.send(
//       new QueryCommand({
//         TableName: "ChickfiletLocations",
//         IndexName: "StoreLocationIndex",
//         KeyConditionExpression: "#S = :S AND begins_with(#cp, :city)",
//         ExpressionAttributeNames: { "#S": "State", "#cp": "CityPostalcode" },
//         ExpressionAttributeValues: {
//           ":S": { S: "SC" },
//           ":city": { S: "Spart" },
//         },
//       })
//     );
//     console.log(results.Items.forEach((item) => console.log(item.Website)));
//     console.timeEnd("querytime");
//   } catch (err) {
//     console.error(err);
//   }
// })();
