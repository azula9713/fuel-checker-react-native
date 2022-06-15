import { View, Text, Appearance } from "react-native";
import React from "react";

const Contributor = ({ person }) => {
  return (
    <View>
      <Text
        style={{
          color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
        }}
      >
        {person?.name}
      </Text>
    </View>
  );
};

export default Contributor;
