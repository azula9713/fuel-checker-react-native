import React from "react";
import { Appearance, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const CardButton = ({ navigation, text, icon, fuelStation }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => {
        setSelectedStation(fuelStation);
        navigation.navigate("Details");
      }}
    >
      <Text style={styles.buttonText}>{text}</Text>
      {icon === "map" && (
        <FontAwesome5 name="map-marked-alt" size={20} color="white" />
      )}
      {icon === "info" && (
        <FontAwesome5 name="info-circle" size={20} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default CardButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#203F75",
  },

  buttonText: {
    color: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
    marginRight: 5,
  },
});
