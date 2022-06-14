import { View, Text, SafeAreaView, Appearance } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Settings = () => {
  return (
    <SafeAreaView>
      <StatusBar
        style={Appearance.getColorScheme() === "dark" ? "light" : "dark"}
      />
      <View>
        <Text>Settings coming soon!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
