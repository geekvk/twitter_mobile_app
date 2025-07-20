import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";

//TODO add this screen and make it functional
const TRENDIG_TOPICS = [
  { topic : "#ReactNative", tweets: "123K" },
  { topic : "#JavaScript", tweets: "456K" },
  { topic : "#WebDevelopment", tweets: "789K" },
  { topic : "#MobileApps", tweets: "101K" },
  { topic : "#Programming", tweets: "202K" },
  { topic : "#TechNews", tweets: "303K" },
  { topic : "#CodingLife", tweets: "404K" },
  { topic : "#DevCommunity", tweets: "505K" },
  { topic : "#SoftwareEngineering", tweets: "606K" },
  { topic : "#ReactNative", tweets: "123K" },
  { topic : "#JavaScript", tweets: "456K" },
  { topic : "#WebDevelopment", tweets: "789K" },
  { topic : "#MobileApps", tweets: "101K" },
  { topic : "#Programming", tweets: "202K" },
  { topic : "#TechNews", tweets: "303K" },
  { topic : "#CodingLife", tweets: "404K" },
  { topic : "#DevCommunity", tweets: "505K" },
  { topic : "#SoftwareEngineering", tweets: "606K" }

]
const SearchScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* header */}
      <View className='px-4 py-3 border-b border-gray-100'>
        <View className='flex-row items-center bg-gray-100 rounded-full px-4 py-3'>
          <Feather name="search" size={24} color="#657786" />
          <TextInput
            placeholder='Search Twitter'
            className='flex-1 ml-3 text-base'
            placeholderTextColor={"#657786"}
          />
        </View>
      </View>
      {/* contents */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className='p-4'>
          <Text className='text-xl font-bold text-gray-900 mb-4'>Trending Topics</Text>
          {TRENDIG_TOPICS.map((item, index) => (
            <View key={index} className='py-3 border-b border-gray-100'>
              <Text className='font-bold text-gray-900 text-lg'>{item.topic}</Text>
              <Text className='text-sm text-gray-500'>{item.tweets} Tweets</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen