import EditDialog from "@/components/editDialog";
import { FileOpenError } from "@/components/fileOpenError";
import StartDialog from "@/components/startDialog";
import { SnackMessage } from "@/hooks/snackBarService";
import { useParseUrl } from "@/hooks/useFileParsing";
import { useEffect, useState } from "react";
import { Linking, Platform, StyleSheet } from "react-native";
import { Surface, useTheme } from "react-native-paper";



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

const UrlProfileLoader = () => {
  // const [urlParams, setUrlParams] = useState<string | null>(null);
  const [urlPayload, setUrlPayload] = useState<string | null>(null);


  useEffect(() => {
    const getInitialURLParams = async () => {
      // Get the initial URL that the app was opened with
      const url = await Linking.getInitialURL();

      if (url) {
        // If a URL exists, parse it and extract parameters
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const myParam = urlParams.get('payload');  // Replace 'payload' with the name of your query param
        // setUrlParams(myParam);
        setUrlPayload(myParam);
      }
    };

    // Check if the app was opened from a URL
    getInitialURLParams();

    // Handle URL changes while the app is in the background or opened via a deep link
    const handleUrlChange = (event: any) => {
      const { url } = event;
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const myParam = urlParams.get('payload');
      // setUrlParams(myParam);
      setUrlPayload(myParam);
    };

    // Add event listener for URL changes
    const urlListener = Linking.addEventListener('url', handleUrlChange);

    // Clean up the event listener when the component unmounts or the effect is cleaned up
    return () => {
      urlListener.remove(); // Remove the event listener when cleaning up
    };
  }, []);

  useParseUrl(urlPayload)

  return <></>
}

const WebLayout = () => {
  useApplyScrollbarTheme()

  return (
    <>
      <Surface style={styles.view}>
        <FileOpenError />
        <UrlProfileLoader />
        <EditDialog />
        <StartDialog />
      </Surface>
      <SnackMessage />
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