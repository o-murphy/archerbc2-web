import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { FieldEditFloat, FieldEditFloatProps, FieldFloatProps } from "../fileEditInput";
import { useCallback, useMemo, useState } from "react";
import { useFileContext } from "@/hooks/fileContext";
import { Dropdown } from 'react-native-paper-dropdown';

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

const ZeroDistanceField = () => {

  const { parsedData, setParsedData, dummyState } = useFileContext()

  const distances = useMemo(() => {
    if (parsedData.profile?.distances) {
      return parsedData.profile.distances.map((item, index) => {
        return {
          label: `${(item / 100)} m`,
          value: index.toString()
        }
      })
    }
    return []
  }, [parsedData, dummyState])

  const zeroDistanceIdx = useMemo<string>(
    () => (parsedData.profile?.cZeroDistanceIdx ?? 0).toString(),
    [parsedData, dummyState]
  )

  const handleZeroDistanceChange = (value: string) => {
    const intValue = parseInt(value)
    if (parsedData.profile?.cZeroDistanceIdx === intValue) return;
    setParsedData({
      ...parsedData,
      profile: {
        ...parsedData.profile,
        cZeroDistanceIdx: intValue,
      },
    });
  };

  return <View style={styles.row}>
    <Text style={styles.label}>{"Distance (m)"}</Text>
    <Dropdown
      placeholder="Select zero distance"
      options={distances}
      value={zeroDistanceIdx}
      onSelect={handleZeroDistanceChange}
      menuContentStyle={{flexDirection: "row", width: "72%"}}
      hideMenuHeader={true}
      maxMenuHeight={400}
      CustomDropdownInput={
        (props) => <TextInput
          {...props}
          dense={true}
          mode="outlined"
          style={[styles.input, {margin: 8, width: "72%"}]}
          outlineStyle={styles.input}
          underlineStyle={styles.input}
          value={distances[zeroDistanceIdx].label}
          right={<TextInput.Icon icon={"arrow-down"} disabled/>}
        />
      }
    />
  </View>
}

const ZeroingContent = () => {
  return (
    <View style={[styles.container]}>
      <Text variant="titleLarge" style={styles.header}>
        Zeroing
      </Text>

      <View style={styles.columns}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>{"Zero X (click)"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.zeroX as FieldEditFloatProps}
              style={styles.input}
            />
          </View>

          <ZeroDistanceField />

          <View style={styles.row}>
            <Text style={styles.label}>{"Air (°C)"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroAirTemperature as FieldEditFloatProps}
              style={styles.input}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{"Pressure (hPa)"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroAirPressure as FieldEditFloatProps}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>{"Zero Y (click)"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.zeroY as FieldEditFloatProps}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Pitch (degrees)"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroWPitch as FieldEditFloatProps}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Powder (°C)"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroPTemperature as FieldEditFloatProps}
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Humidity (%)"}</Text>
            <FieldEditFloat  //FIXME float
              {...ZeroingFloatFields.cZeroAirHumidity as FieldEditFloatProps}
              style={styles.input}
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
    // height: 24
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
