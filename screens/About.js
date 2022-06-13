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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

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
      <View style={styles.container}>
        <Image
          source={require("../assets/fuel.png")}
          style={{
            resizeMode: "contain",
            height: 140,
            width: 140,
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
              affiliation with Ceylon Petroleum Storage Terminals Ltd. I am not
              responsible for any data displayed here. I am fetching data from
              same source as their official website.
            </Text>
            <Text style={styles.websiteText}>
              Visit their website at {website}
            </Text>
          </View>
          <View style={styles.aboutMeContainer}>
            <Text style={styles.createdByText}>Created by AzuLa9713</Text>
            <Text style={styles.websiteText}>Find me on</Text>
            <View style={styles.linksContainer}>
              <TouchableOpacity
                style={[styles.linkButton, { backgroundColor: "#0B192E" }]}
                onPress={async () => {
                  await handleUrl(MyInfo.portfolio);
                }}
              >
                <MaterialCommunityIcons name="web" size={20} color="white" />
                <Text style={styles.linkText}>Portfolio</Text>
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
                style={[styles.linkButton, { backgroundColor: "#0072b1" }]}
                onPress={async () => {
                  await handleUrl(MyInfo.linkedin);
                }}
              >
                <MaterialCommunityIcons
                  name="linkedin"
                  size={20}
                  color="white"
                />
                <Text style={styles.linkText}>LinkedIn</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkButton, { backgroundColor: "#4267B2" }]}
                onPress={async () => {
                  await handleUrl(MyInfo.linkedin);
                }}
              >
                <MaterialCommunityIcons
                  name="facebook"
                  size={20}
                  color="white"
                />
                <Text style={styles.linkText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkButton, { backgroundColor: "#171515" }]}
                onPress={async () => {
                  await handleUrl(MyInfo.github);
                }}
              >
                <MaterialCommunityIcons name="github" size={20} color="white" />
                <Text style={styles.linkText}>Github</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkButton, { backgroundColor: "#EA4335" }]}
                onPress={async () => {
                  await handleUrl(MyInfo.github);
                }}
              >
                <MaterialCommunityIcons name="mail" size={20} color="white" />
                <Text style={styles.linkText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    minHeight: Dimensions.get("window").height - 60,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  warningText: {
    color: "#f00",
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
    padding: 20,
    borderColor: "#ec6500",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 20,
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
    backgroundColor: "#ec6500",
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
