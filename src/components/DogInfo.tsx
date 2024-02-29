import { StyleSheet, View, Text } from "react-native";
import { DogImagePicker } from "./DogImagePicker";
import { dbGetDogInfo } from "../utility/dbFunctions/dbGetDogInfo";
import { useState, useEffect, useContext } from "react";
import { DatabaseContext } from "../Context/DatabaseContext";

export const DogInfo: React.FC = () => {
  const [name, setName] = useState<string>("");
  const database = useContext(DatabaseContext);
  useEffect(() => {
    setNameHandler();
  }, []);
  const setNameHandler = async () => {
    const result = await dbGetDogInfo(database);
    setName(result.rows._array[0].name);
  };

  return (
    <View style={styles.dogImageContainer}>
      <DogImagePicker />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dogImageContainer: {
    borderRadius: 25,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  text: {
    fontSize: 32,
  },
});

//dimensions to be used
