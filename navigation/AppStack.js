import React from "react";
import { Appearance } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeNew";
import MapSearchScreen from "../screens/MapSearch";
import SearchScreen from "../screens/Search";
import SettingsScreen from "../screens/Settings";
import AboutScreen from "../screens/About";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={() => ({
          headerTitle: "Settings",
          headerTitleAlign: "left",
          headerBackTitleVisible: true,
          headerTitleStyle: {
            color: Appearance.getColorScheme() === "dark" ? "white" : "black",
          },
          headerStyle: {
            backgroundColor:
              Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
          },
        })}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={() => ({
          headerTitle: "About",
          headerTitleAlign: "center",
          headerBackTitleVisible: true,
          headerTitleStyle: {
            color: Appearance.getColorScheme() === "dark" ? "white" : "black",
          },
          headerStyle: {
            backgroundColor:
              Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor:
          Appearance.getColorScheme() === "dark" ? "#0f7e9b" : "#203F75",
        tabBarStyle: {
          backgroundColor:
            Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
        },
        //channge background color of tab bar
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          header: () => null,
        })}
      />
      <Tab.Screen
        name="Map"
        component={MapSearchScreen}
        options={() => ({
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
          header: () => null,
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={() => ({
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
          header: () => null,
        })}
      />
      <Tab.Screen
        name="Info"
        component={SettingsStack}
        options={() => ({
          tabBarLabel: "Info",
          headerShown: false,
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
