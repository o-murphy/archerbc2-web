import { StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";

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
            <TextInput mode="outlined" dense style={styles.input} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{"Distance (m)"}</Text>
            <TextInput mode="outlined" dense style={styles.input} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{"Air (°C)"}</Text>
            <TextInput mode="outlined" dense style={styles.input} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>{"Pressure (hPa)"}</Text>
            <TextInput mode="outlined" dense style={styles.input} />
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>{"Zero Y (click)"}</Text>
            <TextInput mode="outlined" dense style={styles.input} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Pitch (degrees)"}</Text>
            <TextInput mode="outlined" dense style={styles.input} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Powder (°C)"}</Text>
            <TextInput mode="outlined" dense style={styles.input} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{"Humidity (%)"}</Text>
            <TextInput mode="outlined" dense style={styles.input} />
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
