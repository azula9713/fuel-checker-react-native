import { View, Text, StyleSheet, Appearance, Image } from "react-native";
import React from "react";

const Contributor = ({ person, type }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={person.image} style={styles.profileImage} />
      </View>
      <View>
        <Text style={styles.personName}>{person?.name}</Text>
        {type === "app" && <Text style={styles.subTitle}>{person?.role}</Text>}
        {type === "sup" && (
          <Text style={styles.subTitle}>{person?.company}</Text>
        )}
      </View>
    </View>
  );
};

export default Contributor;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomColor:
      Appearance.getColorScheme() === "dark" ? "light" : "#888",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },

  personName: {
    color: Appearance.getColorScheme() === "dark" ? "#fff" : "#000",
    fontSize: 15,
  },
  subTitle: {
    color: Appearance.getColorScheme() === "dark" ? "#efefef" : "#888",
  },
});
