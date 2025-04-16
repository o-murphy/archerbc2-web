import { AllowedExtensions, useFileHandler } from "@/hooks/useFileHandler";
import { useParseFile } from "@/hooks/useFileParsing";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper"
import { FileInput } from "./fileInput";
import { useFileContext } from "@/hooks/fileContext";
import { CloseDialogWidget } from "./closeDialog";
import { IconButtonWithToolTip } from "./iconButtonWithTooltip";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { md3PaperIconSource } from "@/theme/md3PaperIcons";



const TopBar = () => {

  const { toggleTheme: toggleThemeMode } = useThemeToggle();
  const theme = useTheme()

  const { fileHandleState, handleFileChange } = useFileHandler();
  const { syncBackup, restoreBackup, saveFile } = useFileContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useParseFile(fileHandleState);

  const themeIcon = md3PaperIconSource({ name: theme.dark ? "dark-mode" : "light-mode" })

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
      <IconButtonWithToolTip tooltip="Create new file" icon={md3PaperIconSource({ name: "file-open" })} onPress={() => { }} disabled />
      <IconButtonWithToolTip tooltip="Open file" icon={md3PaperIconSource({ name: "folder-open" })} onPress={onOpenPress} />
      <IconButtonWithToolTip tooltip="Download" icon="file-download" onPress={onSavePress} />
      <IconButtonWithToolTip tooltip="Reject changes" icon="file-refresh" onPress={onReloadPress} />
      <IconButtonWithToolTip tooltip="Load zeroing" icon="crosshairs" onPress={() => { }} disabled />

      <FileInput fileInputRef={fileInputRef} handleFileChange={handleFileChange} allowedExtensions={AllowedExtensions} />

      {/* This will be aligned to the right side of the topBar */}
      <View style={styles.rightSide}>

        <View style={styles.separator} />

        <IconButtonWithToolTip tooltip="Toggle theme" icon={themeIcon} onPress={toggleThemeMode} />
        <IconButtonWithToolTip tooltip="Language" icon={md3PaperIconSource({ name: "translate" })} onPress={() => { }} disabled />

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
  },
  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
    gap: 4,
    flexWrap: "wrap"
  }
});

export default TopBar;
