import { StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper"
import { useFileContext } from "@/hooks/fileService/fileContext";
import { CloseDialogWidget } from "./closeDialog";
import { ToolTipIconButton } from "./iconButtonWithTooltip";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { md3PaperIconSource } from "@/components/icons/md3PaperIcons";
import { ShareDialogWidget } from "./shareDialog";
import { FileOpenerService } from "../hooks/fileService/fileOpener";


const TopBar = () => {

  const theme = useTheme()

  const { toggleTheme } = useThemeToggle();
  const { syncBackup, restoreBackup, saveFile } = useFileContext();

  const themeIcon = md3PaperIconSource({ name: theme.dark ? "dark-mode" : "light-mode" })

  const onOpenPress = () => {
    console.log("Open pressed");
    FileOpenerService.triggerFileInputClick();
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
      <ToolTipIconButton tooltip="Create new file" icon={md3PaperIconSource({ name: "file-open" })} onPress={() => { }} disabled />
      <ToolTipIconButton tooltip="Open file" icon={md3PaperIconSource({ name: "folder-open" })} onPress={onOpenPress} />
      <ToolTipIconButton tooltip="Download" icon="file-download" onPress={onSavePress} />
      <ToolTipIconButton tooltip="Reject changes" icon="file-refresh" onPress={onReloadPress} />
      <ToolTipIconButton tooltip="Load zeroing" icon="crosshairs" onPress={() => { }} disabled />
      <ShareDialogWidget />

      <View style={styles.rightSide}>
        <View style={styles.separator} />
        <ToolTipIconButton tooltip="Toggle theme" icon={themeIcon} onPress={toggleTheme} />
        <ToolTipIconButton tooltip="Language" icon={md3PaperIconSource({ name: "translate" })} onPress={() => { }} disabled />
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
