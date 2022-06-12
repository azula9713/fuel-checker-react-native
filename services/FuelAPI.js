import SERVER from "./Server";

export const searchFuelStations = async (searchObj) => {
  try {
    return await SERVER.post("/sheddetails/search", searchObj);
  } catch (error) {
    console.log(error);
  }
};

export const getStationData = async (stationId, fuelType) => {
  try {
    return await SERVER.get(`/sheddetails/${stationId}/${fuelType}`);
  } catch (error) {
    console.log(error);
  }
};
