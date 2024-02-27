import { StyleSheet, Text, View } from "react-native";

export const ImportDogScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Import dog screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
