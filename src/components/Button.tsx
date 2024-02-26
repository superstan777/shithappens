import { StyleSheet, Text, View, Pressable } from "react-native";

interface ButtonProps {
  buttonText: string;
  handler: () => void | Promise<void>;
}

export const Button: React.FC<ButtonProps> = ({ buttonText, handler }) => {
  return (
    // function to be added
    <Pressable onPress={handler}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#51af58",
    width: 140,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
  },
});
