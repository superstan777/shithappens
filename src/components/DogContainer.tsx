import { StyleSheet, Text, View } from "react-native";
import { DogInfo } from "./DogInfo";
import { StatusContainer } from "./StatusContainer";
import QRCode from "react-native-qrcode-svg";
import { useState, useEffect, useContext } from "react";
import { dbGetDogInfo } from "../utility/dbFunctions/dbGetDogInfo";
import { DatabaseContext } from "../Context/DatabaseContext";

interface Props {
  peeTimer: string;
  poopTimer: string;
}
export const DogContainer: React.FC<Props> = ({ peeTimer, poopTimer }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [qr, setQr] = useState<string>("");
  const database = useContext(DatabaseContext);

  const setQrHandler = async (): Promise<void> => {
    const result = await dbGetDogInfo(database);
    setQr(result.rows._array[0].name); // qr value placeholder
    setIsMounted(true);
  };

  useEffect(() => {
    setQrHandler();
  }, []);

  return (
    <View style={styles.dogContainer}>
      <DogInfo database={database} />
      <StatusContainer
        peeTimer={peeTimer}
        poopTimer={poopTimer}
        database={database}
      />
      {isMounted && <QRCode value={qr} size={100} />}
    </View>
  );
};

const styles = StyleSheet.create({
  dogContainer: {
    width: "80%",
    height: "80%",
    borderRadius: 25,
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

// empty + can use camera to take a photo of dog or import from photos
