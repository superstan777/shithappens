import { StyleSheet, View, Text } from "react-native";
import { Timer } from "./Timer";
interface StatusBarProps {
  statusBarText: string;
  timerValue: string;
}
export const StatusBar: React.FC<StatusBarProps> = ({
  statusBarText,
  timerValue,
}) => {
  //   const [barValue, setBarValue] = useState()
  return (
    <View style={styles.statusContainer}>
      <Text style={styles.statusBarText}>{statusBarText}</Text>
      <Text style={styles.timer}>{timerValue}</Text>

      {/* <View style={styles.statusBar}>
        <View style={styles.statusBarFill}></View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "20%",
  },
  statusBar: {
    width: "90%",
    height: 40,
    backgroundColor: "#baa",
    borderRadius: 25,
  },
  statusBarFill: {
    width: "10%",
    height: 40,
    backgroundColor: "blue",
    borderRadius: 25,
  },
  statusBarText: {
    fontSize: 20,
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
