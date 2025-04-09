import { ScrollView, StyleSheet, View } from "react-native";
import { Text, List, FAB, Chip } from "react-native-paper";
import { useTheme } from "react-native-paper";

const RenderItems = () => {
  const items = [];
  const theme = useTheme()

  for (let i = 0; i <= 30; i++) {
    items.push(
      <List.Item
        key={i}
        title={`${i * 100} m`}
        style={itemStyle.listItem}
        right={props => <>
          <List.Icon {...props} icon="arrow-up" />
          <List.Icon {...props} icon="arrow-down" />
          <List.Icon {...props} icon="close" color={theme.colors.error} />
        </>}
      />
    );
  }
  return items;
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
      <List.Section>{RenderItems()}</List.Section>
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

      <View style={{flexDirection: "row", gap: 8}}>
        <Text style={{alignSelf: "center"}}>Quick set:</Text>
        <Chip mode="flat">Subsonic</Chip>
        <Chip mode="flat">Low</Chip>
        <Chip mode="flat">Medium</Chip>
        <Chip mode="flat">Long</Chip>
        <Chip mode="flat">Ultra long</Chip>
      </View>

      <DistancesList />
      <FAB icon="plus" label="Add" mode="flat" variant="secondary" onPress={onAddPress}/>

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
