import { View, StyleSheet } from "react-native";
import { MainContainer } from "../components/MainContainer";
import { ButtonsContainer } from "../components/ButtonsContainer";
import { useState, useEffect } from "react";
import { countTimeDifferenceInSeconds } from "../utility/countTimeDifferenceInSeconds";
import { dbGetLastPeeInfo } from "../utility/dbFunctions/dbGetLastPeeInfo";
import { dbGetLastPoopInfo } from "../utility/dbFunctions/dbGetLastPoopInfo";
interface Props {
  database: any;
}

export const DogScreen: React.FC<Props> = ({ database }) => {
  const [peeTimer, setPeeTimer] = useState<string>("");
  const [peeElapsedTime, setPeeElapsedTime] = useState<number>(0);
  const [poopTimer, setPoopTimer] = useState<string>("");
  const [poopElapsedTime, setPoopElapsedTime] = useState<number>(0);
  const [wasDatabaseUpdated, setWasDatabaseUpdated] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPeeElapsedTime((prevTime) => prevTime + 1);
      setPoopElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
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

  const setPeeElapsedTimeHandler = async (): Promise<void> => {
    const lastPeeObject = await dbGetLastPeeInfo(database);
    if (lastPeeObject !== undefined) {
      const lastPeeDate = new Date(
        lastPeeObject.date + "T" + lastPeeObject.time
      );
      setPeeElapsedTime(countTimeDifferenceInSeconds(lastPeeDate));
    }
  };

  const setPoopElapsedTimeHandler = async (): Promise<void> => {
    const lastPoopObject = await dbGetLastPoopInfo(database);
    if (lastPoopObject !== undefined) {
      const lastPoopDate = new Date(
        lastPoopObject.date + "T" + lastPoopObject.time
      );
      setPoopElapsedTime(countTimeDifferenceInSeconds(lastPoopDate));
    }
  };

  return (
    <View style={styles.dogScreen}>
      <MainContainer
        peeTimer={peeTimer}
        poopTimer={poopTimer}
        database={database}
      />
      <ButtonsContainer
        database={database}
        setWasDatabaseUpdated={setWasDatabaseUpdated}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dogScreen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});
