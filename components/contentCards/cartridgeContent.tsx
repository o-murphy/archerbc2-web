import { StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { FileEditInputInt } from "../fileEditInput";


const CartridgeContent = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Cartridge
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>{"Muzzle velocity"}</Text>
        <FileEditInputInt
          field="cMuzzleVelocity"
          range={{ min: 1, max: 3000 }}
          multiplier={10}
          {...{
            style: styles.input
          }}
        />
        <Text style={styles.label}>{"mps"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Powder temperature"}</Text>
        <FileEditInputInt
          field="cZeroPTemperature"
          range={{ min: -50, max: 50 }}
          multiplier={1}
          {...{
            style: styles.input
          }}
        />
        <Text style={styles.label}>{"°C"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Temperature sensitivity"}</Text>
        <FileEditInputInt  //FIXME float
          field="cTCoeff"
          range={{ min: 0, max: 100 }}
          multiplier={1000}
          {...{
            style: styles.input,
            left: <TextInput.Icon icon={"calculator"} />
          }}
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

