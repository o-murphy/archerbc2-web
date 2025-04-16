import MainBackground from "@/components/backgroundImage";
import EditDialog from "@/components/editDialog";
import { FileOpenError } from "@/components/fileOpenError";
import StartDialog from "@/components/startDialog";
import { Toast } from "@/components/toast/toastService";
import { UrlProfileLoader } from "@/hooks/useFileHandler";
import { useEffect } from "react";
import { ImageBackground, Platform, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const useApplyScrollbarTheme = () => {
  const { colors } = useTheme();

  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return;

    // Set the theme variables
    const root = document.documentElement;
    // root.style.setProperty('--scrollbarBG', colors.surfaceVariant);  // Track background color
    // root.style.setProperty('--scrollbarBG', '#00000033');  // Track background color
    root.style.setProperty('--scrollbarBG', colors.background);  // Track background color
    // root.style.setProperty('--thumbBG', colors.onSecondary);  // Thumb color
    root.style.setProperty('--thumbBG', colors.secondaryContainer);  // Thumb color
    root.style.setProperty('--trackBG', colors.secondaryContainer);  // Optional: Track background color, e.g., surface color

    // Inject the scrollbar style once
    const styleId = 'custom-scrollbar-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
          body {
            scrollbar-width: thin;
            scrollbar-color: var(--thumbBG) var(--scrollbarBG);
          }
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: var(--trackBG); /* Apply track background color */
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: var(--thumbBG);
            border-radius: 4px;
          }
        `;
      document.head.appendChild(style);
    }
  }, [colors]);
};


const WebLayout = () => {
  useApplyScrollbarTheme()

  return (
    <>
      <ImageBackground
        source={MainBackground}
        style={styles.view}
      >
        {/* <Surface style={styles.view}> */}
        <FileOpenError />
        <UrlProfileLoader />
        <EditDialog />
        <StartDialog />
        {/* </Surface> */}
        <Toast />
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
  }
})

export default WebLayout;