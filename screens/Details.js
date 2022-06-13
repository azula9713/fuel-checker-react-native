import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import LottieView from "lottie-react-native";
import { useRecoilValue } from "recoil";
import { StatusBar } from "expo-status-bar";

import { selectedStationAtom } from "../atoms/resultsAtom";
import { selectedFuelTypeAtom } from "../atoms/fuelTypeAtom";
import * as FuelAPI from "../services/FuelAPI";
import FuelTypes from "../data/FuelTypes";

const Details = () => {
  const FUEL_OPENING_STOCK = 750;
  const animation = useRef(null);

  const selectedStation = useRecoilValue(selectedStationAtom);
  const selectedFuel = useRecoilValue(selectedFuelTypeAtom);

  const [selectedStationData, setSelectedStationData] = useState(null);

  const { data: stationData, isLoading: stationLoading } = useQuery(
    ["getStationData", selectedStation.shedId, selectedFuel],
    () => FuelAPI.getStationData(selectedStation.shedId, selectedFuel)
  );

  useEffect(() => {
    if (stationData?.data) {
      setSelectedStationData(stationData.data);
    }
  }, [stationData]);

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {stationLoading && (
          <LottieView
            autoPlay
            loop
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={require("../assets/loading-pump.json")}
          />
        )}
        {selectedStationData && (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{
              flex: 1,
              minHeight: Dimensions.get("window").height - 100,
              paddingHorizontal: 10,
              paddingBottom: 15,
            }}
          >
            <View>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>Basic Info</Text>
                <View style={styles.metaDataContainer}>
                  <Text style={styles.metaDataTitle}>
                    Filling Station Code:{" "}
                  </Text>
                  <Text style={styles.metaDataValue}>
                    {selectedStationData.shedCode}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <Text style={styles.metaDataTitle}>
                    Filling Station Name:{" "}
                  </Text>
                  <Text style={styles.metaDataValue}>
                    {selectedStationData.shedName}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <Text style={styles.metaDataTitle}>Address: </Text>
                  <Text style={styles.metaDataValue}>
                    {selectedStationData.address}
                  </Text>
                </View>
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>Available Fuel Types</Text>
                <Text
                  style={styles.updateText}
                >{`Last updated at ${selectedStationData.lastupdateddate}`}</Text>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Petrol 92 </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>Opening Stock: </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.p92Availablity &&
                          selectedStationData.p92Capacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.p92Availablity &&
                    selectedStationData.p92Capacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.p92Capacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Petrol 95 </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>Opening Stock: </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.p95Availablity &&
                          selectedStationData.p95Capacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.p95Availablity &&
                    selectedStationData.p95Capacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.p95Capacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Diesel </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>Opening Stock: </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.davailablity &&
                          selectedStationData.dcapacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.davailablity &&
                    selectedStationData.dcapacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.dcapacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Super Diesel </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>Opening Stock: </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.sdAvailablity &&
                          selectedStationData.sdcapacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.sdAvailablity &&
                    selectedStationData.sdcapacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.sdcapacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Kerosine </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>Opening Stock: </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.kavailablity &&
                          selectedStationData.kcapacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.kavailablity &&
                    selectedStationData.kcapacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.kcapacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>Fuel Dispatches</Text>
                <Text
                  style={styles.updateText}
                >{`Last updated at ${selectedStationData.lastupdateddate}`}</Text>
                {selectedStationData.dispatchSheduleList.map(
                  (dispatch, index) => (
                    <View style={styles.dispatchContainer} key={index}>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>Plant Name: </Text>
                        <Text style={styles.dispatchValue}>
                          {dispatch.plantName}
                        </Text>
                      </View>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>Product Type: </Text>
                        <Text style={styles.dispatchValue}>
                          {
                            FuelTypes.find(
                              (fuel) => fuel.id === dispatch.fuelType
                            ).name
                          }
                        </Text>
                      </View>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>Amount: </Text>
                        <Text style={styles.dispatchValue}>
                          {`${dispatch.amountDispatch} Litres`}
                        </Text>
                      </View>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>
                          Plant Exit Time:{" "}
                        </Text>
                        <Text style={styles.dispatchValue}>
                          {dispatch.dispatchTime}
                        </Text>
                      </View>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>E.T.A: </Text>
                        <Text style={styles.dispatchValue}>{dispatch.eta}</Text>
                      </View>
                    </View>
                  )
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  categoryContainer: {
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ec6500",
    padding: 10,
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
  updateText: {
    fontSize: 11,
    textAlign: "center",
    color: "#ec6500",
  },
  categoryTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#ec6500",
    fontWeight: "bold",
  },
  metaDataContainer: {
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaDataTitle: {
    color: "#000",
    fontSize: 15,
  },
  metaDataValue: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  dispatchContainer: {
    width: "100%",
    backgroundColor: "#fdefe5",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  dispatchTitle: {
    fontSize: 12,
  },
  dispatchValue: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
