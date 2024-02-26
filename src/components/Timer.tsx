import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export const Timer: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState<number>(0); // zaczyna od 0
  const [timerText, setTimerText] = useState<string>(""); // pusty string

  useEffect(() => {
    //co sekundę dodaje 1 do stanu
    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  useEffect(() => {
    // Calculate hours, minutes, and seconds from elapsedTime
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    // Format the time into a string
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // Update the timer text
    setTimerText(formattedTime);
  }, [elapsedTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{timerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
