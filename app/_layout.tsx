// import { Stack } from "expo-router";
import WebLayout from "@/layouts/web";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  const theme = MD3DarkTheme;

  // return <Stack />;
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <WebLayout />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
