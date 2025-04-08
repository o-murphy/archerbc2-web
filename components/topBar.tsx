import { useThemeToggle } from "@/app/_layout";
import { AllowedExtensions, useFileHandler } from "@/hooks/useFileHandler";
import useParseFile from "@/hooks/useFileParsing";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { IconButton, Surface, Text, Tooltip } from "react-native-paper"
import { FileInput } from "./fileInput";
import { useFileContext } from "@/hooks/fileContext";



const TopBar = () => {

  const { theme, toggleTheme } = useThemeToggle();

  const { fileHandleState, handleFileChange } = useFileHandler()
  const {syncBackup, restoreBackup} = useFileContext()
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useParseFile(fileHandleState);

  const themeIcon = theme.dark ? "weather-sunny" : "weather-night"

  const onOpenPress = () => {
    console.log("Open pressed");
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const onSavePress = () => {
    syncBackup()
    console.log("SyncBackup");
  }

  const onSaveAsPress = () => {
    syncBackup()
    console.log("SyncBackupAs");
  }

  const onReloadPress = () => {
    restoreBackup()
    console.log("RestoreBackup")
  }

  return (
    <Surface elevation={1} style={styles.topBar}>
      <Tooltip title="Create new file" leaveTouchDelay={0.2}>
        <IconButton icon="file-plus" onPress={() => { }} />
      </Tooltip>

      <Tooltip title="Open file" leaveTouchDelay={0.2}>
        <IconButton icon="folder-open" onPress={onOpenPress} />
      </Tooltip>

      <Tooltip title="Save" leaveTouchDelay={0.2}>
        <IconButton icon="content-save" onPress={onSavePress} />
      </Tooltip>

      <Tooltip title="Save as" leaveTouchDelay={0.2}>
        <IconButton icon="content-save-all" onPress={onSaveAsPress} />
      </Tooltip>

      <Tooltip title="Reload file" leaveTouchDelay={0.2}>
        <IconButton icon="file-refresh" onPress={onReloadPress} />
      </Tooltip>

      <Tooltip title="Load zeroing" leaveTouchDelay={0.2}>
        <IconButton icon="crosshairs" onPress={() => { }} />
      </Tooltip>

      <Tooltip title="Import data" leaveTouchDelay={0.2}>
        <IconButton icon="application-import" onPress={() => { }} />
      </Tooltip>

      <Tooltip title="Export data" leaveTouchDelay={0.2}>
        <IconButton icon="application-export" onPress={() => { }} />
      </Tooltip>

      <Tooltip title="Toggle theme" leaveTouchDelay={0.2}>
        <IconButton icon={themeIcon} onPress={toggleTheme} />
      </Tooltip>

      <Tooltip title="Language" leaveTouchDelay={0.2}>
        <IconButton icon="translate" onPress={() => { }} />
      </Tooltip>

      <Text variant="titleLarge" style={styles.topBarTitle}>ArcherBC2</Text>

      <FileInput fileInputRef={fileInputRef} handleFileChange={handleFileChange} allowedExtensions={AllowedExtensions} />

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