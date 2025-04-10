import { StyleSheet, View } from "react-native";
import { Text, Divider } from "react-native-paper";
import { FieldEdit, FieldEditProps, FieldProps } from "../fileEditInput";


const DescriptionFields: FieldProps = {
  profileName: {
    field: 'profileName',
    maxLength: 50
  },
  shortNameTop: {
    field: 'shortNameTop',
    maxLength: 8
  },
  shortNameBot: {
    field: 'shortNameBot',
    maxLength: 8
  },
  cartridgeName: {
    field: 'cartridgeName',
    maxLength: 50
  },
  bulletName: {
    field: 'bulletName',
    maxLength: 50
  },
  userNote: {
    field: 'userNote',
    maxLength: 1024,
    multiline: true
  },
};

const DescriptionContent = () => {

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Description
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>{"Name"}</Text>
        <FieldEdit
          {...DescriptionFields.profileName as FieldEditProps}
          style={styles.input}        />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Hints"}</Text>
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
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"Round"}</Text>
        <Divider style={styles.divider} />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Cartridge"}</Text>
        <FieldEdit
          {...DescriptionFields.cartridgeName as FieldEditProps}
          style={styles.input}
        />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Bullet"}</Text>
        <FieldEdit
          {...DescriptionFields.bulletName as FieldEditProps}
          style={styles.input}
        />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"User Note"}</Text>
        <Divider style={styles.divider} />
        <View style={styles.label} />
      </View>

      <View style={styles.row}>
        <FieldEdit
          {...DescriptionFields.userNote as FieldEditProps}
          style={styles.input}
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

