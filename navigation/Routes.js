import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  HiddenItem,
  OverflowMenu,
  OverflowMenuProvider,
} from "react-navigation-header-buttons";

import Home from "../screens/Home";
import Results from "../screens/Results";
import Details from "../screens/Details";
import About from "../screens/About";
import Settings from "../screens/Settings";
import OverflowMenuHeader from "../components/OverflowMenuHeader";
import { useRecoilValue } from "recoil";
import {
  cityValueAtom,
  districtValueAtom,
  provinceValueAtom,
} from "../atoms/locationAtom";
import Districts from "../data/DistrictData";
import { Appearance } from "react-native";

const Routes = () => {
  const Stack = createStackNavigator();

  const currentProvince = useRecoilValue(provinceValueAtom);
  const currentDistrict = useRecoilValue(districtValueAtom);
  const currentCity = useRecoilValue(cityValueAtom);

  return (
    <NavigationContainer>
      <OverflowMenuProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerTitle: "Fuel Availability",
              headerTitleStyle: {
                fontWeight: "bold",
                color:
                  Appearance.getColorScheme() === "dark" ? "white" : "black",
              },
              headerStyle: {
                backgroundColor:
                  Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
              },
              headerRight: () => <OverflowMenuHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Results"
            component={Results}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
                color:
                  Appearance.getColorScheme() === "dark" ? "white" : "black",
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
                      ?.cities?.find((city) => city?.cityId === currentCity)
                      .name
              }`,
              headerRight: () => <OverflowMenuHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerTitle: "Details",
              headerTitleStyle: {
                fontWeight: "bold",
                color:
                  Appearance.getColorScheme() === "dark" ? "white" : "black",
              },
              headerStyle: {
                backgroundColor:
                  Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
              },
              headerRight: () => <OverflowMenuHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerTitle: "About",
              headerTitleStyle: {
                fontWeight: "bold",
                color:
                  Appearance.getColorScheme() === "dark" ? "white" : "black",
              },
              headerStyle: {
                backgroundColor:
                  Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
              },
              headerRight: () => <OverflowMenuHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerTitle: "Settings",
              headerTitleStyle: {
                fontWeight: "bold",
                color:
                  Appearance.getColorScheme() === "dark" ? "white" : "black",
              },
              headerStyle: {
                backgroundColor:
                  Appearance.getColorScheme() === "dark" ? "#1a1a1a" : "#fff",
              },
              headerRight: () => <OverflowMenuHeader navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </OverflowMenuProvider>
    </NavigationContainer>
  );
};

export default Routes;
