import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  Dimensions,
  Appearance,
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
import { selectedFuelTypeAtom } from "../atoms/fuelTypeAtom";
import * as FuelAPI from "../services/FuelAPI";
import getFuelAvailability from "../services/GetFuelAvailability";
import HomeLocaleEn from "../lang/en/Home.json";

import LocationPicker from "../components/LocationPicker";
import WarningBanner from "../components/WarningBanner";

const CeypetcoLocation = ({ navigation }) => {
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
      <StatusBar
        style={Appearance.getColorScheme() === "dark" ? "light" : "dark"}
      />
      <ScrollView style={styles.wrapper}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 10,
          }}
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
                  backgroundColor: btnDisabled ? "#ccc" : "#203F75",
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CeypetcoLocation;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
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
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
    height: "100%",
  },

  buttonContainer: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: Dimensions.get("window").width < 400 ? 14 : 18,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
