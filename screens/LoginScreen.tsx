
import { useNavigation } from '@react-navigation/core';
import React,{useLayoutEffect, useState} from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    TouchableOpacity,
    Button,
    TextInput,
    Alert,
    Modal
} from 'react-native';
import DatePicker from 'react-native-date-picker';



function LoginScreen(): JSX.Element {
    const navigation=useNavigation()
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
  
    useLayoutEffect(()=>{
       navigation.setOptions({
        headerShown:false,
       })
    },[])
    const [name,setName]=useState('')

    const [modalVisible, setModalVisible] = useState(false);
    return (
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
                        <TextInput style={{marginVertical:10, backgroundColor:'white' , borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff' }} placeholder='Your Name' onChangeText={newText => setName(newText)} value={name}/> 
                        <TextInput style={{marginVertical:10 ,backgroundColor:'white' , borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff' }} placeholder='Your Number'/> 
    <Text style={{textAlign:'center', backgroundColor:'white', marginVertical:5}}>Your Date of Birth</Text>
   <DatePicker style={{marginVertical:5, backgroundColor:'white',alignItems:'center'}} mode='date' date={date} onDateChange={setDate} />
   {/* <TouchableOpacity style={{}}>Submit</TouchableOpacity> */}
                    
                <TouchableOpacity onPress={()=>Alert.alert(`Welcome Aboard ${name}`)} style={{width:'100%' ,alignItems:'center', padding:10,opacity:1, backgroundColor:'#fff' ,borderWidth:1,borderRadius:10}}>
                    <Text >Register</Text>
                </TouchableOpacity>
                    </View>
 
            </ImageBackground>
            <Modal style={{backgroundColor:'white', opacity:0}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
        >
            <Text>Welcome Aboard {name}</Text>
        </Modal>
        </View>
    );
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


export default LoginScreen;
