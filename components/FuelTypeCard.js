import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
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
          backgroundColor: isSelected ? "#203F75" : "#fff",
        },
      ]}
    >
      <Text
        style={[
          {
            color: isSelected ? "#fff" : "#203F75",
            fontWeight: isSelected ? "bold" : "normal",
            fontSize: isSelected
              ? Dimensions.get("window").width < 400
                ? 14
                : 18
              : Dimensions.get("window").width < 400
              ? 12
              : 16,
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
    minWidth: Dimensions.get("window").width / 3 - 25,
  },
  textStyle: {
    textTransform: "uppercase",
    textAlign: "center",
  },
});
