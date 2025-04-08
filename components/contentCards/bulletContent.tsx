import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Text, SegmentedButtons } from "react-native-paper";
import StandardDragTable, { ModelType, isModelType } from "../dragModelTable/standardDragTable";
import CustomDragTable from "../dragModelTable/customDragTable";


const bcTypeMap: Record<string, React.ReactNode> = {
  G1: <StandardDragTable model="G1" />,
  G7: <StandardDragTable model="G7" />,
  CUSTOM: <CustomDragTable />,
};

const BulletContent = () => {
  const [bcType, setBcType] = useState<ModelType>('G7');

  const renderContent = () => bcTypeMap[bcType] ?? <Text>Unknown</Text>;

  const onChangeBcType = (value: string) => {
    if (isModelType(value)) {
      setBcType(value); // value is safely typed as ModelType
    }
  }

  return (
    <View style={styles.container}>

      <Text variant="titleLarge" style={styles.header}>
        Bullet
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>{"Diameter"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
        <Text style={styles.label}>{"inch"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Weight"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
        <Text style={styles.label}>{"grain"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Length"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
        <Text style={styles.label}>{"inch"}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Drag model"}</Text>
        <SegmentedButtons style={styles.segmented} onValueChange={onChangeBcType} value={bcType}
          buttons={[
            {
              value: 'G7',
              label: 'G7',
            },
            {
              value: 'G1',
              label: 'G1',
            },
            {
              value: 'CUSTOM',
              label: 'CUSTOM',
            },
          ]}
        />
        <View style={styles.label} />
      </View>



      <View style={styles.row}>
        {renderContent()}
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

