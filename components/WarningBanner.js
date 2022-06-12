import { View, Text, StyleSheet } from "react-native";
import React from "react";

const WarningBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.warningTitle}>Heads Up!</Text>
      {/* display a list */}
      <View style={styles.warningWrapper}>
        <Text style={styles.warningText}>
          1. I am not responsible for any details displayed on the system.
        </Text>
        <Text style={styles.warningText}>
          2. Information on the fuel availability will be uploaded to the system
          by Ceylon Petroleum Storage Terminals Ltd (CPSTL) by 9.00 a.m daily.
          Further, the time is shown in 24-hour clock format.
        </Text>
        <Text style={styles.warningText}>
          3. The search results are given only for filling stations with pumping
          capacity or where a fuel bowser is dispatched.
        </Text>
        <Text style={styles.warningText}>
          4. This app is not the official app of Ceylon Petroleum Storage
          Terminals Ltd. This is built using their public API and has no
          affiliation with Ceylon Petroleum Storage Terminals Ltd.
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
