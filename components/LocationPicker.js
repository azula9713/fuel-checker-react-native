import { View, Text, StyleSheet, Appearance } from "react-native";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useRecoilState } from "recoil";

import Provinces from "../data/ProvinceData";
import Districts from "../data/DistrictData";
import HomeLocaleEn from "../lang/en/Home.json";
import {
  cityValueAtom,
  districtValueAtom,
  provinceValueAtom,
} from "../atoms/locationAtom";

const LocationPicker = () => {
  const [provinceValue, setProvinceValue] = useRecoilState(provinceValueAtom);
  const [provinceFocus, setProvinceFocus] = useState(false);
  const [districtValue, setDistrictValue] = useRecoilState(districtValueAtom);
  const [districtFocus, setDistrictFocus] = useState(false);
  const [cities, setCities] = useState([]);
  const [cityValue, setCityValue] = useRecoilState(cityValueAtom);
  const [cityFocus, setCityFocus] = useState(false);

  useEffect(() => {
    if (provinceValue !== null && districtValue !== null) {
      const tempCities = Districts[provinceValue]?.districts.find(
        (district) => district.districtId === districtValue
      )?.cities;
      setCities(tempCities);
    }
  }, [provinceValue, districtValue]);

  return (
    <View>
      <Text
        style={{
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {HomeLocaleEn.locationPicker.title}
      </Text>
      <View style={styles.dropDownWrapper}>
        <Text style={styles.pickerTitleText}>
          {HomeLocaleEn.locationPicker.provincePicker}
        </Text>
        <Dropdown
          style={[styles.dropdown, provinceFocus && { borderColor: "#ec6500" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.dropdownContainer}
          inputSearchStyle={styles.inputSearchStyle}
          data={Provinces}
          search
          maxHeight={300}
          labelField="name"
          valueField="provinceId"
          placeholder={HomeLocaleEn.locationPicker.provincePlaceholder}
          searchPlaceholder="Search..."
          value={provinceValue}
          onFocus={() => {
            setProvinceValue(null);
            setDistrictValue(null);
            setCityValue(null);
            setProvinceFocus(true);
          }}
          onBlur={() => setProvinceFocus(false)}
          onChange={(item) => {
            setProvinceValue(item.provinceId);
            setProvinceFocus(false);
          }}
        />
      </View>
      {provinceValue !== null && (
        <View style={styles.dropDownWrapper}>
          <Text style={styles.pickerTitleText}>
            {HomeLocaleEn.locationPicker.districtPicker}
          </Text>
          <Dropdown
            style={[
              styles.dropdown,
              districtFocus && { borderColor: "#ec6500" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.dropdownContainer}
            inputSearchStyle={styles.inputSearchStyle}
            data={Districts[provinceValue]?.districts}
            search
            maxHeight={300}
            labelField="name"
            valueField="districtId"
            placeholder={HomeLocaleEn.locationPicker.districtPlaceholder}
            searchPlaceholder="Search..."
            value={districtValue}
            onFocus={() => {
              setDistrictValue(null);
              setCityValue(null);
              setDistrictFocus(true);
            }}
            onBlur={() => setDistrictFocus(false)}
            onChange={(item) => {
              setDistrictValue(item.districtId);
              setDistrictFocus(false);
            }}
          />
        </View>
      )}
      {districtValue !== null && (
        <View style={styles.dropDownWrapper}>
          <Text style={styles.pickerTitleText}>
            {HomeLocaleEn.locationPicker.cityPicker}
          </Text>
          <Dropdown
            style={[styles.dropdown, cityFocus && { borderColor: "#ec6500" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.dropdownContainer}
            inputSearchStyle={styles.inputSearchStyle}
            data={cities}
            search
            maxHeight={300}
            labelField="name"
            valueField="cityId"
            placeholder={HomeLocaleEn.locationPicker.cityPlaceholder}
            searchPlaceholder="Search..."
            value={cityValue}
            onFocus={() => {
              setCityValue(null);
              setCityFocus(true);
            }}
            onBlur={() => setCityFocus(false)}
            onChange={(item) => {
              setCityValue(item.cityId);
              setCityFocus(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  dropDownWrapper: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownContainer: {
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
  },
  icon: {
    marginRight: 5,
  },
  pickerTitleText: {
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
  },
  placeholderStyle: {
    fontSize: 16,
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
  },
});
