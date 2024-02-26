import { useState, useEffect } from "react";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import { dbGetImageUri } from "../utility/dbFunctions/dbGetImageUri";
import * as ImagePicker from "expo-image-picker";
import { dbInsertImageUri } from "../utility/dbFunctions/dbInsertImageUri";
import { dbUpdateImageUri } from "../utility/dbFunctions/dbUpdateImageUri";

interface Props {
  database: any;
}
export const DogImagePicker: React.FC<Props> = ({ database }) => {
  //insert first record of imageTable to be done
  const [image, setImage] = useState<string | undefined>();
  const [isImageSet, setIsImageSet] = useState<boolean>(false);
  const [wasImageUpdated, setWasImageUpdated] = useState<boolean>(false);

  useEffect(() => {
    setImageHandler();
  }, []);

  useEffect(() => {
    setImageHandler();
    setWasImageUpdated(false);
  }, [wasImageUpdated]);

  const setImageHandler = async (): Promise<void> => {
    const imageObj = await dbGetImageUri(database);
    console.log(imageObj);
    if (imageObj !== undefined) {
      setImage(imageObj.imageUri);
      setIsImageSet(true);
    } else {
      dbInsertImageUri(database, "");
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      dbUpdateImageUri(database, result.assets[0].uri);
      setWasImageUpdated(true);
    }
  };

  const showImage = () => {
    if (!isImageSet) {
      return (
        <Pressable onPress={pickImage} style={styles.dogImageContainer}>
          <Text style={styles.dogImageText}>+</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable onPress={pickImage} style={styles.dogImage}>
          <Image source={{ uri: image }} style={styles.dogImage} />
        </Pressable>
      );
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {showImage()}
    </View>
  );
};

const styles = StyleSheet.create({
  dogImageContainer: {
    borderRadius: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dogImage: {
    borderRadius: 999,
    height: 100,
    width: 100,
    backgroundColor: "grey",
  },
  dogImageText: {
    fontSize: 64,
  },
});
