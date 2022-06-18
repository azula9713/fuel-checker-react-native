import {
  View,
  Text,
  SafeAreaView,
  Appearance,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { StatusBar as ExpoStatus } from "expo-status-bar";

import Contributor from "../components/Contributor";

import { Contributors, Supporters } from "../data/Contributors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const About = () => {
  const version = Constants.manifest.version;

  return (
    <SafeAreaView
      style={{
        backgroundColor:
          Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
      }}
    >
      <ExpoStatus
        style={Appearance.getColorScheme() === "dark" ? "light" : "dark"}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
          minHeight: "100%",
        }}
      >
        <View style={styles.container}>
          <View>
            <Image
              source={require("../assets/Brand.png")}
              style={{
                resizeMode: "contain",
                height: 100,
                width: 300,
              }}
            />
            <Text style={styles.versionText}>v{version}</Text>
          </View>
          <View style={styles.iconsWrapper}>
            <Pressable
              style={styles.iconWrapper}
              onPress={async () => {
                await handleUrl(website);
              }}
            >
              <MaterialCommunityIcons
                name="twitter"
                size={24}
                color={Appearance.getColorScheme() === "dark" ? "#fff" : "#000"}
                style={{
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  color:
                    Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
                }}
              >
                Twitter
              </Text>
            </Pressable>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="alert-decagram-outline"
                size={24}
                color={Appearance.getColorScheme() === "dark" ? "#fff" : "#000"}
                style={{
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  color:
                    Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
                }}
              >
                Disclaimer
              </Text>
            </View>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="chat-question"
                size={24}
                color={Appearance.getColorScheme() === "dark" ? "#fff" : "#000"}
                style={{
                  marginBottom: 5,
                }}
              />
              <Text
                style={{
                  color:
                    Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
                }}
              >
                F.A.Q
              </Text>
            </View>
          </View>
          <View style={styles.contributorsWrapper}>
            <Text style={styles.categoryTitle}>App</Text>
            <View style={styles.contributorsContainer}>
              <View style={{ width: "100%" }}>
                {Contributors.map((contributor, index) => (
                  <Contributor key={index} person={contributor} type="app" />
                ))}
              </View>
            </View>
            <Text style={styles.categoryTitle}>Support</Text>
            <View style={styles.contributorsContainer}>
              {Supporters.map((contributor, index) => (
                <Contributor key={index} person={contributor} type="sup" />
              ))}
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
    alignItems: "center",
    padding: 20,
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
  },

  versionText: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    marginTop: -20,
  },

  iconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },

  iconWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },

  contributorsWrapper: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  categoryTitle: {
    width: "100%",
    color: Appearance.getColorScheme() === "dark" ? "lightblue" : "#203F75",
    paddingLeft: 10,
    paddingTop: 10,
  },

  contributorsContainer: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor:
      Appearance.getColorScheme() === "dark" ? "#333" : "#efefef",
    // flex: 1,
  },
});
