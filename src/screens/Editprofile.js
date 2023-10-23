import React,{useState,useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper'
import useBearStore from '../../store/zustandStore';
import auth from '@react-native-firebase/auth';
import { updateCreateProfile } from './SimpleHome';

export default function Editprofile() {
    const userProfile = useBearStore(state => state.userProfile);
    const {uid} = auth().currentUser;

    const [data,setData]=useState({
        uid:uid,
        name:'',
        age:'',
        intrests:'',
        lookingFor:'',
        bio:'',
        proffesion:''
    })
    const user = auth().currentUser;
const onSubmit=()=>{
    updateCreateProfile(
        ...user
        )
}
   
    console.log({uid})
    useEffect(()=>{
        console.log({data})
    },[data])
    return (
    <View style={{padding:10}}>
       <Text> {JSON.stringify(data)}</Text>
        <TextInput style={styles.field} onChangeText={(text)=>setData({...data,name:text})} placeholder='Enter Your Name'
        value={data.name}
        />
        <TextInput placeholder='Your Age'onChangeText={(text)=>setData({...data,age:text})} keyboardType='numeric'/>
        <TextInput onChangeText={(text)=>setData({...data,intrests:text})} placeholder='Your Hobbies/Intrests'/>
        <TextInput onChangeText={(text)=>setData({...data,proffesion:text})} placeholder='Your Proffesion?'/>
        <Text >Looking For?</Text>
        <SegmentedButtons 

        // value={value}
        onValueChange={(text)=>setData({...data,lookingFor:text})}
        // onValueChange={setValue}
        buttons={[
         
          {
            value: 'shortTerm',
            label: 'Short Term',
          },
          { value: 'longTerm', label: 'Long Term' },
        ]}
      />
        <TextInput  onChangeText={(text)=>setData({...data,bio:text})} placeholder='Enter Bio' multiline={true} numberOfLines={4}/>
        <Button onPress={onSubmit} mode="contained">Submit</Button>   
    </View>
  )
}

const styles = StyleSheet.create({
    
    field: {
      marginTop: 16,
    //   paddingVertical: 8,
    //   borderWidth: 4,
    //   borderColor: '#20232a',
    //   borderRadius: 6,
    //   backgroundColor: '#61dafb',
    //   color: '#20232a',
    //   textAlign: 'center',
    //   fontSize: 30,
    //   fontWeight: 'bold',
    },
  });
