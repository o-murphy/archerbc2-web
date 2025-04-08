import { StyleSheet, View } from "react-native";
import { TextInput, Text, Divider, Surface } from "react-native-paper";

const BulletContent = () => {
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
        <TextInput mode="outlined" dense style={styles.input} />
        <View style={styles.label} />
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>{"Coefficients"}</Text>
        <Divider style={styles.divider} />
        <View style={styles.label} />
      </View>

      <Surface elevation={2} style={{height: "40%", width: "78%"}}>
        <Text style={styles.label}>{"Coefficient table placeholder"}</Text>
      </Surface>

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
});

export default BulletContent;

