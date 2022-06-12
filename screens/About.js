import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";

const About = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>About us coming soon</Text>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
    minHeight: Dimensions.get("window").height - 60,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },
});
