import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();


const ScreenNavigator = () => {

    const user=false;

  return (
      <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
      {user?(
        <>
        
      <Stack.Screen name="Home" component={LoginScreen} />    
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