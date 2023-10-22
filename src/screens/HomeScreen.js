import React from 'react';
import { View, ImageBackground, StyleSheet, Button, Text, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Swiper from 'react-native-deck-swiper'
const images=[
  'https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?cs=srgb&dl=pexels-harsh-raj-gond-1485031.jpg&fm=jpg',
'https://images.pexels.com/photos/1839963/pexels-photo-1839963.jpeg?cs=srgb&dl=pexels-abir-hasan-1839963.jpg&fm=jpg',
'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?cs=srgb&dl=pexels-harsh-kushwaha-1689731.jpg&fm=jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnmKsludJOKo2ikxJFgWaOJJG-hbmQ42v2TnMUrafvw1xwQ-xcjvJGV3DEgMIHH1HDc0&usqp=CAU',
'https://models.bestmodelsagency.com/recursos/clientes/F31110A5-6133-4F2E-96A8-927FA9485371/list.jpg?v1589811317?202203111855',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyORouhNMJk4jyL6HEWCN6bZQRrHpzGQ_sMycyMPfQkNBXvSGNXejS53ccg-FZ8cEjuoo&usqp=CAU',
'https://photos.modelmayhem.com/avatars/3/0/8/7/6/9/7/5204f4d202e2d_m.jpg'
]

const Home = () => {
  return (
    
       <View style={styles.container}>
        <Swiper 
            cards={images.map((i)=><>
            <Image   height={500} width={400}   source={{uri: i}}
            
      />
            </>)}
            renderCard={(card) => {
                return (
                    <View style={styles.card}>
                        <Text style={styles.text}>{card}</Text>
                        
        <Pressable   style={{position:'absolute',bottom:10 ,marginHorizontal:40, backgroundColor:'transparent',flex:1,flexDirection:'row', justifyContent:'space-between' }}
                onPress={() => {console.log('oulala')}}
                title="Press me">
                <Icon.Button   size={50} name="heart-circle"  style={{backgroundColor:'transparent',}} >
    
  </Icon.Button>
  
            </Pressable>
            <Pressable  style={{position:'absolute',bottom:10 ,paddingHorizontal:35, backgroundColor:'transparent',flex:1,flexDirection:'row', alignSelf:'flex-end'}}>
  <Entypo.Button  size={50} name="circle-with-cross"  style={{backgroundColor:'transparent',}} >
    
    </Entypo.Button>
    </Pressable>          

                    </View>
                )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={2}
            backgroundColor={'#4FD0E9'}
            stackSize= {2}>
            
        </Swiper>
    </View>

    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
    bgImageWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0
    },
    bgImage: {
        flex: 1,
        resizeMode: "stretch"
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});
export default Home;
