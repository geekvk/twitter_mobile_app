import { View, Text, TouchableOpacity } from 'react-native'
import React, { use } from 'react';
import { Feather } from "@expo/vector-icons";
import { useSignOut } from '@/hooks/useSignOut';

const SignoutButton = () => {
    const { handleSignOut } = useSignOut();
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Feather name="log-out" size={24} color="#e0245e" />
    </TouchableOpacity>
  )
}

export default SignoutButton