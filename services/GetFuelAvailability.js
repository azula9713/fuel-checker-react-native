const getFuelAvailability = async (
  provinceValue,
  districtValue,
  cityValue,
  fuelTypeValue,
  findStations
) => {
  if (provinceValue !== null && districtValue !== null && cityValue !== null) {
    const searchObj = {
      province: provinceValue,
      district: districtValue,
      city: cityValue,
      fuelType: fuelTypeValue,
    };
    findStations(searchObj);
  } else if (
    provinceValue !== null &&
    districtValue !== null &&
    cityValue === null
  ) {
    const searchObj = {
      province: provinceValue,
      district: districtValue,
      fuelType: fuelTypeValue,
    };

    findStations(searchObj);
  } else if (provinceValue === null || districtValue === null) {
    alert("Please select your location");
  } else {
    alert("Something went wrong");
  }
};

export default getFuelAvailability;
