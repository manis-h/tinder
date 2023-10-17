import React, { useState, useEffect } from 'react';
import { Button, TextInput ,Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import loginByEmail from '../util/login/loginByEmail';
import { logout } from '../util/login/loginByEmail';

export default function PhoneSignIn() {
  loginByEmail({
    email: "mommyji@godess.com",
    password: "pappa ji",
    onSuccess: (s) => { Alert.alert(s) },
    onError: (e) => { Alert.alert(e) },
  });

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      console.log("Auth Success", user)
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    } else {
      console.log("Auth Failed");
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
 
  return (<>

    <Button
      title="logout"
      onPress={() => logout()}
    />
  </>
  );
  
}
