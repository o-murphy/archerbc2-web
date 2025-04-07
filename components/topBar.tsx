import { StyleSheet } from "react-native";
import { IconButton, Surface, Text, Tooltip } from "react-native-paper"



const TopBar = () => {
    return (
      <Surface style={styles.topBar}>
        <Tooltip title="Create new file" leaveTouchDelay={0.2}>
          <IconButton icon="file-plus" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Open file" leaveTouchDelay={0.2}>
          <IconButton icon="folder-open" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Save" leaveTouchDelay={0.2}>
          <IconButton icon="content-save" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Save as" leaveTouchDelay={0.2}>
          <IconButton icon="content-save-all" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Reload file" leaveTouchDelay={0.2}>
          <IconButton icon="file-refresh" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Load zeroing" leaveTouchDelay={0.2}>
          <IconButton icon="crosshairs" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Import data" leaveTouchDelay={0.2}>
          <IconButton icon="application-import" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Export data" leaveTouchDelay={0.2}>
          <IconButton icon="application-export" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Toggle theme" leaveTouchDelay={0.2}>
          <IconButton icon="theme-light-dark" onPress={() => {}} />
        </Tooltip>
  
        <Tooltip title="Language" leaveTouchDelay={0.2}>
          <IconButton icon="translate" onPress={() => {}} />
        </Tooltip>
  
        <Text variant="titleLarge" style={styles.topBarTitle}>ArcherBC2</Text>
      </Surface>
    );
  };

const styles = StyleSheet.create({
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        width: "100%",
        paddingRight: 16,
    },
    topBarTitle: {
        flex: 1,
        textAlign: "right",
        alignSelf: "center",
    },
})


export default TopBar;