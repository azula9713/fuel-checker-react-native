import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { selectedStationAtom } from "../atoms/resultsAtom";
import { useSetRecoilState } from "recoil";

const ResultCard = ({ navigation, fuelStation }) => {
  const FUEL_OPENING_STOCK = 750;

  const setSelectedStation = useSetRecoilState(selectedStationAtom);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        setSelectedStation(fuelStation);
        navigation.navigate("Details");
      }}
    >
      <View style={styles.stationWrapper}>
        <View>
          <Image
            source={
              fuelStation.fuelCapacity >= FUEL_OPENING_STOCK
                ? require("../assets/gas-pump.png")
                : require("../assets/gas-pump-red.png")
            }
            style={{
              resizeMode: "contain",
              height: 40,
              width: 40,
            }}
          />
        </View>
        <View style={styles.dataWrapper}>
          <Text style={styles.stationName}>{fuelStation.shedName}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.metaTitle}>Last updated at:</Text>
            <Text style={styles.metaValue}>{fuelStation.lastupdatebyshed}</Text>
          </View>
          <View style={styles.metaContainer}>
            <Text style={styles.metaTitle}>Available Capacity:</Text>
            <Text
              style={[
                styles.metaValue,
                {
                  color:
                    fuelStation.fuelCapacity > FUEL_OPENING_STOCK
                      ? "green"
                      : "red",
                },
              ]}
            >
              {fuelStation.fuelCapacity > FUEL_OPENING_STOCK
                ? `${fuelStation.fuelCapacity} Litres`
                : "Not enough stock"}
            </Text>
          </View>
          {fuelStation.fuelCapacity <= FUEL_OPENING_STOCK && (
            <View style={styles.metaContainer}>
              <Text style={styles.metaTitle}>
                Estimated bowser arrival time:
              </Text>
              <Text style={styles.metaValue}>{fuelStation?.eta}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  stationWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  iconWrapper: {
    marginHorizontal: 5,
    width: 50,
    height: 50,
    borderWidth: 1,
  },

  dataWrapper: {
    width: "100%",
    paddingHorizontal: 5,
  },
  stationName: {
    textAlign: "left",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  metaContainer: {
    flexDirection: "row",
  },
  metaTitle: {
    textAlign: "left",
    fontSize: 11,
    color: "black",
    marginRight: 5,
  },
  metaValue: {
    textAlign: "left",
    fontSize: 11,
    color: "gray",
    fontWeight: "bold",
  },
  bottomSection: {
    borderTopColor: "red",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
