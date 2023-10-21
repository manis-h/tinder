import React, { useState } from 'react';
import {
  Button, Alert,
  View
} from 'react-native';
import { TextInput } from 'react-native-paper';
import loginByEmail from '../util/login/loginByEmail';


export default function SignInBox() {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  function onSubmit() {
    if (!email || !pass) return;
    loginByEmail({
      email: email,
      password: pass,
      onSuccess: (s) => { Alert.alert(s) },
      onError: (e) => { Alert.alert(e) },
    });
  }

  return <>
    <View style={{padding:10}}>
      <TextInput
        placeholder='email' 
        onChangeText={(s) => setEmail(s)}
      />
        <TextInput
        placeholder='password'
        onChangeText={(s)=>setPass(s)}
        // secureTextEntry
        autoCapitalize='none'
        />
      <Button
        onPress={onSubmit}
              title='sign In' 
              color={"green"}
        />
    </View>
  </>
}