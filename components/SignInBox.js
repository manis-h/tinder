import React, { useState } from 'react';
import {ImageBackground,
  Button, Alert,StyleSheet,
  View,TouchableOpacity
} from 'react-native';
import { Modal, Text, TextInput } from 'react-native-paper';
import loginByEmail from '../util/login/loginByEmail';
import { useNavigation } from '@react-navigation/native';


export default function SignInBox({setSignInUpToggle,signInUpToggle}) {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const navigation=useNavigation()
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


<View style={styles.flexScreen}>
            <ImageBackground

                resizeMode='cover'
                style={styles.flexScreen}
                source={{ uri: "https://tinder.com/static/tinder.png" }}>
                    <View style={{padding:20,borderStyle:'solid',
                 position: 'absolute', 
                 bottom: 0, 
                    width: '100%',
                 
                
                }} >
                       
                        <TextInput style={{marginVertical:10 ,backgroundColor:'white' , borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff' }}  onChangeText={(s) => setEmail(s)} placeholder='Your Email'/>
          <TextInput style={{marginVertical:10 ,backgroundColor:'white' , borderRadius: 10,
    borderWidth: 1, 
    borderColor: '#fff' }}placeholder='password'   autoCapitalize='none'
      
    onChangeText={(s)=>setPass(s)}/> 
   
   {/* <TouchableOpacity style={{}}>Submit</TouchableOpacity> */}
                    
                <TouchableOpacity onPress={()=>{Alert.alert(`Lets Start Swiping` ),onSubmit(), navigation.navigate('Home')}} style={{width:'100%' ,alignItems:'center', padding:10,opacity:1, backgroundColor:'#fff' ,borderWidth:1,borderRadius:10}}>
                    <Text >Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setSignInUpToggle(true)}>
        {<Text style={{fontSize:40}} h5>{signInUpToggle ? "Already Signed Up ?":"Need to Sign Up?" }</Text>}
        <Text>Click Here</Text>
    </TouchableOpacity>
                    </View>
 
                   
            </ImageBackground>
        </View>
    {/* <View style={{padding:10}}>
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
    </View> */}
  </>
}
const styles = StyleSheet.create({
  text: {
      fontSize: 20,
      fontWeight: '600',
      color: 'black',
      //   flex:1,
    textAlign:'center'
  },
  flexScreen: {
      flex: 1
  },
touchable:{
  position:'absolute',
  bottom:140,
  width:230,
  backgroundColor:'white',
  marginHorizontal:"20%",
  padding:8,
  borderRadius:20
}
});

