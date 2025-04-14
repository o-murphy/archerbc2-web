import { useThemeToggle } from "@/app/_layout";
import { AllowedExtensions, useFileHandler } from "@/hooks/useFileHandler";
import { useParseFile } from "@/hooks/useFileParsing";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Surface, Text, Tooltip } from "react-native-paper"
import { FileInput } from "./fileInput";
import { useFileContext } from "@/hooks/fileContext";
import { CloseDialogWidget } from "./closeDialog";


const TopBar = () => {

  const { theme, toggleTheme } = useThemeToggle();

  const { fileHandleState, handleFileChange } = useFileHandler();
  const { syncBackup, restoreBackup, saveFile } = useFileContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useParseFile(fileHandleState);

  const themeIcon = theme.dark ? "weather-sunny" : "weather-night";

  const onOpenPress = () => {
    console.log("Open pressed");
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  const onSavePress = () => {
    syncBackup();
    saveFile();
    console.log("SyncBackup");
  };

  const onReloadPress = () => {
    restoreBackup();
    console.log("RestoreBackup");
  };

  return (
    <Surface elevation={1} style={styles.topBar}>
      <Tooltip title="Create new file" leaveTouchDelay={0.2}>
        <IconButton icon="file-plus" onPress={() => { }} />
      </Tooltip>

      <Tooltip title="Open file" leaveTouchDelay={0.2}>
        <IconButton icon="folder-open" onPress={onOpenPress} />
      </Tooltip>

      <Tooltip title="Download" leaveTouchDelay={0.2}>
        <IconButton icon="file-download" onPress={onSavePress} />
      </Tooltip>

      <Tooltip title="Reject changes" leaveTouchDelay={0.2}>
        <IconButton icon="file-refresh" onPress={onReloadPress} />
      </Tooltip>

      <Tooltip title="Load zeroing" leaveTouchDelay={0.2}>
        <IconButton icon="crosshairs" onPress={() => { }} />
      </Tooltip>

      <FileInput fileInputRef={fileInputRef} handleFileChange={handleFileChange} allowedExtensions={AllowedExtensions} />

      {/* This will be aligned to the right side of the topBar */}
      <View style={styles.rightSide}>

        <View style={styles.separator} />

        <Tooltip title="Toggle theme" leaveTouchDelay={0.2}>
          <IconButton icon={themeIcon} onPress={toggleTheme} />
        </Tooltip>

        <Tooltip title="Language" leaveTouchDelay={0.2}>
          <IconButton icon="translate" onPress={() => { }} />
        </Tooltip>
        <View style={styles.separator} />

        <Text variant="titleLarge" style={styles.topBarTitle}>ArcherBC2</Text>

        <CloseDialogWidget />
      </View>
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
    // justifyContent: "space-between", // This makes the elements spread out
    flexWrap: "wrap-reverse"
  },
  topBarTitle: {
    textAlign: "right",
    alignSelf: "center",
    marginHorizontal: 16
  },
  separator: {
    backgroundColor: "#666",
    width: 1,
    height: 24,
    marginHorizontal: 4, // This gives space between the separator and the other elements
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1, // Ensures it takes available space and pushes content to the right
    flexWrap: "wrap"
  },
});

export default TopBar;
