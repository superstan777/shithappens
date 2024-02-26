import * as SQLite from "expo-sqlite";
import { dbCreateTables } from "./src/utility/dbFunctions/dbCreateTables";
import { StyleSheet, SafeAreaView } from "react-native";
import { ButtonsContainer } from "./src/components/ButtonsContainer";
import { MainContainer } from "./src/components/MainContainer";
import { useState, useEffect } from "react";
import { dbGetLastPeeInfo } from "./src/utility/dbFunctions/dbGetLastPeeInfo";
import { dbGetLastPoopInfo } from "./src/utility/dbFunctions/dbGetLastPoopInfo";

export default function App() {
  //sqlite types to be added
  const db = SQLite.openDatabase("dog2111.db");
  const [wasDatabaseUpdated, setWasDatabaseUpdated] = useState(false);
  const [peeTimer, setPeeTimer] = useState<string>("");
  const [peeElapsedTime, setPeeElapsedTime] = useState<number>(0);
  const [poopTimer, setPoopTimer] = useState<string>("");
  const [poopElapsedTime, setPoopElapsedTime] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPeeElapsedTime((prevTime) => prevTime + 1);
      setPoopElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const hours = Math.floor(peeElapsedTime / 3600);
    const minutes = Math.floor((peeElapsedTime % 3600) / 60);
    const seconds = peeElapsedTime % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    setPeeTimer(formattedTime);
  }, [peeElapsedTime]);

  useEffect(() => {
    const hours = Math.floor(poopElapsedTime / 3600);
    const minutes = Math.floor((poopElapsedTime % 3600) / 60);
    const seconds = poopElapsedTime % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    setPoopTimer(formattedTime);
  }, [poopElapsedTime]);

  const countSecondsDifference = (previousDateObject: Date): number => {
    const now = new Date();
    const timeDifference = now.getTime() - previousDateObject.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    return secondsDifference;
  };

  const setPeeElapsedTimeHandler = async (): Promise<void> => {
    const lastPeeObject = await dbGetLastPeeInfo(db);
    console.log(lastPeeObject);
    if (lastPeeObject !== undefined) {
      const lastPeeDate = new Date(
        lastPeeObject.date + "T" + lastPeeObject.time
      );
      console.log(lastPeeDate);
      setPeeElapsedTime(countSecondsDifference(lastPeeDate));
    }
  };

  const setPoopElapsedTimeHandler = async (): Promise<void> => {
    const lastPoopObject = await dbGetLastPoopInfo(db);
    if (lastPoopObject !== undefined) {
      const lastPoopDate = new Date(
        lastPoopObject.date + "T" + lastPoopObject.time
      );
      setPoopElapsedTime(countSecondsDifference(lastPoopDate));
    }
  };

  useEffect(() => {
    dbCreateTables(db);
    setPeeElapsedTimeHandler();
    setPoopElapsedTimeHandler();
  }, []);

  useEffect(() => {
    if (wasDatabaseUpdated) {
      setPeeElapsedTimeHandler();
      setPoopElapsedTimeHandler();
      setWasDatabaseUpdated(false);
    }
  }, [wasDatabaseUpdated]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <MainContainer peeTimer={peeTimer} poopTimer={poopTimer} database={db} />
      <ButtonsContainer
        database={db}
        setWasDatabaseUpdated={setWasDatabaseUpdated}
      />
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
