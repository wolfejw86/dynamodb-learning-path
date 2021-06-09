const {
  DynamoDBClient,
  CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ endpoint: "http://localhost:8000" });

async function createTable() {
  const command = new CreateTableCommand({
    TableName: "GenericAppName",
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
      { AttributeName: "GSI1PK", AttributeType: "S" },
      { AttributeName: "GSI1SK", AttributeType: "S" },
    ],
    KeySchema: [
      {
        AttributeName: "PK",
        KeyType: "HASH",
      },
      {
        AttributeName: "PK",
        KeyType: "RANGE",
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI1",
        KeySchema: [
          {
            AttributeName: "GSI1PK",
            KeyType: "HASH",
          },
          {
            AttributeName: "GSI1SK",
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
