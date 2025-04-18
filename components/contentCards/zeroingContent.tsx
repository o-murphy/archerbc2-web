import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { FieldEditFloat, FieldEditFloatProps } from "../fieldsEdit/fieldEditInput";
import ZeroDistanceField from "../fieldsEdit/zeroDistanceField";
import { FieldHelp } from "./help/helpContent";
import { HelpButton } from "./help/helpIcons";
import { ZeroingFloatFields } from "./fiedProps";
import { ThemedIcon } from "../icons/customIcons";
import { useTranslation } from "react-i18next";
import { ToolTipIconButton } from "../iconButtonWithTooltip";


const ZeroingContent = ({ onDistancesBtnPress }: { onDistancesBtnPress?: () => void }) => {
  const { t } = useTranslation()

  return (
    <View style={[styles.container]}>

      <HelpButton helpContent={FieldHelp.ZeroingCard}>
        <Text variant="titleLarge" style={styles.header}>
          {t("zeroingContent.Zeroing")}
        </Text>
      </HelpButton>

      <View style={styles.column}>
        <View style={styles.row}>

          <HelpButton
            helpContent={FieldHelp.zeroX}
            style={[styles.label, { alignContent: "center" }]}
          >
            <Text>{t("zeroingContent.ZeroX")}</Text>
          </HelpButton>

          <FieldEditFloat  //FIXME float
            {...ZeroingFloatFields.zeroX as FieldEditFloatProps}
            style={styles.input}
            right={<TextInput.Affix text={t("measure.click")} />}
          />
        </View>

        <View style={styles.row}>
          <HelpButton
            helpContent={FieldHelp.zeroY}
            style={[styles.label, { alignContent: "center" }]}
          >
            <Text>{t("zeroingContent.ZeroY")}</Text>
          </HelpButton>
          <FieldEditFloat  //FIXME float
            {...ZeroingFloatFields.zeroY as FieldEditFloatProps}
            style={styles.input}
            right={<TextInput.Affix text={t("measure.click")} />}
          />
        </View>

        <View style={styles.row}>
          <HelpButton
            helpContent={FieldHelp.cZeroDistanceIdx}
            style={[styles.label, { alignContent: "center" }]}
          >
            <Text>{t("zeroingContent.ZeroDistance")}</Text>
            <ThemedIcon source="zeroing-distance" size={24} />
          </HelpButton>
          <View style={[styles.row, styles.input, { gap: 0, alignItems: "center" }]}>
            <ZeroDistanceField style={styles.select} />
            <ToolTipIconButton
              tooltip={t("zeroingContent.EditDistances")}
              style={styles.distancesEditBtn}
              mode="outlined"
              icon={"playlist-edit"}
              onPress={onDistancesBtnPress}
            />
          </View>
        </View>

        <View style={styles.row}>
          <HelpButton
            helpContent={FieldHelp.cZeroAirTemperature}
            style={[styles.label, { alignContent: "center" }]}
          >
            <Text>{t("zeroingContent.AirTemperature")}</Text>
          </HelpButton>
          <FieldEditFloat  //FIXME float
            {...ZeroingFloatFields.cZeroAirTemperature as FieldEditFloatProps}
            style={styles.input}
            right={<TextInput.Affix text={t("measure.°C")} />}
          />
        </View>

        <View style={styles.row}>
          <HelpButton
            helpContent={FieldHelp.cZeroAirPressure}
            style={[styles.label, { alignContent: "center" }]}
          >
            <Text>{t("zeroingContent.AirPressure")}</Text>
          </HelpButton>
          <FieldEditFloat  //FIXME float
            {...ZeroingFloatFields.cZeroAirPressure as FieldEditFloatProps}
            style={styles.input}
            right={<TextInput.Affix text={t("measure.hPa")} />}
          />
        </View>


        <View style={styles.row}>
          <HelpButton
            helpContent={FieldHelp.cZeroWPitch}
            style={[styles.label, { alignContent: "center" }]}
          >
            <Text>{t("zeroingContent.Pitch")}</Text>
          </HelpButton>
          <FieldEditFloat  //FIXME float
            {...ZeroingFloatFields.cZeroWPitch as FieldEditFloatProps}
            style={styles.input}
            right={<TextInput.Affix text={t("measure.degree")} />}
          />
        </View>
        <View style={styles.row}>
          <HelpButton
            helpContent={FieldHelp.cZeroPTemperature}
            style={[styles.label, { alignContent: "center" }]}
          >
            <Text>{t("zeroingContent.PowderTemperature")}</Text>
          </HelpButton>
          <FieldEditFloat  //FIXME float
            {...ZeroingFloatFields.cZeroPTemperature as FieldEditFloatProps}
            style={styles.input}
            right={<TextInput.Affix text={t("measure.degree")} />}
          />
        </View>
        <View style={styles.row}>
          <HelpButton
            helpContent={FieldHelp.cZeroAirHumidity}
            style={[styles.label, { alignContent: "center" }]}
          >
            <Text>{t("zeroingContent.Humidity")}</Text>
          </HelpButton>
          <FieldEditFloat  //FIXME float
            {...ZeroingFloatFields.cZeroAirHumidity as FieldEditFloatProps}
            style={styles.input}
            right={<TextInput.Affix text={t("measure.%")} />}
          />
        </View>
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
  select: {
    flex: 3,
  },
  distancesEditBtn: {
    borderRadius: 4,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
  },
  column: {
    flex: 1,
  },
});

export default ZeroingContent;
