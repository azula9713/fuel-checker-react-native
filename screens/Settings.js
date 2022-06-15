import { View, Text, SafeAreaView, Appearance, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";

const Settings = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        style={Appearance.getColorScheme() === "dark" ? "light" : "dark"}
      />
      <View style={styles.container}>
        <View style={styles.lottieWrapper}>
          <LottieView
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
            }}
            source={require("../assets/settings.json")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.settingsText}>Settings coming soon!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor:
      Appearance.getColorScheme() === "dark" ? "#000" : "#efefef",
  },

  lottieWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  settingsText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
  },
});
