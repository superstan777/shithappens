import { dbCreateTables } from "./src/utility/dbFunctions/dbCreateTables";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { DogScreen } from "./src/screens/DogScreen";
import { CreateDogScreen } from "./src/screens/CreateDogScreen";
import { dbGetDogInfo } from "./src/utility/dbFunctions/dbGetDogInfo";
import { SelectScreen } from "./src/screens/SelectScreen";
import { ImportDogScreen } from "./src/screens/ImportDogScreen";
import { DatabaseContext } from "./src/Context/DatabaseContext";

export default function App() {
  //sqlite types to be added
  const [screen, setScreen] = useState<string>("loading");
  const [wasDogInfoTableUpdated, setWasDogInfoTableUpdated] =
    useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState(true);
  const database = useContext(DatabaseContext);

  const setScreenHandler = async () => {
    const dogInfo = await dbGetDogInfo(database);
    if (dogInfo.rows._array.length === 0) {
      setScreen("select");
    } else {
      setScreen("dog");
    }
  };

  useEffect(() => {
    dbCreateTables(database);
    setScreenHandler();
  }, []);

  useEffect(() => {
    setScreenHandler();
    setWasDogInfoTableUpdated(false);
  }, [wasDogInfoTableUpdated]);

  const renderScreen = (param: string) => {
    switch (param) {
      case "loading":
        return <View></View>;
      case "create":
        return (
          <CreateDogScreen
            setWasDogInfoTableUpdated={setWasDogInfoTableUpdated}
          />
        );
      case "dog":
        return <DogScreen />;
      case "select":
        return <SelectScreen setScreen={setScreen} />;
      case "import":
        return <ImportDogScreen />;
      default:
        return "loading";
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {renderScreen(screen)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
