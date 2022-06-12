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
              headerRight: () => (
                <OverflowMenu
                  style={{ marginHorizontal: 10 }}
                  OverflowIcon={() => (
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={24}
                      color="black"
                    />
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
              ),
            })}
          />
          <Stack.Screen
            name="Results"
            component={Results}
            options={() => ({
              headerTitleAlign: "center",
              headerTitle: `Results in ${
                currentCity === null
                  ? Districts[currentProvince]?.districts?.find(
                      (dis) => dis.districtId === currentDistrict
                    ).name
                  : Districts[currentProvince]?.districts
                      ?.find((dis) => dis?.districtId === currentDistrict)
                      ?.cities?.find((city) => city?.cityId === currentCity)
                      .name
              }`,
            })}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerTitle: "Details",
              headerRight: () => <OverflowMenuHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerTitle: "About Us",
              headerRight: () => <OverflowMenuHeader navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerTitle: "Settings",
              headerRight: () => <OverflowMenuHeader navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </OverflowMenuProvider>
    </NavigationContainer>
  );
};

export default Routes;
