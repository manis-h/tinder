import React, {useEffect, useState} from 'react';
import styles from '../../assets/styles';

import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import ProfileItem from '../components/ProfileItem';
import Icon from 'react-native-vector-icons/AntDesign';
import Demo from '../../assets/data/demo.js';
import useBearStore from '../../store/zustandStore';

import { Modal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  useEffect(()=>{
    console.log(visible)
  },[visible])
  const containerStyle = {backgroundColor: 'white', padding: 20, };
  const {
    age,
    image,
    info1,
    info2,
    info3,
    info4,
    location,
    match,
    name
  } = Demo[7];

  const userProfile = useBearStore(state => state.userProfile);
  console.log({userProfile})
  
  const navigation=useNavigation()
  return (
    <>
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={image} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.topIconLeft}>
                <Icon name="home" />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{ navigation.navigate('EditProfile')}}>
              <Text style={styles.topIconRight}>
                <Icon name="edit" />
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ProfileItem
          matches={match}
          name={userProfile?.name}
          age={age}
          location={location}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
        />

        {/* <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Text style={styles.iconButton}>
              <Icon name="optionsH" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.iconButton}>
              <Icon name="chat" />
            </Text>
            <Text style={styles.textButton}>Start chatting</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </ImageBackground>
    
    </>
  );
};

export default Profile;
