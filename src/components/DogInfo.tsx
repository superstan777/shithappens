import { StyleSheet, View, Text } from "react-native";
import { DogImagePicker } from "./DogImagePicker";
interface Props {
  database: any;
}

export const DogInfo: React.FC<Props> = ({ database }) => {
  return (
    <View style={styles.dogImageContainer}>
      {/* <View style={styles.dogImage}> */}
      <DogImagePicker database={database} />
      {/* </View> */}
      <Text style={styles.text}>Reykja</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dogImageContainer: {
    borderRadius: 25,
    flex: 1,
    display: "flex",
    justifyContent: "space-around",

    alignItems: "center",
  },

  text: {
    fontSize: 32,
  },
});

//dimensions to be used
