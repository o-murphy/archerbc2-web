import { StyleSheet, View } from "react-native";
import { TextInput, Text, Divider } from "react-native-paper";

const DescriptionContent = () => {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Description
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>{"Name"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Hints"}</Text>
        <View style={[styles.row, styles.input]}>
          <TextInput label={"Top"} mode="outlined" dense style={styles.input} />
          <TextInput label={"Bottom"} mode="outlined" dense style={styles.input} />
        </View>
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"Round"}</Text>
        <Divider style={styles.divider} />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Cartridge"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Bullet"}</Text>
        <TextInput mode="outlined" dense style={styles.input} />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"User Note"}</Text>
        <Divider style={styles.divider} />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <TextInput
          mode="outlined"
          multiline
          numberOfLines={4}
          style={[styles.input, {flex: 4}]}
        />
        <View style={styles.label} />
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
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    flex: 1,
    marginBottom: 4,
  },
  divider: {
    flex: 3,
  },
});

export default DescriptionContent;

