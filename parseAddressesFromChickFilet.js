module.exports = (locations) => {
  const parsedLocations = locations.map((location) => {
    const { address, ...restOfProfile } = location.profile;

    return {
      id: restOfProfile.meta.id,
      address_line1: address.line1,
      address_line2: address.line2,
      state: address.region,
      city: address.city,
      zipcode: address.postalCode,
      coordinates: restOfProfile.displayCoordinate,
      website: restOfProfile.websiteUrl,
      name: restOfProfile.c_locationName,
    };
  });

  return parsedLocations;
};
