import { StyleSheet, View } from "react-native";
import { Text, Divider } from "react-native-paper";
import { FieldEdit, FieldEditProps } from "../fieldsEdit/fieldEditInput";
import { HelpButton } from "./help/helpIcons";
import { FieldHelp } from "./help/helpContent";
import { DescriptionFields } from "./fiedProps";


const DescriptionContent = () => {

  return (
    <View style={styles.container}>
      <HelpButton helpContent={FieldHelp.DescriptionCard}>

        <Text variant="titleLarge" style={styles.header}>
          Description
        </Text>
      </HelpButton>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.profileName}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>Name</Text>
        </HelpButton>
        <FieldEdit
          {...DescriptionFields.profileName as FieldEditProps}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.ShortHints}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>Hints</Text>
        </HelpButton>
        <View style={[styles.row, styles.input]}>
          <FieldEdit
            {...DescriptionFields.shortNameTop as FieldEditProps}
            style={styles.input}
          />
          <FieldEdit
            {...DescriptionFields.shortNameBot as FieldEditProps}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"Projectile"}</Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.cartridgeName}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>Cartridge</Text>
        </HelpButton>
        <FieldEdit
          {...DescriptionFields.cartridgeName as FieldEditProps}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <HelpButton
          helpContent={FieldHelp.bulletName}
          style={[styles.label, { alignContent: "center" }]}
        >
          <Text>Bullet</Text>
        </HelpButton>
        <FieldEdit
          {...DescriptionFields.bulletName as FieldEditProps}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        {/* <Text variant="titleMedium" style={styles.sectionTitle}>{"User Note"}</Text> */}
        <HelpButton
          helpContent={FieldHelp.userNote}
          style={styles.sectionTitle}
        >
          <Text variant="titleMedium">User Note</Text>
        </HelpButton>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.row}>
        <FieldEdit
          {...DescriptionFields.userNote as FieldEditProps}
          style={styles.input}
          placeholder="Add your profile specific notes here"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
    maxWidth: 500,
  },
  header: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 32,
    marginBottom: 8,
  },
  label: {
    flex: 1,
  },
  input: {
    flex: 3,
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

