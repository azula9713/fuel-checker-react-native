import {
  View,
  Text,
  SafeAreaView,
  Appearance,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const Settings = ({ navigation }) => {
  const iconColor =
    Appearance.getColorScheme() === "dark" ? "white" : "#203F75";

  const settingsOnPress = (to) => {
    navigation.navigate(to);
  };

  return (
    <SafeAreaView>
      <StatusBar
        style={Appearance.getColorScheme() === "dark" ? "light" : "dark"}
      />
      <View style={styles.container}>
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingSectionWrapper}>
            <Entypo
              name="sound-mix"
              size={28}
              color={iconColor}
              style={styles.iconStyle}
            />
            <Text style={styles.settingsText}>General</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingSectionWrapper}>
            <Entypo name="home" size={28} color={iconColor} />
            <Text style={styles.settingsText}>Home Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingSectionWrapper}
            onPress={() => {
              settingsOnPress("About");
            }}
          >
            <MaterialCommunityIcons
              name="information-outline"
              size={28}
              color={iconColor}
            />
            <Text style={styles.settingsText}>About</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.lottieWrapper}>
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
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
  },

  lottieWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  iconStyle: {},

  settingsSection: {
    margin: 20,
    borderRadius: 15,
    padding: 10,
  },

  settingSectionWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },

  settingsText: {
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "black",
    marginLeft: 20,
  },
});
