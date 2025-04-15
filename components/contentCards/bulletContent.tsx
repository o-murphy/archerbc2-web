import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import StandardDragTable from "../dragModelTable/standardDragTable";
import CustomDragTable from "../dragModelTable/customDragTable";
import { FieldEditFloat, FieldEditFloatProps, FieldFloatProps, useProfileFieldState } from "../fieldsEdit/fieldEditInput";
import { BcType, Profile } from "@/utils/a7p/types";


const bcTypeMap: Record<string, React.ReactNode> = {
  G1: <StandardDragTable model={BcType.G1} />,
  G7: <StandardDragTable model={BcType.G7} />,
  CUSTOM: <CustomDragTable />,
};


const BulletFloatFields: FieldFloatProps = {
  bDiameter: {
    field: "bDiameter",
    range: { min: 0.01, max: 50 },
    multiplier: 1000,
    fraction: 3,
  },
  bWeight: {
    field: "bWeight",
    range: { min: 0.1, max: 30000 },
    multiplier: 10,
    fraction: 1,
  },
  bLength: {
    field: "bLength",
    range: { min: 0.01, max: 50 },
    multiplier: 1000,
    fraction: 3,
  },
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
        <Text style={styles.label}>{"Drag model"}</Text>
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

      <Text variant="titleLarge" style={styles.header}>
        Bullet
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>{"Diameter"}</Text>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bDiameter as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={"inch"} />}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Weight"}</Text>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bWeight as FieldEditFloatProps}
          style={styles.input}
          right={<TextInput.Affix text={"grain"} />}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Length"}</Text>
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
    width: 400,
  },
  header: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
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

