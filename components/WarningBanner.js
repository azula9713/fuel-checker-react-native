import { View, Text, StyleSheet, Pressable, Appearance } from "react-native";
import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
import { Entypo } from "@expo/vector-icons";

import HomeLocaleEn from "../lang/en/Home.json";

const WarningBanner = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.warningTitle}>
          {HomeLocaleEn.banner.bannerTitle}
        </Text>
        <Pressable onPress={() => setIsCollapsed(!isCollapsed)}>
          <Entypo
            name={isCollapsed ? "chevron-down" : "chevron-up"}
            size={24}
            color={Appearance.getColorScheme() === "dark" ? "#fff" : "#ec6500"}
            style={{
              marginLeft: 20,
            }}
          />
        </Pressable>
      </View>

      <Collapsible collapsed={isCollapsed}>
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
      </Collapsible>
    </View>
  );
};

export default WarningBanner;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      Appearance.getColorScheme() === "dark" ? "#ec6500" : "#fdefe5",
    padding: 10,
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#ec6500",
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
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
    marginTop: 10,
    textAlign: "left",
  },
});
