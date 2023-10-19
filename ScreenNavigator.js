import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();


const ScreenNavigator = () => {

    const user=true;

  return (
      <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
      {user?(
        <>
      <Stack.Screen name="Login" component={LoginScreen} />
        
      <Stack.Screen name="Home" component={HomeScreen} />    
        <Stack.Screen name="Chat" component={ChatScreen} />
      </>
      ):
      (
      <Stack.Screen name="Login" component={LoginScreen} />
        )
      }
    </Stack.Navigator>
  )
}

export default ScreenNavigator