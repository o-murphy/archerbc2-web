import { StyleSheet, View } from "react-native";
import { Text, Divider, TextInput, useTheme, IconButton } from "react-native-paper";
import { FieldEdit, FieldEditProps, FieldProps } from "../fieldsEdit/fieldEditInput";
import DescriptionHelpContent from "./descriptionHelp";
import { help, HelpDialogButton } from "../helpDialog/helpService";
import { ProfileProps } from "@/hooks/useFileParsing";
import { ReactNode } from "react";


const DescriptionFields: FieldProps = {
  profileName: {
    field: 'profileName',
    maxLength: 50
  },
  shortNameTop: {
    field: 'shortNameTop',
    maxLength: 8,
    label: "Top"
  },
  shortNameBot: {
    field: 'shortNameBot',
    maxLength: 8,
    label: "Bot"
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


const FieldHelp: Partial<Record<keyof ProfileProps, ReactNode>> = {
  profileName: <Text variant="bodyMedium">The name of the ballistic profile as it appears in the device’s "Rifles" menu.</Text>,
  shortNameTop: <Text variant="bodyMedium">Short caliber label for the icon in the device interface.</Text>,
  shortNameBot: <Text variant="bodyMedium">Short weight label for the icon in the device interface.</Text>,
  cartridgeName: <Text variant="bodyMedium">The name of the projectile as it appears in the device’s "Rifles" menu.</Text>,
  bulletName: <Text variant="bodyMedium">The name of the bullet.</Text>,
  userNote: <Text variant="bodyMedium">Additional comment.</Text>,
}


const getHelpInputIcon = (helpText: ReactNode) => {
  const theme = useTheme()
  return (
    <TextInput.Icon
      size={16}
      style={{ width: 24, height: 24, padding: 0, margin: 0 }}
      icon="help-circle-outline"
      color={theme.colors.tertiaryContainer}
      onPress={() => help.show(helpText)}
    />
  )
}

const getHelpIcon = (helpText: ReactNode) => {
  const theme = useTheme()
  return (
    <IconButton
      size={16}
      style={{ width: 24, height: 24, padding: 0, marginHorizontal: 8 }}
      icon="help-circle-outline"
      iconColor={theme.colors.tertiaryContainer}
      onPress={() => help.show(helpText)}
    />
  )
}

const DescriptionContent = () => {

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Description
        {getHelpIcon(<DescriptionHelpContent />)}
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { alignContent: "center" }]}>{"Name"}
        </Text>
        <FieldEdit
          {...DescriptionFields.profileName as FieldEditProps}
          style={styles.input}
          left={getHelpInputIcon(FieldHelp.profileName)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Hints"}</Text>
        <View style={[styles.row, styles.input]}>
          <FieldEdit
            {...DescriptionFields.shortNameTop as FieldEditProps}
            style={styles.input}
            left={getHelpInputIcon(FieldHelp.shortNameTop)}
          />
          <FieldEdit
            {...DescriptionFields.shortNameBot as FieldEditProps}
            style={styles.input}
            left={getHelpInputIcon(FieldHelp.shortNameBot)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"Round"}</Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Cartridge"}</Text>
        <FieldEdit
          {...DescriptionFields.cartridgeName as FieldEditProps}
          style={styles.input}
          left={getHelpInputIcon(FieldHelp.cartridgeName)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{"Bullet"}</Text>
        <FieldEdit
          {...DescriptionFields.bulletName as FieldEditProps}
          style={styles.input}
          left={getHelpInputIcon(FieldHelp.bulletName)}
        />
      </View>

      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.sectionTitle}>{"User Note"}</Text>
        {getHelpIcon(FieldHelp.userNote)}
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

