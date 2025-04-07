import { StyleSheet, View } from "react-native";
import { TextInput, Text, Divider } from "react-native-paper";

const DescriptionContent = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Rifle Settings
      </Text>

      {/* Name Row */}
      <View style={styles.row}>
        <Text style={styles.label}>{"Name"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
      </View>

      {/* Top and Bot Row */}
      <View style={styles.row}>
        <Text style={styles.label}>{"Hints"}</Text>
        <TextInput label={"Top"} mode="outlined" dense style={styles.halfInput} />
        <TextInput label={"Bottom"} mode="outlined" dense style={styles.halfInput} />
      </View>

      {/* Round Section */}
      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"Round"}</Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Cartridge"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{"Bullet"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
      </View>

      {/* User Note Section */}
      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"User Note"}</Text>
        <Divider style={styles.divider} />
      </View>

      {/* Note Text Area */}
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={4}
          style={[styles.input, { width: "100%", height: styles.input.height * 2 }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 500,
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
    fontSize: 14,
  },
  input: {
    width: "60%",
    height: 32
  },
  halfInput: {
    width: "25%",
    height: 24
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  divider: {
    width: "75%",
  },
});

export default DescriptionContent;

