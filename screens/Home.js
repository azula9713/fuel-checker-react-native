import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
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
import HomeLocaleEn from "../lang/en/Home.json";

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

  const btnDisabled = !(provinceValue && districtValue);

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
      <StatusBar style="dark" />
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <WarningBanner />
        <View style={styles.container}>
          <LocationPicker />

          <Pressable
            disabled={btnDisabled}
            onPress={() => {
              getFuelAvailability(
                provinceValue,
                districtValue,
                cityValue,
                fuelTypeValue,
                findStations
              );
            }}
            style={[
              styles.buttonContainer,
              {
                backgroundColor: btnDisabled ? "#ccc" : "#ec6500",
              },
            ]}
          >
            <Text style={styles.buttonText}>
              {stationsLoading
                ? HomeLocaleEn.cta.loadignText
                : HomeLocaleEn.cta.actionText}
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
    //if disabled, the button will be gray
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
