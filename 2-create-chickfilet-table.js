const {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ endpoint: "http://localhost:8000" });

async function createTable() {
  const command = new CreateTableCommand({
    TableName: "ChickfiletLocations",
    AttributeDefinitions: [
      { AttributeName: "State", AttributeType: "S" },
      { AttributeName: "CityPostalcode", AttributeType: "S" },
      { AttributeName: "StoreId", AttributeType: "S" },
    ],
    KeySchema: [
      {
        AttributeName: "StoreId",
        KeyType: "HASH",
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "StoreLocationIndex",
        KeySchema: [
          {
            AttributeName: "State",
            KeyType: "HASH",
          },
          {
            AttributeName: "CityPostalcode",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });
  try {
    const results = await client.send(command);
    console.log(results);
  } catch (err) {
    console.error(err);
  }
}

createTable();
// (async () => {
//   try {
//     const results = await client.send(new ListTablesCommand({}));
//     console.log(results);
//   } catch (err) {
//     console.error(err);
//   }
// })();
