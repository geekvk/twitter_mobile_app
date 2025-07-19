import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import Constants from 'expo-constants';
import "../global.css"

const clerkKey = Constants.expoConfig?.extra?.clerkPublishableKey ?? "";

export default function RootLayout() {
  return <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)"  options={{ headerShown: false }} />
          </Stack>
    </ClerkProvider>
}
