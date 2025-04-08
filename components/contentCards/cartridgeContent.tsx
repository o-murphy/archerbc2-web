import { StyleSheet, View } from "react-native";
import { TextInput, Text, Button, IconButton } from "react-native-paper";


const CartridgeContent = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Cartridge
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>{"Muzzle velocity"}</Text>
        <TextInput mode="outlined" dense style={styles.input}/>
        <Text style={styles.label}>{"mps"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Powder temperature"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
        <Text style={styles.label}>{"°C"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Temperature sensitivity"}</Text>
        <TextInput mode="outlined" dense style={styles.input}
          left={<TextInput.Icon icon={"calculator"} />}
        />
        <Text style={styles.label}>{"%/15°C"}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 600,
  },
  header: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 8,
  },
  label: {
    flex: 1,
  },
  input: {
    flex: 3,
    // height: 24
  },
});

export default CartridgeContent;

