import { useNavigation } from '@react-navigation/core';
import React,{useLayoutEffect} from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    TouchableOpacity
} from 'react-native';


function LoginScreen(): JSX.Element {

    const navigation=useNavigation()

    useLayoutEffect(()=>{
       navigation.setOptions({
        headerShown:false,
       })
    },[])


    return (
        <View style={styles.flexScreen}>
            <ImageBackground

                resizeMode='cover'
                style={styles.flexScreen}
                source={{ uri: "https://tinder.com/static/tinder.png" }}>

                <TouchableOpacity style={styles.touchable}>
                    <Text style={styles.text}>Sign in & get Swiping</Text>
                </TouchableOpacity>
            </ImageBackground>
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
