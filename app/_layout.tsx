import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
      RochesterRegular: require('../assets/fonts/Rochester-Regular.ttf'),
      CookieRegular: require('../assets/fonts/Cookie-Regular.ttf'),
    });
  return (
    <SafeAreaProvider style={{ backgroundColor: "#131415" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack >
          <Stack.Screen
            name="index"
            options={{
              title: "farahdin",
              headerTintColor: '#f6ac00',
              headerStyle: {
                backgroundColor: "#131415",
              },
              headerTitleStyle: {
                fontWeight: "900",
                fontSize: 32,
                fontFamily: "Rochester-Regular",
              },
            }}
          />
          <Stack.Screen
            name="notification"
            options={{
              title: "Notification",
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
