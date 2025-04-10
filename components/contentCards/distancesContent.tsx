import { useFileContext } from "@/hooks/fileContext";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, List, FAB, Chip } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { ThemedIcon } from "../tabIcons";

const renderItems = () => {
  const theme = useTheme();
  const { parsedData } = useFileContext();

  // Function to render the zero icon for the selected distance
  const renderZeroIcon = (index: number) => {
    if (index === parsedData.profile?.cZeroDistanceIdx) {
      return (
        <List.Icon
          icon={(props) => (
            <ThemedIcon {...props} source="zeroing-distance" />
          )}
        />
      );
    }
    return null;  // Return null when it's not the zeroing distance
  };

  // Check if parsedData is valid and ensure profile and distances exist
  if (!parsedData.profile?.distances) return null;  // If no distances, return nothing

  return parsedData.profile.distances.map((item, index) => (
    <List.Item
      key={index}  // Use the index as the key, assuming distances are unique
      title={`${item / 100} m`}  // Convert distance to meters (divide by 100)
      style={itemStyle.listItem}  // Apply custom styles
      left={() => renderZeroIcon(index)}  // Render zeroing icon if applicable
      right={(props) => (
        <>
          <List.Icon {...props} icon="arrow-up" />
          <List.Icon {...props} icon="arrow-down" />
          <List.Icon {...props} icon="close" color={theme.colors.error} />
        </>
      )}
    />
  ));
};

const itemStyle = StyleSheet.create({
  listItem: {
    borderBottomColor: "#666",
    borderBottomWidth: 1,
  },
});

const DistancesList = () => {
  return (
    <View style={styles.scrollWrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <List.Section>{renderItems()}</List.Section>
      </ScrollView>
    </View>
  )
}

const DistancesContent = () => {

  const onAddPress = () => {
    console.log("Add distance")
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Distances
      </Text>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Text style={{ alignSelf: "center" }} variant="titleMedium">Quick range set:</Text>
        <Chip mode="flat">Subsonic</Chip>
        <Chip mode="flat">Low</Chip>
        <Chip mode="flat">Medium</Chip>
        <Chip mode="flat">Long</Chip>
        <Chip mode="flat">Ultra long</Chip>
      </View>

      <DistancesList />
      <FAB icon="plus" label="Add" mode="flat" variant="secondary" onPress={onAddPress} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8
  },
  header: {
    marginBottom: 8,
  },
  input: {
    width: "60%",
    height: 24
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 8,
  },
  scrollWrapper: {
    flex: 1,
    minHeight: 0, // ensures proper shrinking in flex layout
  },
  scrollContent: {
    paddingBottom: 16,
  },
});

export default DistancesContent;
