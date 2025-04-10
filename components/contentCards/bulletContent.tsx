import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons } from "react-native-paper";
import StandardDragTable from "../dragModelTable/standardDragTable";
import CustomDragTable from "../dragModelTable/customDragTable";
import { FieldEditFloat, FieldEditFloatProps, FieldFloatProps, useFileField } from "../fileEditInput";
import { BcType, ProfileProps } from "@/utils/a7p";


const bcTypeMap: Record<string, React.ReactNode> = {
  G1: <StandardDragTable model={BcType.G1} />,
  G7: <StandardDragTable model={BcType.G7} />,
  CUSTOM: <CustomDragTable />,
};


const BulletFloatFields: FieldFloatProps = {
  bDiameter: {
    field: "bDiameter",
    range: { min: -50, max: 50 },
    multiplier: 100,
    fraction: 2,
  },
  bWeight: {
    field: "bWeight",
    range: { min: 0, max: 100 },
    multiplier: 1,
    fraction: 0,
  },
  bLength: {
    field: "bLength",
    range: { min: 0, max: 100 },
    multiplier: 1,
    fraction: 0,
  },
};


const DragModel = () => {
  const [bcType, setBcType] = useFileField<keyof ProfileProps, BcType>({
    field: 'bcType',
    defaultValue: BcType.G1,
  });

  const onChangeBcType = (value: string) => {
    setBcType(value as BcType); // value is safely typed as ModelType
  }

  const renderContent = () => bcTypeMap[bcType] ?? <Text>Unknown</Text>;


  return (
    <View style={styles.row}>
      <Text style={styles.label}>{"Drag model"}</Text>
      <SegmentedButtons style={styles.segmented} onValueChange={onChangeBcType} value={bcType}
        buttons={[
          {
            value: BcType.G1,
            label: 'G7',
          },
          {
            value: BcType.G7,
            label: 'G1',
          },
          {
            value: BcType.CUSTOM,
            label: 'CUSTOM',
          },
        ]}
      />    <View style={styles.label} />

      {renderContent()}
    </View>
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
        {/* <TextInput mode="outlined" dense style={styles.input} /> */}
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bDiameter as FieldEditFloatProps}
          {...{
            style: styles.input,
          }}
        />
        <Text style={styles.label}>{"inch"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Weight"}</Text>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bWeight as FieldEditFloatProps}
          {...{
            style: styles.input,
          }}
        />
        <Text style={styles.label}>{"grain"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Length"}</Text>
        <FieldEditFloat  //FIXME float
          {...BulletFloatFields.bLength as FieldEditFloatProps}
          {...{
            style: styles.input,
          }}
        />
        <Text style={styles.label}>{"inch"}</Text>
      </View>

      <DragModel />
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
  divider: {
    flex: 3,
  },
  segmented: {
    flex: 3,
  },
  sectionTitle: {
    flex: 1,
    marginBottom: 4,
    alignSelf: "center"
  },
  scrollContainer: {
    paddingHorizontal: 24
  }
});

export default BulletContent;

