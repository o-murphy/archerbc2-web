import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import StandardDragTable from "../dragModelTable/standardDragTable";
import CustomDragTable from "../dragModelTable/customDragTable";
import { FieldEditFloat, FieldEditFloatProps, useProfileFieldState } from "../fieldsEdit/fieldEditInput";
import { BcType, Profile } from "a7p-js/dist/types";
import { HelpButton } from "./help/helpIcons";
import { FieldHelp } from "./help/helpContent";
import { BulletFloatFields } from "./fiedProps";


const bcTypeMap: Record<string, React.ReactNode> = {
  G1: <StandardDragTable model={BcType.G1} />,
  G7: <StandardDragTable model={BcType.G7} />,
  CUSTOM: <CustomDragTable />,
};


const DragModel = () => {
  const [bcType, setBcType] = useProfileFieldState<keyof Profile, BcType>({
    field: 'bcType',
    defaultValue: BcType.G1,
  });

  const handleBcTypeChange = (value: string) => {
    setBcType(value as BcType); // value is safely typed as ModelType
  }

  const renderContent = () => bcTypeMap[bcType] ?? <Text>Unknown</Text>;

  return (
    <>
      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.dragModel}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text style={styles.label}>{"Drag model"}</Text>
        </HelpButton>
        <SegmentedButtons style={styles.segmented} onValueChange={handleBcTypeChange} value={bcType}
          buttons={[
            {
              value: BcType.G1,
              label: 'G1',
            },
            {
              value: BcType.G7,
              label: 'G7',
            },
            {
              value: BcType.CUSTOM,
              label: 'CUSTOM',
            },
          ]}
        />
      </View>
      <View style={styles.row}>
        <View style={{ flex: 4 }}>{renderContent()}</View>
      </View>
    </>
  )
};


const BulletContent = () => {

  return (
    <View style={styles.container}>

      <HelpButton helpContent={FieldHelp.BulletCard}>
        <Text variant="titleLarge" style={styles.header}>
        Bullet
        </Text>
      </HelpButton>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.bDiameter}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text style={styles.label}>{"Diameter"}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bDiameter as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={"inch"} />}
        />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.bWeight}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text style={styles.label}>{"Weight"}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bWeight as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={"grain"} />}
        />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.bLength}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text style={styles.label}>{"Length"}</Text>
        </HelpButton>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bLength as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={"inch"} />}
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

