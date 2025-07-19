import { useClerk } from "@clerk/clerk-expo";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useClerk();
  return (
     <View className="flex-1 items-center justify-center bg-white">
      <Button onPress={() => signOut()} title="SignOut"/>
    </View>
  );
}
