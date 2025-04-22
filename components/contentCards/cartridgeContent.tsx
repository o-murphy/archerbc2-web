import { StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { FieldEditFloat, FieldEditFloatProps } from "../fieldsEdit/fieldEditInput";
import { CartridgeFields } from "./fiedProps";
import { HelpButton } from "./help/helpIcons";
import { FieldHelp } from "./help/helpContent";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "./contentTitle";


const CartridgeContent = () => {
  const { t } = useTranslation()


  return (
    <View style={styles.container}>
      <ContentTitle title={t("cartridgeContent.Cartridge")} helpKey="CartridgeCard" />

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp().cMuzzleVelocity}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>{t("cartridgeContent.MuzzleVelocity")}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...CartridgeFields.cMuzzleVelocity as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={t("measure.mps")} />}
        />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp().cZeroTemperature}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>{t("cartridgeContent.PowderTemperature")}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...CartridgeFields.cZeroTemperature as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={t("measure.°C")} />}
        />
      </View>

      <View style={styles.row}>

        <HelpButton
          helpContent={FieldHelp().cTCoeff}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>{t("cartridgeContent.TemperatureSensitivity")}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...CartridgeFields.cTCoeff as FieldEditFloatProps}
          style={styles.input}
          left={<TextInput.Icon icon={"calculator"} />}
          right={<TextInput.Affix text={t("measure.%/15°C")} />}
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

