import React from "react";
import WebLayout from "@/layouts/web";
import {
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FileProvider } from "@/hooks/fileService/fileContext";
import { ThemeContext, useThemePreference } from "@/hooks/useThemeToggle";




export default function RootLayout() {
  const { theme, toggleTheme, isReady } = useThemePreference();

  if (!isReady) return null; // or <SplashScreen />

  return (
    <FileProvider>
      <SafeAreaProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <PaperProvider theme={theme}>
            <WebLayout />
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