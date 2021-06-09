const fetch = require("node-fetch");
const qs = require("querystring");
const fs = require("fs");
const parseLocations = require("./parseAddressesFromChickFilet");

let locations = [];

/**
 * right now there's roughly 2600 locations - if that number goes up the hardcoded "54"
 * magic number needs to be changed
 */
async function main() {
  for (let i = 0; i < 54; i++) {
    const offset = i * 50;

    const query = qs.stringify({
      q: 36104,
      per: 50,
      r: 2500,
      offset,
    });

    const results = await fetch(
      `https://locator.chick-fil-a.com.yext-cdn.com/search?${query}`,
      { headers: { accept: "application/json" }, method: "GET" }
    ).then((r) => r.json());

    console.log(results.response.entities);

    locations = [...locations, ...parseLocations(results.response.entities)];
  }

  fs.writeFileSync(
    "./chickfilet-locations.json",
    JSON.stringify(locations, null, 2)
  );
}

main();
