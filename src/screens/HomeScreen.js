import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Button,
  Text,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Swiper from 'react-native-deck-swiper';
import {matchAccept, useGetAllUserFeed} from './MatchSwiper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const images = [
  'https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg?cs=srgb&dl=pexels-harsh-raj-gond-1485031.jpg&fm=jpg',
  'https://images.pexels.com/photos/1839963/pexels-photo-1839963.jpeg?cs=srgb&dl=pexels-abir-hasan-1839963.jpg&fm=jpg',
  'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?cs=srgb&dl=pexels-harsh-kushwaha-1689731.jpg&fm=jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjnmKsludJOKo2ikxJFgWaOJJG-hbmQ42v2TnMUrafvw1xwQ-xcjvJGV3DEgMIHH1HDc0&usqp=CAU',
  'https://models.bestmodelsagency.com/recursos/clientes/F31110A5-6133-4F2E-96A8-927FA9485371/list.jpg?v1589811317?202203111855',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyORouhNMJk4jyL6HEWCN6bZQRrHpzGQ_sMycyMPfQkNBXvSGNXejS53ccg-FZ8cEjuoo&usqp=CAU',
  'https://photos.modelmayhem.com/avatars/3/0/8/7/6/9/7/5204f4d202e2d_m.jpg',
];

const Home = () => {
  const [loading, allUsers] = useGetAllUserFeed();

  const [swipeLeftList, setSwipeLeftList] = useState([]);
  const [swipeRightList, setSwipeRightList] = useState([]);

  function handleSwipeLeft(uid) {
    setSwipeLeftList(st => [...st, uid]);
  }
  async function handleSwipeRight(uid) {
    await matchAccept(uid);
    setSwipeRightList(uid);
  }
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Entypo
          name="user"
          style={{
            marginBottom: -20,
            padding: 20,
            alignSelf: 'flex-end',
            // flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
          size={40}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <Swiper
          cards={allUsers}
          renderCard={(i, index) => {
            return (
              <>
                <View style={styles.card}>
                  <Image
                    style={styles.cardImage}
                    source={{uri: images[index]}}
                  />
                  <Text style={styles.cardText}>
                    {i?.name}, {i?.age}
                  </Text>
                  <View style={styles.cardActions}>
                    <Pressable
                      style={styles.likeButton}
                      onPress={() => {
                        console.log('Liked');
                      }}>
                      <Icon name="heart-circle" size={60} color="red" />
                    </Pressable>
                    <Pressable
                      style={styles.dislikeButton}
                      onPress={() => {
                        console.log('Disliked');
                      }}>
                      <Entypo name="circle-with-cross" size={60} color="red" />
                    </Pressable>
                  </View>
                </View>
              </>
            );
          }}
          onSwipedLeft={() => {
            console.log('Left swipe');
            Alert.alert(`Left Swipe`);
          }}
          onSwipedRight={i => {
            console.log(allUsers[i]);
            console.log('Right swipe', allUsers[i]?.uid);
            // handleSwipeRight(allUsers[i]?.uid);
            Alert.alert(`Right Swipe`);
          }}
          onSwiped={cardIndex => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          cardIndex={2}
          backgroundColor="#4FD0E9"
          stackSize={2}></Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  cardImage: {
    flex: 1,
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  likeButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
  },
  dislikeButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
  },
});

export default Home;
