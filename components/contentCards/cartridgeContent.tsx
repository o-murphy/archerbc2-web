import { StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { FieldEditFloat, FieldEditFloatProps } from "../fieldsEdit/fieldEditInput";
import { CartridgeFields } from "./fiedProps";
import { HelpButton } from "./help/helpIcons";
import { FieldHelp } from "./help/helpContent";
import CartridgeHelpContent from "./help/cartridgeHelp";


const CartridgeContent = () => {
  return (
    <View style={styles.container}>

      <HelpButton helpContent={FieldHelp.CartridgeCard}>
        <Text variant="titleLarge" style={styles.header}>
          Cartridge
        </Text>
      </HelpButton>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.cMuzzleVelocity}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>{"Muzzle velocity"}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...CartridgeFields.cMuzzleVelocity as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={"mps"} />}
        />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.cZeroTemperature}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>{"Powder temperature"}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...CartridgeFields.cZeroTemperature as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={"°C"} />}
        />
      </View>

      <View style={styles.row}>

        <HelpButton
          helpContent={FieldHelp.cMuzzleVelocity}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>{"Temperature sensitivity"}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...CartridgeFields.cTCoeff as FieldEditFloatProps}
          style={styles.input}
          left={<TextInput.Icon icon={"calculator"} />}
          right={<TextInput.Affix text={"%/15°C"} />}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
    maxWidth: 500,
  },
  header: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 32,
    marginBottom: 8,
  },
  label: {
    flex: 1,
  },
  input: {
    flex: 3,
  },
});

export default CartridgeContent;

