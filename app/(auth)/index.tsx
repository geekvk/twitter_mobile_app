import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useSocialAuth } from '@/hooks/useSocialAuth';

const Index = () => {
  const { handleSocialAuth, isLoading } = useSocialAuth();
  return (
    <View className="flex-1 | bg-white">
      <View className ="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          {/* demo image */}
          <View className="items-center">
            <Image
              source={require('../../assets/images/auth2.png')}
              className='size-96'
              resizeMode='contain'
              />
          </View>
          <View className="flex-col gap-2"> 
            <TouchableOpacity 
                className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
                onPress={() => handleSocialAuth("oauth_google")}
                disabled={isLoading}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 2
                }}
            >
              <View className="flex-row items-center justify-center">
                {isLoading ? (
                  <ActivityIndicator size="small" color="#4285f4" />
                ) : (
                  <View className="flex-row items-center justify-center">
                    <Image
                    source={require('../../assets/images/google.png')}
                    className='size-10 mr-5'
                    resizeMode='contain'
                  />
                  <Text className="text-black font-medium text-base">Login with google</Text>
                  </View>
                )}
                
                </View>
              
            </TouchableOpacity>
            <TouchableOpacity 
                className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
                onPress={() => handleSocialAuth("oauth_apple")}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 2
                }}>
                  <View className="flex-row items-center justify-center">
                {isLoading ? (
                  <ActivityIndicator size="small" color="#4285f4" />
                ) : (
                  <View className="flex-row items-center justify-center">
                    <Image
                    source={require('../../assets/images/apple.png')}
                    className='size-10 mr-5'
                    resizeMode='contain'
                  />
                  <Text className="text-black font-medium text-base">Login with Apple</Text>
                  </View>
                )}
                
                </View>
            </TouchableOpacity>
            
          </View>
          <Text className="text-center text-gray-500 text-xs mt-6 px-2">
            By siging up you agree to our <Text className="text-blue-500">Terms of Service</Text> and <Text className="text-blue-500">Privacy Policy</Text> 
            {", and"} <Text className="text-blue-500">Cookie Use</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Index