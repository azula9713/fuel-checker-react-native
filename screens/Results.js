import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import FuelTypeCard from "../components/FuelTypeCard";
import ResultCard from "../components/ResultCard";

import FuelTypes from "../data/FuelTypes";
import * as FuelAPI from "../services/FuelAPI";
import {
  currentFuelStationAtom,
  isFuelChangeTriggerAtom,
} from "../atoms/resultsAtom";
import { selectedFuelTypeAtom } from "../atoms/fuelTypeAtom";
import { useMutation } from "react-query";
import getFuelAvailability from "../services/GetFuelAvailability";
import {
  cityValueAtom,
  districtValueAtom,
  provinceValueAtom,
} from "../atoms/locationAtom";

const Results = ({ navigation }) => {
  const [currentStations, setCurrentStations] = useRecoilState(
    currentFuelStationAtom
  );
  const selectedFuelType = useRecoilValue(selectedFuelTypeAtom);
  const provinceValue = useRecoilValue(provinceValueAtom);
  const districtValue = useRecoilValue(districtValueAtom);
  const cityValue = useRecoilValue(cityValueAtom);

  const [isFuelChange, setIsFuelChange] = useRecoilState(
    isFuelChangeTriggerAtom
  );

  const { mutate: findStations, isLoading: stationsLoading } = useMutation(
    FuelAPI.searchFuelStations,
    {
      onSuccess: (data) => {
        setCurrentStations(data?.data);
        navigation.navigate("Results");
      },
    }
  );

  useEffect(() => {
    if (isFuelChange) {
      getFuelAvailability(
        provinceValue,
        districtValue,
        cityValue,
        selectedFuelType,
        findStations
      );
      setIsFuelChange(false);
    }
  }, [selectedFuelType]);

  if (currentStations.length > 0) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.fuelTypesContainer}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              Select Fuel Type
            </Text>
            <View style={styles.fuelTypesWrapper}>
              {FuelTypes.map((fuelType) => (
                <FuelTypeCard
                  key={fuelType.id}
                  fuelType={fuelType}
                  isSelected={selectedFuelType === fuelType.id}
                  setIsFuelChange={setIsFuelChange}
                />
              ))}
            </View>
          </View>
          {stationsLoading && <Text>Loading...</Text>}
          {!stationsLoading && currentStations.length > 0 && (
            <View>
              <View>
                <Text>
                  Available stations as per now: {currentStations?.length}
                </Text>
              </View>
              <ScrollView style={styles.resultsContainer}>
                {currentStations.map((station) => (
                  <ResultCard
                    key={station.shedId}
                    fuelStation={station}
                    navigation={navigation}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.fuelTypesContainer}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          Select Fuel Type
        </Text>
        <View style={styles.fuelTypesWrapper}>
          {FuelTypes.map((fuelType) => (
            <FuelTypeCard
              key={fuelType.id}
              fuelType={fuelType}
              isSelected={selectedFuelType === fuelType.id}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  fuelTypesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8EDE3",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    marginVertical: 10,
  },

  fuelTypesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
  },

  resultsContainer: {
    height: "72%",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
