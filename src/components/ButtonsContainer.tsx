import { StyleSheet, View } from "react-native";
import { Button } from "./Button";
import { dbInsertPee } from "../utility/dbFunctions/dbInsertPee";
import { dbInsertPoop } from "../utility/dbFunctions/dbInsertPoop";
interface Props {
  database: any; // proper type to be done
  setWasDatabaseUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonsContainer: React.FC<Props> = ({
  database,
  setWasDatabaseUpdated,
}) => {
  const peeButtonHandler = (): void => {
    dbInsertPee(database); // if success setWas
    setWasDatabaseUpdated(true);
  };

  const poopButtonHandler = () => {
    dbInsertPoop(database);
    setWasDatabaseUpdated(true);
  };

  return (
    <View style={styles.buttonsContainer}>
      <Button buttonText="pee" handler={peeButtonHandler} />
      <Button buttonText="poop" handler={poopButtonHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
