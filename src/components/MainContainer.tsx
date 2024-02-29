import { StyleSheet, View } from "react-native";
import { DogContainer } from "./DogContainer";
interface Props {
  peeTimer: string;
  poopTimer: string;
}
export const MainContainer: React.FC<Props> = ({ peeTimer, poopTimer }) => {
  return (
    <View style={styles.mainContainer}>
      <DogContainer peeTimer={peeTimer} poopTimer={poopTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

// empty + can use camera to take a photo of dog or import from photos
