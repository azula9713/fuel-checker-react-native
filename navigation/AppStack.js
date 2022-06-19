import React from "react";
import { Appearance } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRecoilValue } from "recoil";

import HomeScreen from "../screens/HomeNew";
import MapSearchScreen from "../screens/MapSearch";
import SettingsScreen from "../screens/Settings";
import AboutScreen from "../screens/About";
import CeypetcoLocation from "../screens/CeypetcoLocation";
import Results from "../screens/Results";

import {
  cityValueAtom,
  districtValueAtom,
  provinceValueAtom,
} from "../atoms/locationAtom";
import Districts from "../data/DistrictData";

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

const CeypetcoStack = () => {
  const currentProvince = useRecoilValue(provinceValueAtom);
  const currentDistrict = useRecoilValue(districtValueAtom);
  const currentCity = useRecoilValue(cityValueAtom);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PickLocation"
        component={CeypetcoLocation}
        options={() => ({
          headerTitle: "Ceypetco Fuel Delivery",
          headerTitleAlign: "left",
          headerBackTitleVisible: false,
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
        name="Results"
        component={Results}
        options={() => ({
          headerTitleAlign: "left",
          headerBackTitleVisible: true,
          headerTitleStyle: {
            color: Appearance.getColorScheme() === "dark" ? "white" : "black",
          },
          headerStyle: {
            backgroundColor:
              Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
          },
          headerTitle: `Results in ${
            currentCity === null
              ? Districts[currentProvince]?.districts?.find(
                  (dis) => dis?.districtId === currentDistrict
                ).name
              : Districts[currentProvince]?.districts
                  ?.find((dis) => dis?.districtId === currentDistrict)
                  ?.cities?.find((city) => city?.cityId === currentCity).name
          }`,
        })}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={() => ({
          headerTitleAlign: "center",
          headerTitle: "Details",
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
        component={CeypetcoStack}
        options={() => ({
          tabBarLabel: "Ceypetco",
          headerShown: false,
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
