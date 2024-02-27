import * as SQLite from "expo-sqlite";
import { dbCreateTables } from "./src/utility/dbFunctions/dbCreateTables";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { useState, useEffect } from "react";
import { DogScreen } from "./src/screens/DogScreen";
import { CreateDogScreen } from "./src/screens/CreateDogScreen";
import { dbGetDogInfo } from "./src/utility/dbFunctions/dbGetDogInfo";
import { SelectScreen } from "./src/screens/SelectScreen";
import { ImportDogScreen } from "./src/screens/ImportDogScreen";

export default function App() {
  //sqlite types to be added
  const db = SQLite.openDatabase("dog21111111111.db");
  const [screen, setScreen] = useState<string>("loading");
  const [wasDogInfoTableUpdated, setWasDogInfoTableUpdated] =
    useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState(true);

  const setScreenHandler = async () => {
    const dogInfo = await dbGetDogInfo(db);
    if (dogInfo.rows._array.length === 0) {
      setScreen("select");
    } else {
      setScreen("dog");
    }
  };

  useEffect(() => {
    dbCreateTables(db);
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
            database={db}
            setWasDogInfoTableUpdated={setWasDogInfoTableUpdated}
          />
        );
      case "dog":
        return <DogScreen database={db} />;
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
