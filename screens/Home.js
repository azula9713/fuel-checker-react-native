import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";

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

  const { mutate: findStations, isLoading: stationsLoading } = useMutation(
    FuelAPI.searchFuelStations,
    {
      onSuccess: (data) => {
        setCurrentStations(data?.data);

        navigation.navigate("Results");
      },
    }
  );

  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <WarningBanner />
        <View style={styles.container}>
          <LocationPicker />
          <Pressable
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
  },

  buttonContainer: {
    backgroundColor: "#ec6500",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
