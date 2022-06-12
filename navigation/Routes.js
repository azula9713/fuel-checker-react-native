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

const Routes = () => {
  const Stack = createStackNavigator();

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
              headerTitle: "Fuel Availability",
            })}
          />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </OverflowMenuProvider>
    </NavigationContainer>
  );
};

export default Routes;
