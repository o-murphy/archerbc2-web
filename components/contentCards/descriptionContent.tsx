import { StyleSheet, View } from "react-native";
import { Text, Divider } from "react-native-paper";
import { FileEditInput } from "../fileEditInput";

const DescriptionContent = () => {

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Description
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>{"Name"}</Text>
        <FileEditInput
          maxLength={50}
          field={'profileName'}
          {...{
            style: styles.input
          }}
        />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Hints"}</Text>
        <View style={[styles.row, styles.input]}>
          <FileEditInput
            maxLength={8}
            field={'shortNameTop'}
            {...{
              labe: "Top",
              style: styles.input
            }}
          />
          <FileEditInput
            maxLength={8}
            field={'shortNameBot'}
            {...{
              labe: "Bottom",
              style: styles.input
            }}
          />
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
        <FileEditInput
          maxLength={50}
          field={'cartridgeName'}
          {...{
            style: styles.input
          }}
        />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Bullet"}</Text>
        <FileEditInput
          maxLength={50}
          field={'bulletName'}
          {...{
            style: styles.input
          }}
        />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"User Note"}</Text>
        <Divider style={styles.divider} />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <FileEditInput
          maxLength={1024}
          field={'userNote'}
          {...{
            style: styles.input,
            multiline: true
          }}
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
  sectionTitle: {
    flex: 1,
    marginBottom: 4,
  },
  divider: {
    flex: 3,
  },
});

export default DescriptionContent;

