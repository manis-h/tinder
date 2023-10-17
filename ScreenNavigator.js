import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SimpleHome from './screens/SimpleHome';
import useBearStore from './store/zustandStore';

const Stack = createNativeStackNavigator();


const ScreenNavigator = () => {

    // const isLoggedIn = false
    const isLoggedIn = useBearStore((state) => state.isLoggedIn)



  return (
      <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}>
      {isLoggedIn?(
        <Stack.Group>
        
      <Stack.Screen name="Home" component={SimpleHome} />    
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Group>
      ):
      (
      <Stack.Screen name="Login" component={LoginScreen} />
        )
      }
    </Stack.Navigator>
  )
}

export default ScreenNavigator