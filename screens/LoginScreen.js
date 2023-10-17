import React, { useState, useEffect } from 'react';
import {
  Button, TextInput, Alert,
  // Text,
  View
} from 'react-native';
import { Text } from 'galio-framework';
import auth from '@react-native-firebase/auth';
import loginByEmail from '../util/login/loginByEmail';
import useBearStore from '../store/zustandStore';
import LogoutButton from '../components/LogoutButton';

// function BearCounter() {
//   const bears = useBearStore((state) => state.bears)
//   return <Text>{bears} around here ...</Text>
// }

// function Controls() {
//   const increasePopulation = useBearStore((state) => state.increasePopulation)
//   return  <Button
//       title="increase"
//       onPress={increasePopulation}
//     />
// }

function ShowLoginStatus() {
  const isLoggedIn = useBearStore((state) => state.isLoggedIn)
  return <Text h2>Am i Logged in ? {String(isLoggedIn)}</Text>
}




export default function LoginScreen() {
  const setLoginState = useBearStore((state) => state.setLoginState);

  function handleLogin() {
  
    loginByEmail({
      email: "mommyji1@godess.com",
      password: "pappa ji",
      onSuccess: (s) => { Alert.alert(s) },
      onError: (e) => { Alert.alert(e) },
    });
  }


  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // implement after login logic here
      console.log("Auth Success", user);
      setLoginState(true ,user);
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      // Alert.alert("Welcome: you are signed in as",JSON.stringify(user))
    } else {
      // do not do anything in here , use logout for loggedin state clearence
      console.log("user cleared by logout or auth might have Failed");
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

 
 
  return (<View style={{
    flex: 1,
    backgroundColor:"black"
  }}>
    {/* <BearCounter />
    <Controls /> */}
    
    <ShowLoginStatus/>

    <Button
      title="login"
      onPress={handleLogin}
    />
  
  </View>
  );
  
}
