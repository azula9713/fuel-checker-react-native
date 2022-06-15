import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  Appearance,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar as ExpoStatus } from "expo-status-bar";

import MyInfo from "../data/MyInfo";

const About = () => {
  const version = Constants.manifest.version;
  const website = "https://fuel.gov.lk";

  const handleUrl = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView>
      <ExpoStatus
        style={Appearance.getColorScheme() === "dark" ? "light" : "dark"}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View style={styles.container}>
          <Image
            source={require("../assets/fuel.png")}
            style={{
              resizeMode: "contain",
              height: 100,
              width: 100,
            }}
          />
          <View>
            <Text style={styles.appTitle}>Fuel Finder</Text>
            <Text style={styles.versionText}>v{version}</Text>
          </View>
          <View style={styles.detailsWrapper}>
            <View>
              <Text style={styles.warningText}>
                This app is not the official app of Ceylon Petroleum Storage
                Terminals Ltd. This is built using their public API and has no
                affiliation with Ceylon Petroleum Storage Terminals Ltd. I am
                not responsible for any data displayed here. I am fetching data
                from same source as their official website.
              </Text>
              <Text style={styles.websiteText}>
                Visit their website at {website}
              </Text>
            </View>
            <View style={styles.aboutMeContainer}>
              <Text style={styles.createdByText}>Created by AzuLa9713</Text>
              <Text style={[styles.websiteText, { color: "#EFF6FF" }]}>
                Find me on
              </Text>
              <View style={styles.linksContainer}>
                <TouchableOpacity
                  style={[styles.linkButton, { backgroundColor: "#0B192E" }]}
                  onPress={async () => {
                    await handleUrl(MyInfo.portfolio);
                  }}
                >
                  <MaterialCommunityIcons name="web" size={20} color="white" />
                  <Text style={styles.linkText}>Web</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.linkButton, { backgroundColor: "#00acee" }]}
                  onPress={async () => {
                    await handleUrl(MyInfo.twitter);
                  }}
                >
                  <MaterialCommunityIcons
                    name="twitter"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.linkText}>Twitter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.linkButton, { backgroundColor: "#171515" }]}
                  onPress={async () => {
                    await handleUrl(MyInfo.github);
                  }}
                >
                  <MaterialCommunityIcons
                    name="github"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.linkText}>Github</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.linkButton, { backgroundColor: "#EA4335" }]}
                  onPress={() => {
                    Linking.openURL(
                      `mailto:${MyInfo.email}?subject=Fuel Finder&body=Hi,%0A%0A`
                    );
                  }}
                >
                  <MaterialCommunityIcons name="mail" size={20} color="white" />
                  <Text style={styles.linkText}>Email</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.websiteText, { color: "#EFF6FF" }]}>
                for
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginVertical: -50,
                }}
              >
                <Image
                  source={require("../assets/watchdogteam.png")}
                  style={{
                    resizeMode: "contain",
                    height: 140,
                    width: 140,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Appearance.getColorScheme() === "dark" ? "#000" : "#efefef",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    minHeight: Dimensions.get("window").height,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },

  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
  },

  versionText: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },

  detailsWrapper: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: 20,
  },

  createdByText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },

  warningText: {
    //if appearance is dark make bright red
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
    fontSize: 12,
    textAlign: "justify",
  },

  websiteText: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 10,
  },

  aboutMeContainer: {
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#203F75",
    borderRadius: 10,
    backgroundColor: "#203F75",
    marginTop: 10,
  },

  linksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  linkButton: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: "#203F75",
    margin: 5,
    width: "40%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  linkText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
