import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { CONVERSATIONS, ConversationType } from '../data/conversations'

const MessageScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState(CONVERSATIONS); // Placeholder for messages data
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const[newMessage, setNewMessage] = useState('');

  const deleteConversation = (conversationId: number) => {
    Alert.alert("Delete Conversation", "Are you sure you want to delete this conversation?", [
      {text: "Cancel", style: "cancel"},
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setMessages(prevMessages => prevMessages.filter(msg => msg.id !== conversationId));
          if (selectedConversation?.id === conversationId) {
            setSelectedConversation(null);
          }
        }
      }
    ]);
  }
  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  }
  const closeChatModel = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage
  }

  const sendMessage = () => {
    if(newMessage.trim() && selectedConversation){
      // update the last message in message conversation
    setMessages((prevMessages) =>
      prevMessages.map((msg) => { // Curly braces are fine
        return msg.id === selectedConversation.id ? { ...msg, lastMessage: newMessage, time: "now" } : msg; // Explicit return
      })
    );
      setNewMessage('');
      Alert.alert("Message Sent", `Your message has been sent successfully to ${selectedConversation.user.name}.`);
    }
    
  }
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Messages</Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className='flex-row items-center justify-between'>
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            placeholder="Search for people and groups"
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#657786"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}>
        { messages.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            className="flex-row items-center px-4 py-3 border-b border-gray-50 active:bg-gray-100"
            onPress={() => openConversation(conversation)}
            onLongPress={() => deleteConversation(conversation.id)}
          >
            <View className='flex-row'>
              <Image source={{ uri: conversation.user.avatar }} className='w-12 h-12 rounded-full mr-3' />
              <View className='flex-1'>
                <View className='flex-row items-center justify-between mb-1'>
                  <Text className='text-base font-semibold text-gray-900'>{conversation.user.name}</Text>
                  {conversation.user.verified ? (
                    <View className='flex-row items-center'>
                      <Feather name="check-circle" size={16} color="#1DA1F2" />
                      <Text className='text-gray-500 text-sm ml-1'>{conversation.user.name}</Text>
                    </View>
                  ) : <View className='flex-row items-center'>
                      <Feather name="check-circle" size={16} color="gray" />
                      <Text className='text-gray-500 text-sm ml-1'>{conversation.user.name}</Text>
                    </View>}
                  
                  
                </View>
                <Text className='text-sm text-gray-600' numberOfLines={1} ellipsizeMode='tail'>
                {conversation.lastMessage.length > 50
                  ? `${conversation.lastMessage.substring(0, 50)}...`
                  : conversation.lastMessage}
              </Text>
                <Text className='text-xs text-gray-400'>{conversation.time}</Text>
              </View>
            </View>
            
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className='px-4 py-3 border-t border-gray-100 bg-gray-50'>
        <Text className='text-xs text-gray-500 text-center'>
          Tap to open Long press delete.
        </Text>

      </View>
      <Modal
        visible={isChatOpen}
        animationType='slide'
        presentationStyle='pageSheet'
      >
        {
          selectedConversation && (
            <>
              <View className='flex-row items-center px-4 py-3 border-b border-gray-100'>
                <TouchableOpacity onPress={closeChatModel} className='mr-3'>
                  <Feather name="chevron-left" size={24} color="#1DA1F2" />
                </TouchableOpacity>
                <Image source={{ uri: selectedConversation.user.avatar }} className='size-10 rounded-full mr-3' />
                <View className='flex-1'>
                  <View className='flex-row items-center justify-between'>
                    <Text className='font-semibold text-gray-900 text-lg'>
                      {selectedConversation.user.name}
                    </Text>
                    {selectedConversation.user.verified && (
                      <Feather name="check-circle" size={16} color="#1DA1F2" className='ml-1' />
                    )}
                  </View>
                  <Text className="text-gray-500 text-sm">@{selectedConversation.user.username}</Text>

                </View>
              </View>
              <ScrollView className='flex-1 px-4 py-4' showsVerticalScrollIndicator={false}>
                      <View className="mb-4">
                      {selectedConversation.messages.map((message) => (
                        <View key={message.id} className={`flex-row mb-3 ${message.fromUser ? "justify-end" : ""}`}>
                          {!message.fromUser && (
                            <Image
                              source={{ uri: selectedConversation.user.avatar }}
                              className='w-8 h-8 rounded-full mr-2'
                            />
                          )}
                          <View className={`flex-1 ${message.fromUser ? "items-end" : ""}`}>
                             <View className={`rounded-2xl px-4 py-3 max-w-xs ${
                                message.fromUser ? "bg-blue-500" : "bg-gray-100"
                              }`}
                            >
                              <Text className={message.fromUser ? "text-white" : "text-gray-900"}>
                                {message.text}
                              </Text>
                            </View>
                             <Text className="text-xs text-gray-400 mt-1">{message.time}</Text>
                          </View>
                        </View>
                      ))}
                      </View>
                    </ScrollView>
                    <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
                      <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 mr-3">
                         <TextInput
                            className="flex-1 text-base"
                            placeholder="Start a message..."
                            placeholderTextColor="#657786"
                            value={newMessage}
                            onChangeText={setNewMessage}
                            multiline
                        />
                        <TouchableOpacity
                          onPress={sendMessage}
                          className={`size-10 rounded-full items-center justify-center ${
                            newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
                          }`}
                          disabled={!newMessage.trim()}
                        >
                          <Feather name="send" size={20} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
            </>
          )
        }

      </Modal>
    </SafeAreaView>
  )
}

export default MessageScreen