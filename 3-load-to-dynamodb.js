const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ endpoint: "http://localhost:8000" });

/**
 *
 * @param {locations[0]} location
 */
async function putItemToDynamo(location) {
  const command = new PutItemCommand({
    TableName: "ChickfiletLocations",
    Item: {
      State: { S: location.state },
      CityPostalcode: {
        S: `${location.city}#${location.zipcode}`,
      },
      StoreId: { S: location.id.toString() },
      Name: { S: location.name },
      Lat: { S: location.coordinates.lat.toString() },
      Long: { S: location.coordinates.long.toString() },
      Website: { S: location.website },
    },
  });
  try {
    const results = await client.send(command);
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
