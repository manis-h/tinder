import React, {useState, useEffect} from 'react';
import {Button, Alert, View, TouchableOpacity} from 'react-native';
import {Text} from 'galio-framework';
import auth from '@react-native-firebase/auth';
import useBearStore from '../../store/zustandStore';
import SignInBox from '../../components/SignInBox';
import SignUpBox from '../../components/SignUpBox';
import SignUp from './SignUp';


function ShowLoginStatus() {
  const isLoggedIn = useBearStore(state => state.isLoggedIn);
  return <Text h4>Am i Logged in ? {String(isLoggedIn)}</Text>;
}

export default function LoginScreen() {
  const setLoginState = useBearStore(state => state.setLoginState);
  const [signInUpToggle, setSignInUpToggle] = useState(false);

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // implement after login logic here
      console.log('Auth Success', user);
      setLoginState(true, user);

      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      // Alert.alert("Welcome: you are signed in as",JSON.stringify(user))

      //check if email is verified
      console.log('user_Verified_Email', user.emailVerified);
      if (user.emailVerified) {
        // toastr.success('Email verified');
      } else {
        // toastr.info('Do verify email');
      }
    } else {
      // do not do anything in here , use logout for loggedin state clearence
      console.log('user cleared by logout or auth might have Failed');
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
 
    {<Text h1>{signInUpToggle ? "SignUp":"SignIn" }</Text>}
    {!signInUpToggle ? <SignInBox setSignInUpToggle={setSignInUpToggle} signInUpToggle={setSignInUpToggle} /> : <SignUp setSignInUpToggle={setSignInUpToggle} signInUpToggle={setSignInUpToggle} />}

    <View style={{ position: "absolute", bottom: 0 }}>
    {/* <ShowLoginStatus /> */}
    </View>
    
    {/* <TouchableOpacity onPress={()=>setSignInUpToggle(!signInUpToggle)}>
        {<Text h5>{signInUpToggle ? "Already Signed Up?":"Need to Sign Up?" }</Text>}
    </TouchableOpacity> */}

  </View>
  );
}
