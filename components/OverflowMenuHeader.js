import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { HiddenItem, OverflowMenu } from "react-navigation-header-buttons";

const OverflowMenuHeader = ({ navigation }) => {
  const route = useRoute();

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
        title="About"
        onPress={() => navigation.navigate("About")}
        disabled={route.name === "About"}
      />
      <HiddenItem
        style={{ marginHorizontal: 10 }}
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
        disabled={route.name === "Settings"}
      />
    </OverflowMenu>
  );
};

export default OverflowMenuHeader;
