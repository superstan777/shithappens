import { StyleSheet, Text, View } from "react-native";
import { DogInfo } from "./DogInfo";
import { StatusContainer } from "./StatusContainer";

interface Props {
  peeTimer: string;
  poopTimer: string;
  database: any;
}
export const DogContainer: React.FC<Props> = ({
  peeTimer,
  poopTimer,
  database,
}) => {
  return (
    <View style={styles.dogContainer}>
      <DogInfo database={database} />
      <StatusContainer
        peeTimer={peeTimer}
        poopTimer={poopTimer}
        database={database}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dogContainer: {
    width: "80%",
    height: "80%",
    borderRadius: 25,
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    // alignItems: "flex-start",
  },
});

// empty + can use camera to take a photo of dog or import from photos
