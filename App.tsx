import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Text } from './components/Themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StreamChat } from  'stream-chat';
import { 
  OverlayProvider, 
  Chat, 
  ChannelList,
  Channel,
  MessageList,
  MessageInput
   } from "stream-chat-expo"; 

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = "2dw2222pz376";
const client = StreamChat.getInstance(API_KEY); 

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isReady, setIsReady] = useState(false);
  const [selectedChannel , setSelectedChannel] = useState<any>(null);


  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: 'skad12',
          name: 'olakunle stephen',
          image: 'https://picsum.photos/200/300.jpg', 
        },
        client.devToken('skad12')
      );  

       
      // channel
      const  channel = client.channel("messaging", "messenger12", {
        name: 'Tinkoko',
      });
      await channel.watch(); 

      setIsReady(true);
    }; 
  
    connectUser();

    return () => client.disconnectUser();
  }, []);  


  const onChannelPressed = (channel) => {
    setSelectedChannel(channel);
  };

  if (!isLoadingComplete || !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider>
          <Chat client={client}>
        {selectedChannel ? (
          <Channel channel={selectedChannel}>
            <MessageList />
            <MessageInput />

            <Text  
            style={{  }}  
            onPress={() => setSelectedChannel(null)}>
              Go Back
              </Text>
            </Channel>
          
        ) : (
          <ChannelList onSelect={onChannelPressed} />
        )}

        </Chat>
        </OverlayProvider>
        <StatusBar />  
      </SafeAreaProvider>
    );
  }
}
