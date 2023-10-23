import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen.tsx';
import LoginScreen from './src/screens/LoginScreen';
import SimpleHome from './src/screens/SimpleHome';
import useBearStore from './store/zustandStore';
import Profile from './src/screens/Profile';
import Editprofile from './src/screens/Editprofile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();

const ScreenNavigator = () => {
  // isAuthenticated Flag - true means user logged in
  const isLoggedIn = useBearStore(state => state.isLoggedIn);

  const Tab = createBottomTabNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="HomeTest" component={SimpleHome} />

            <Stack.Screen name="EditProfile" component={Editprofile} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default ScreenNavigator;
