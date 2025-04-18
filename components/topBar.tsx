import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper"
import { useFileContext } from "@/hooks/fileService/fileContext";
import { CloseDialogWidget } from "./closeDialog";
import { ToolTipIconButton } from "./iconButtonWithTooltip";
import { md3PaperIconSource } from "@/components/icons/md3PaperIcons";
import { ShareDialogWidget } from "./shareDialog";
import { FileOpenerService } from "../hooks/fileService/fileOpener";
import { ThemeToggle } from "./themeToggle";
import { LanguageToggle } from "./languageToggle";
import { useTranslation } from "react-i18next";


const TopBar = () => {
  const { t } = useTranslation();
  const { syncBackup, restoreBackup, saveFile } = useFileContext();

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
      <ToolTipIconButton tooltip={t("topBar.Create new file")} icon={md3PaperIconSource({ name: "file-open" })} onPress={() => { }} disabled />
      <ToolTipIconButton tooltip={t("topBar.OpenFile")} icon={md3PaperIconSource({ name: "folder-open" })} onPress={onOpenPress} />
      <ToolTipIconButton tooltip={t("topBar.Download")} icon="file-download" onPress={onSavePress} />
      <ToolTipIconButton tooltip={t("topBar.RejectChanges")} icon="file-refresh" onPress={onReloadPress} />
      <ToolTipIconButton tooltip={t("topBar.LoadZeroing")} icon="crosshairs" onPress={() => { }} disabled />
      <ShareDialogWidget />

      <View style={styles.rightSide}>
        <View style={styles.separator} />
        <ThemeToggle />
        <LanguageToggle />
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
