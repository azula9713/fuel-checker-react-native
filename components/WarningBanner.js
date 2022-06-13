import { View, Text, StyleSheet } from "react-native";
import React from "react";

import HomeLocaleEn from "../lang/en/Home.json";

const WarningBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.warningTitle}>{HomeLocaleEn.banner.bannerTitle}</Text>
      <View style={styles.warningWrapper}>
        <Text style={styles.warningText}>
          {HomeLocaleEn.banner.bannerText1}
        </Text>
        <Text style={styles.warningText}>
          {HomeLocaleEn.banner.bannerText2}
        </Text>
        <Text style={styles.warningText}>
          {HomeLocaleEn.banner.bannerText3}
        </Text>
        <Text style={styles.warningText}>
          {HomeLocaleEn.banner.bannerText4}
        </Text>
      </View>
    </View>
  );
};

export default WarningBanner;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdefe5",
    padding: 10,
    borderRadius: 10,
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ec6500",
    textTransform: "uppercase",
  },
  warningWrapper: {
    //make items left aligned
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
  },
  warningText: {
    fontSize: 12,
    color: "#000",
    marginTop: 10,
    textAlign: "left",
  },
});
