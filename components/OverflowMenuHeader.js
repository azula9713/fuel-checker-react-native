import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HiddenItem, OverflowMenu } from "react-navigation-header-buttons";

const OverflowMenuHeader = ({ navigation }) => {
  return (
    <OverflowMenu
      style={{ marginHorizontal: 10 }}
      OverflowIcon={() => (
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      )}
    >
      <HiddenItem
        style={{
          marginHorizontal: 10,
        }}
        title="About Us"
        onPress={() => navigation.navigate("About")}
      />
      <HiddenItem
        style={{ marginHorizontal: 10 }}
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </OverflowMenu>
  );
};

export default OverflowMenuHeader;
