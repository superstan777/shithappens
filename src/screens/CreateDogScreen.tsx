import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Button } from "../components/Button";
import { useState, useContext } from "react";
import { dbInsertDogInfoRecord } from "../utility/dbFunctions/dbInsertDogInfoRecord";
import * as ImagePicker from "expo-image-picker";
import { DatabaseContext } from "../Context/DatabaseContext";
interface Props {
  setWasDogInfoTableUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

//test
export const CreateDogScreen: React.FC<Props> = ({
  setWasDogInfoTableUpdated,
}) => {
  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>(""); // placeholder as default
  const [isImageSet, setIsImageSet] = useState<boolean>(false);
  const database = useContext(DatabaseContext);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setIsImageSet(true);
    }
  };

  const buttonHandler = () => {
    dbInsertDogInfoRecord(database, name, breed, imageUri);
    setWasDogInfoTableUpdated(true);
  };

  const showImage = () => {
    if (!isImageSet) {
      return (
        <Pressable onPress={pickImage} style={styles.dogImage}>
          <Text style={styles.imageText}>Select photo</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable onPress={pickImage} style={styles.dogImage}>
          <Image source={{ uri: imageUri }} style={styles.dogImage} />
        </Pressable>
      );
    }
  };

  return (
    <View style={styles.addDogScreen}>
      <Text style={styles.text}>Add your Dog</Text>

      {showImage()}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />

      <Button buttonText="Add" handler={buttonHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  addDogScreen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 124,
  },
  text: {
    fontSize: 24,
  },
  dogImage: {
    borderRadius: 999,
    height: 100,
    width: 100,
    backgroundColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    color: "white",
    fontSize: 16,
  },
});
