import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/assets/constatns/theme";
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from "@/cache";
import InitialLayout from "@/components/InitialLayout";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error(
    'Missing OAuth Key'
  )
}

export default function RootLayout() {
  const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
      RochesterRegular: require('../assets/fonts/Rochester-Regular.ttf'),
      CookieRegular: require('../assets/fonts/Cookie-Regular.ttf'),
      HannahScript: require('../assets/fonts/Hannah-Script.ttf'),
  });

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background}}>
            {/* <Stack screenOptions={{ headerShown: false }}> */}
            <InitialLayout></InitialLayout>
              {/* <Stack.Screen
                name="index"
                options={{
                  title: "farahdin",
                  headerTintColor: COLORS.primary,
                  headerStyle: {
                    backgroundColor: COLORS.background,
                  },
                  headerTitleStyle: {
                    fontWeight: "900",
                    fontSize: 28,
                    fontFamily: "Cookie-Regular",                
                  },
                  headerShadowVisible: false,
                  headerShown: false, 
                }}
              />
              <Stack.Screen
                name="profile"
                options={{
                  title: "Profile",              
                  headerShown: false,
                }}
              /> */}
            {/* </Stack> */}
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
