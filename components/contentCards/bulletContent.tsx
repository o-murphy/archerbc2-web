import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import StandardDragTable from "../dragModelTable/standardDragTable";
import CustomDragTable from "../dragModelTable/customDragTable";
import { FieldEditFloat, FieldEditFloatProps, useProfileFieldState } from "../fieldsEdit/fieldEditInput";
import { BcType, Profile } from "a7p-js/dist/types";
import { HelpButton } from "./help/helpIcons";
import { FieldHelp } from "./help/helpContent";
import { BulletFloatFields } from "./fiedProps";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "./contentTitle";


const bcTypeMap: Record<string, React.ReactNode> = {
  G1: <StandardDragTable model={BcType.G1} />,
  G7: <StandardDragTable model={BcType.G7} />,
  CUSTOM: <CustomDragTable />,
};


const DragModel = () => {
  const { t } = useTranslation()

  const [bcType, setBcType] = useProfileFieldState<keyof Profile, BcType>({
    field: 'bcType',
    defaultValue: BcType.G1,
  });

  const handleBcTypeChange = (value: string) => {
    setBcType(value as BcType); // value is safely typed as ModelType
  }

  const renderContent = () => bcTypeMap[bcType] ?? <Text>{t("bulletContent.Unknown")}</Text>;

  return (
    <>
      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp().DragModel}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text style={styles.label}>{t("bulletContent.DragModel")}</Text>
        </HelpButton>
        <SegmentedButtons style={styles.segmented} onValueChange={handleBcTypeChange} value={bcType}
          buttons={[
            {
              value: BcType.G1,
              label: t('bulletContent.G1'),
            },
            {
              value: BcType.G7,
              label: t('bulletContent.G7'),
            },
            {
              value: BcType.CUSTOM,
              label: t('bulletContent.CUSTOM'),
            },
          ]}
        />
      </View>
      {/* <View style={styles.row}> */}
        <View style={{ flex: 4 }}>{renderContent()}</View>
      {/* </View> */}
    </>
  )
};


const BulletContent = () => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <ContentTitle title={t("bulletContent.Bullet")} helpKey="BulletCard" />

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp().bDiameter}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text style={styles.label}>{t("bulletContent.Diameter")}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bDiameter as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={t("measure.inch")} />}
        />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp().bWeight}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text style={styles.label}>{t("bulletContent.Weight")}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bWeight as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={t("measure.grain")} />}
        />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp().bLength}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text style={styles.label}>{t("bulletContent.Length")}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bLength as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={t("measure.inch")} />}
        />
      </View>

      <DragModel />
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
  segmented: {
    flex: 3,
  },
});

export default BulletContent;

