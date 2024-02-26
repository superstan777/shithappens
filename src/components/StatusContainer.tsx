import { StyleSheet, View } from "react-native";
import { StatusBar } from "./StatusBar";
import { Button } from "./Button";
import { dbGetTodaysPeeRecords } from "../utility/dbFunctions/dbGetTodaysPeeRecords";
import { dbGetTodaysPoopRecords } from "../utility/dbFunctions/dbGetTodaysPoopRecords";

interface Props {
  peeTimer: string;
  poopTimer: string;
  database: any;
}
export const StatusContainer: React.FC<Props> = ({
  peeTimer,
  poopTimer,
  database,
}) => {
  const getReportHandler = async () => {
    const todaysPee = await dbGetTodaysPeeRecords(database);
    const todaysPoop = await dbGetTodaysPoopRecords(database);
    console.log(`kupy: ${todaysPoop.length}`);
    console.log(`siku: ${todaysPee.length}`);
  };

  return (
    <View style={styles.statusContainer}>
      <StatusBar timerValue={peeTimer} statusBarText="pee" />
      <StatusBar timerValue={poopTimer} statusBarText="poop" />
      {/* <Button buttonText="Get today's report" handler={getReportHandler} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flex: 2,
    borderRadius: 25,
    display: "flex",
    flexDirection: "column",
  },
});
