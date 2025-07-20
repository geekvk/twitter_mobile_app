import { Redirect, Stack, useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react';

export default function AuthRoutesLayout() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.replace('/(tabs)');
      }
      setRedirecting(false);
    }
  }, [isLoaded, isSignedIn]);
  console.log("loaded", isLoaded, "signed in", isSignedIn);

  if (redirecting) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}