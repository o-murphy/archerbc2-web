import React from "react";
import WebLayout from "@/layouts/web";
import {
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FileProvider } from "@/hooks/fileService/fileContext";
import { ThemeContext, useThemePreference } from "@/hooks/useThemeToggle";

import "@/i18n/i18n";
import MobileLayout from "@/layouts/mobile";
import { Platform } from "react-native";


export const detectDevice = () => {
  if (typeof navigator === 'undefined') {
      return 'unknown';
  }

  const ua = navigator.userAgent;

  if (/android/i.test(ua)) {
      return 'Android';
  }
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      return 'iOS';
  }
  if (/Windows NT/.test(ua)) {
      return 'Windows';
  }
  if (/Macintosh/.test(ua)) {
      return 'Mac';
  }
  if (/Linux/.test(ua)) {
      return 'Linux';
  }

  return 'unknown';
};

export const isMobileUA = () => {
  const dev = detectDevice();
  switch (dev) {
    case "Android":
    case "iOS":
      return true;
    default:
      return false;
  }
};

export default function RootLayout() {
  
  const { theme, toggleTheme, isReady } = useThemePreference();

  if (!isReady) return null; // or <SplashScreen />


  console.log("Platform", Platform.OS, detectDevice())
 

  return (
    <FileProvider>
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <PaperProvider theme={theme}>
            {
              isMobileUA() 
              ? <MobileLayout />
              : <WebLayout />
            }
          </PaperProvider>
        </ThemeContext.Provider>
      </SafeAreaProvider>
    </FileProvider>
  );
}


// // import { Stack } from "expo-router";
// import WebLayout from "@/layouts/web";
// import { MD3DarkTheme, PaperProvider } from "react-native-paper";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// export default function RootLayout() {

//   const theme = MD3DarkTheme;

//   // return <Stack />;
//   return (
//     <SafeAreaProvider>
//       <PaperProvider theme={theme}>
//         <WebLayout />
//       </PaperProvider>
//     </SafeAreaProvider>
//   )
// }