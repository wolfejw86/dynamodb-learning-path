const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

// const client = new DynamoDBClient({ endpoint: "http://localhost:8000" });
const client = new DynamoDBClient();

/**
 *
 * @param {locations[0]} location
 */
async function putItemToDynamo(location) {
  const command = new PutItemCommand({
    TableName: "GenericAppName",
    Item: {
      GSI1PK: { S: `STATE#${location.state}` },
      GSI1SK: {
        S: `STORELOCATION#${location.city}STOREPOSTALCODE#${location.zipcode}`,
      },
      PK: { S: `STOREID#${location.id.toString()}` },
      SK: { S: `STOREID#${location.id.toString()}` },
      Type: { S: "STORE" },
      Name: { S: location.name },
      Lat: { S: location.coordinates.lat.toString() },
      Lng: { S: location.coordinates.long.toString() },
      Website: { S: location.website },
    },
  });
  try {
    await client.send(command);
  } catch (err) {
    console.error(err);
  }
}

async function insertItems() {
  const locations = require("./chickfilet-locations.json");
  let inserted = 0;
  const total = locations.length;

  while (locations.length) {
    const nextToInsert = locations.splice(0, 100);

    await Promise.all(nextToInsert.map(putItemToDynamo));

    inserted += nextToInsert.length;
    console.log("Inserted %s of %s", inserted, total);
  }
}

insertItems();
