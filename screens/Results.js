import { View, Text, StyleSheet, SafeAreaView, Appearance } from "react-native";
import BigList from "react-native-big-list";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import LottieView from "lottie-react-native";
import { useMutation } from "react-query";
import { StatusBar } from "expo-status-bar";

import FuelTypeCard from "../components/FuelTypeCard";
import ResultCard from "../components/ResultCard";

import ResultsLocaleEn from "../lang/en/Results.json";
import FuelTypes from "../data/FuelTypes";
import * as FuelAPI from "../services/FuelAPI";
import getFuelAvailability from "../services/GetFuelAvailability";
import { selectedFuelTypeAtom } from "../atoms/fuelTypeAtom";
import {
  currentFuelStationAtom,
  isFuelChangeTriggerAtom,
} from "../atoms/resultsAtom";
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

  if (currentStations && currentStations.length > 0) {
    return (
      <SafeAreaView>
        <StatusBar
          style={Appearance.getColorScheme() === "dark" ? "light" : "dark"}
        />
        <View style={styles.container}>
          <View style={styles.fuelTypesContainer}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                marginTop: 5,
                color: "#203F75",
              }}
            >
              {ResultsLocaleEn.fuelType.pickerTitle}
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
          {stationsLoading ? (
            <View
              style={[
                styles.resultsContainer,
                { alignItems: "center", justifyContent: "flex-start" },
              ]}
            >
              <Text>{ResultsLocaleEn.results.loading}</Text>
              <LottieView
                autoPlay
                loop
                style={{
                  width: 200,
                  height: 200,
                }}
                source={require("../assets/loading-pump.json")}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
              }}
            >
              <View>
                <Text
                  style={{
                    color:
                      Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
                    marginBottom: 10,
                    padding: 10,
                  }}
                >
                  {ResultsLocaleEn.results.availability}{" "}
                  {currentStations?.length}
                </Text>
              </View>
              <View style={styles.resultsContainer}>
                <BigList
                  data={currentStations}
                  renderItem={({ item }) => (
                    <ResultCard fuelStation={item} navigation={navigation} />
                  )}
                  itemHeight={110}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

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
              />
            ))}
          </View>
        </View>
        <View
          style={[
            styles.resultsContainer,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>{ResultsLocaleEn.results.notAvailable}</Text>
          <LottieView
            autoPlay
            loop
            style={{
              width: 350,
              height: 350,
              flex: 1,
              alignSelf: "center",
            }}
            source={require("../assets/empty.json")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
  },
  fuelTypesContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#203F75",
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
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
    height: "100%",
    flex: 1,
  },
});
