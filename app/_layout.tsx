import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/assets/constatns/theme";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider"

export default function RootLayout() {
  const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
      RochesterRegular: require('../assets/fonts/Rochester-Regular.ttf'),
      CookieRegular: require('../assets/fonts/Cookie-Regular.ttf'),
      HannahScript: require('../assets/fonts/Hannah-Script.ttf'),
  });

  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background}}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}
