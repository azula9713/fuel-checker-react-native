import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { StatusBar } from "expo-status-bar";

import {
  cityValueAtom,
  districtValueAtom,
  provinceValueAtom,
} from "../atoms/locationAtom";
import { currentFuelStationAtom } from "../atoms/resultsAtom";
import * as FuelAPI from "../services/FuelAPI";

import LocationPicker from "../components/LocationPicker";
import WarningBanner from "../components/WarningBanner";
import { selectedFuelTypeAtom } from "../atoms/fuelTypeAtom";
import getFuelAvailability from "../services/GetFuelAvailability";

const Home = ({ navigation }) => {
  const provinceValue = useRecoilValue(provinceValueAtom);
  const districtValue = useRecoilValue(districtValueAtom);
  const cityValue = useRecoilValue(cityValueAtom);
  const fuelTypeValue = useRecoilValue(selectedFuelTypeAtom);
  const setCurrentStations = useSetRecoilState(currentFuelStationAtom);

  const [currNetworkStatus, setCurrNetworkStatus] = useState(null);

  const { mutate: findStations, isLoading: stationsLoading } = useMutation(
    FuelAPI.searchFuelStations,
    {
      onSuccess: (data) => {
        setCurrentStations(data?.data);
        navigation.navigate("Results");
      },
    }
  );

  const checkNetworkStatus = async () => {
    await NetInfo.fetch().then((status) => {
      setCurrNetworkStatus(status);
    });
  };

  useEffect(() => {
    checkNetworkStatus();
  }, []);

  useEffect(() => {
    if (
      currNetworkStatus !== null &&
      (!currNetworkStatus?.isConnected ||
        !currNetworkStatus?.isInternetReachable)
    ) {
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection and try again.",
        [{ text: "Refresh", onPress: () => checkNetworkStatus() }]
      );
    }
  }, [currNetworkStatus]);

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <WarningBanner />
        <View style={styles.container}>
          <LocationPicker />
          <Pressable
            disabled={
              !currNetworkStatus?.isConnected ||
              !currNetworkStatus?.isInternetReachable
            }
            onPress={() => {
              getFuelAvailability(
                provinceValue,
                districtValue,
                cityValue,
                fuelTypeValue,
                findStations
              );
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>
              {stationsLoading ? "Loading..." : "Check Fuel Availability"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    flex: 1,
    minHeight: Dimensions.get("window").height - 80,
    height: "100%",
  },

  buttonContainer: {
    backgroundColor: "#ec6500",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    //if device screen is smaller than 500px, then font size is smaller
    fontSize: Dimensions.get("window").width < 400 ? 12 : 18,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
