import React, { useLayoutEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import Swiper from 'react-native-deck-swiper'
import firestore from '@react-native-firebase/firestore';

function HomeScreen({ navigation }: any): JSX.Element {
  const usersCollection = firestore().collection('users');

  const DUMMY_DATA = [
    {firstName: "Sonny",
    lastName: "Sangha",
    occupation: "Software Developer",
    photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
    age: 27,
    },
    {firstName: "Elon",
    lastName: "Musk",
    occupation: "Software Developer",
    photoURL:"https://www.biography.com/.image/ar 1:1%2Cc_fill%2Ccs_srgb%2Cfl progressive%2Cq_auto:good%2Cw_1200/MTc50TK20DUyMTMxNzM00Dcy/gettyimages-1229892983-square.jpg",
    age: 40,
    },
    {
    firstName: "Sonny",
    lastName: "Sangha",
    occupation: "Software Developer",
    photoURL:
    "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc50TK20DUyMTMxNzM00Dcy/gettyimages-1229892983-square.jpg",
    age: 21,
    },
    ];




  const AppButton = ({ backgroundColor }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat')}
      style={[
        styles.appButtonContainer,
        backgroundColor && { backgroundColor }
      ]}
    >
      <Text style={[styles.appButtonText,]}>
        Go To Chat Screen
      </Text>
    </TouchableOpacity>
  );

  // ...
  // <AppButton title="Hey there!" size="sm" backgroundColor="#007bff" />;


  return (
    <SafeAreaView>
      {/* {Header} */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.touchable}>
          <Image style={styles.profileImage} source={{ uri: "https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg" }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image style={styles.logo} source={require("../logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Message} >
          <Image style={styles.MessageIcon} source={require('../icons/message.png')}></Image>
        </TouchableOpacity>
      </View>
      {/* {End OF Header} */}


      {/* <Swiper cards={DUMMY_DATA}/> */}

      {/* <Text>I m the Home Screen</Text>
      <AppButton backgroundColor='transparent' /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    height: 45,
    width: 45,
    borderRadius: 100
  },
  header: {
    alignItems: 'center',
    position: 'relative',
    justifyContent:'space-evenly',
    flexDirection:'row'
  },
  touchable: {
    position: 'absolute',
    top: 10,
    left: 10
  },
  MessageIcon: {
 height:45,
 width:45
  },
  Message: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
  logo: {
    height: 50,
    width: 50,
    top: 10,

  },
  appButtonContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default HomeScreen;
