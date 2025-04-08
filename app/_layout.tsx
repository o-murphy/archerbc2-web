import React, { useState, createContext, useContext } from "react";
import WebLayout from "@/layouts/web";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  ThemeBase,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FileProvider } from "@/hooks/fileContext";

// Define the theme context type
type ThemeContextType = {
  theme: ThemeBase;
  toggleTheme: () => void;
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Export hook to use in child components
export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeToggle must be used within ThemeProvider");
  return context;
};

export default function RootLayout() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  const toggleTheme = () => setIsDark(prev => !prev);

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