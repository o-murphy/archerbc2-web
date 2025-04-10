import { StyleSheet, View } from "react-native";
import { Button, FAB, IconButton, Text, TextInput, ToggleButton } from "react-native-paper";
import { FieldEditFloat, FieldEditFloatProps, FieldFloatProps } from "../fileEditInput";
import ZeroDistanceField from "../zeroDistanceField";

const ZeroingFloatFields: FieldFloatProps = {
  zeroX: {
    field: "zeroX",
    range: { min: -200, max: 200 },
    multiplier: -1000,
    fraction: 2,
  },
  zeroY: {
    field: "zeroY",
    range: { min: -200, max: 200 },
    multiplier: 1000,
    fraction: 2,
  },

  cZeroWPitch: {
    field: "cZeroWPitch",
    range: { min: -90, max: 90 },
    multiplier: 1,
    fraction: 0,
  },

  cZeroAirTemperature: {
    field: "cZeroAirTemperature",
    range: { min: -50, max: 50 },
    multiplier: 1,
    fraction: 0,
  },
  cZeroPTemperature: {
    field: "cZeroPTemperature",
    range: { min: -50, max: 50 },
    multiplier: 1,
    fraction: 0,
  },
  cZeroAirPressure: {
    field: "cZeroAirPressure",
    range: { min: 0, max: 65535 },
    multiplier: 10,
    fraction: 0,
  },
  cZeroAirHumidity: {
    field: "cZeroAirHumidity",
    range: { min: 0, max: 100 },
    multiplier: 1,
    fraction: 0,
  },
};


const ZeroingContent = ({onDistancesBtnPress}: {onDistancesBtnPress?: () => void}) => {
  return (
    <View style={[styles.container]}>
      <Text variant="titleLarge" style={styles.header}>
        Zeroing
      </Text>

      <View style={styles.columns}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>{"Zero X"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.zeroX as FieldEditFloatProps}
              style={styles.input}
              right={<TextInput.Affix text={"click"}/>}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{"Zero distance"}</Text>
            <View style={[styles.row, styles.input, { gap: 0, alignItems: "center" }]}>
              <ZeroDistanceField style={styles.select}/>
              <IconButton style={styles.distancesEditBtn} mode="outlined" icon={"playlist-edit"} onPress={onDistancesBtnPress} />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{"Air"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroAirTemperature as FieldEditFloatProps}
              style={styles.input}
              right={<TextInput.Affix text={"°C"}/>}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{"Pressure"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroAirPressure as FieldEditFloatProps}
              style={styles.input}
              right={<TextInput.Affix text={"hPa"}/>}
            />
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>{"Zero Y"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.zeroY as FieldEditFloatProps}
              style={styles.input}
              right={<TextInput.Affix text={"click"}/>}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Pitch"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroWPitch as FieldEditFloatProps}
              style={styles.input}
              right={<TextInput.Affix text={"degree"}/>}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Powder"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroPTemperature as FieldEditFloatProps}
              style={styles.input}
              right={<TextInput.Affix text={"°C"}/>}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Humidity"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroAirHumidity as FieldEditFloatProps}
              style={styles.input}
              right={<TextInput.Affix text={"%"}/>}
            />
          </View>
        </View>
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
