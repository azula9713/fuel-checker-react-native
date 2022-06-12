import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSetRecoilState } from "recoil";
import { selectedFuelTypeAtom } from "../atoms/fuelTypeAtom";
import { isFuelChangeTriggerAtom } from "../atoms/resultsAtom";

const FuelTypeCard = ({ fuelType, isSelected }) => {
  const setSelectedFuelType = useSetRecoilState(selectedFuelTypeAtom);
  const setIsFuelChange = useSetRecoilState(isFuelChangeTriggerAtom);

  const handlePress = () => {
    setIsFuelChange(true);
    setSelectedFuelType(fuelType.id);
  };

  return (
    <TouchableOpacity
      key={fuelType.id}
      onPress={handlePress}
      style={[
        styles.fuelCardContainer,
        {
          backgroundColor: isSelected ? "#ec6500" : "#fff",
        },
      ]}
    >
      <Text
        style={[
          {
            color: isSelected ? "#fff" : "#000",
            fontWeight: isSelected ? "bold" : "normal",
            fontSize: isSelected ? 18 : 16,
          },
          styles.textStyle,
        ]}
      >
        {fuelType.name}
      </Text>
    </TouchableOpacity>
  );
};

export default FuelTypeCard;

const styles = StyleSheet.create({
  fuelCardContainer: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },
  textStyle: {
    textTransform: "uppercase",
    textAlign: "center",
  },
});
