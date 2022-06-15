import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { HiddenItem, OverflowMenu } from "react-navigation-header-buttons";
import { Appearance } from "react-native";

const OverflowMenuHeader = ({ navigation }) => {
  const route = useRoute();

  return (
    <OverflowMenu
      style={{
        backgroundColor:
          Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
      }}
      OverflowIcon={() => (
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color={Appearance.getColorScheme() === "dark" ? "#fff" : "#203F75"}
        />
      )}
    >
      <HiddenItem
        style={{
          backgroundColor:
            Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
        }}
        title="About"
        titleStyle={{
          color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
          backgroundColor:
            Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
        }}
        onPress={() => navigation.navigate("About")}
        disabled={route.name === "About"}
      />
      <HiddenItem
        style={{
          backgroundColor:
            Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
        }}
        titleStyle={{
          color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
          backgroundColor:
            Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
        }}
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
        disabled={route.name === "Settings"}
      />
    </OverflowMenu>
  );
};

export default OverflowMenuHeader;
