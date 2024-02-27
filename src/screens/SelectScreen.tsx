import { View, Text, StyleSheet } from "react-native";
import { Button } from "../components/Button";

interface Props {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}
export const SelectScreen: React.FC<Props> = ({ setScreen }) => {
  const createButtonHandler = () => {
    setScreen("create");
  };

  const importButtonHandler = () => {
    setScreen("import");
  };
  return (
    <View style={styles.mainContainer}>
      <Button buttonText="Create" handler={createButtonHandler} />
      <Text>or</Text>
      <Button buttonText="Import" handler={importButtonHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
