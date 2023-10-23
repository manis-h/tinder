import {Pressable, View, Alert} from 'react-native';
import {Text} from 'galio-framework';

import LogoutButton from '../../components/LogoutButton';
import useBearStore from '../../store/zustandStore';

import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {default as MatchSwiper} from './MatchSwiper';
import auth from '@react-native-firebase/auth';

export function ShowAuthInfo() {
  const user = auth().currentUser;
  // console.log('ShowAuthInfo', { user });

  const userProfile = useBearStore(state => state.userProfile);

  function onAuthStateChanged(user) {
    if (user) {
      // console.log("ShowAuthInfo changed", user);
      // console.log('dispatching nothing')
    } else {
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <>
      <Text h3 color="gold">
        {userProfile?.email}
      </Text>
      {/* // from direct auth obj firebase */}

      <Text color="gold">{JSON.stringify(user)}</Text>

      {/* // from zustand store */}
      {/* <Text color='brown' h5>{(userProfile?.uid)}</Text>
      <Text color='brown'>{JSON.stringify(userProfile)}</Text>   */}

      <Button color='red'
        title={'send verification mail'}
        onPress={async () => {
          await userProfile.sendEmailVerification();
        }}
      />
      <Button color={'red'}
        title={'Reload profile'}
        onPress={async () => {
          userProfile.reload();
        }}
      />
    </>
  );
}

export function ShowMySocialProfile() {
  const [myProfile, setMyProfile] = useState(null);
  // const user = auth().currentUser;
  const {uid} = auth().currentUser;

  useEffect(() => {
    const profileUnsub = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(
        doc => {
          setMyProfile(doc.data());
        },
        err => Alert.alert('error', err.message),
      );

    return profileUnsub;
  }, []);

  return (
    <View
      style={{
        borderColor: 'gold',
        borderWidth: 3,
        margin: 10,
      }}>
      {/* <Text > { JSON.stringify(user)}</Text> */}
      <Text> {JSON.stringify(uid)}</Text>
      <Text h6 color={'red'}>
        {' '}
        {JSON.stringify(myProfile)}
      </Text>
      <Button title="set Profile" onPress={() => updateCreateProfile(uid)} />
    </View>
  );
}

export async function updateCreateProfile({uid,
  name,
  age,
  intrests,
  lookingFor,
  bio,
  proffesion}) {
  if (!uid) return Alert.alert('need uid');
  if (!name) return Alert.alert('need name');
  if (!age) return Alert.alert('need age');

  const userDocRef = firestore().collection('users').doc(uid);
  try {
    await userDocRef.set(
      {
        uid,
        name,
        age,
        intrests,
        lookingFor,
        bio,
        proffesion
      },
      {merge: true},
    );
  } catch (error) {
    Alert.alert('something went wrong', `2 ${error.message}`);
  }
}

export default function SimpleHome() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Text h1>Welcome</Text>
      {/* <ShowAuthInfo /> */}
      <ShowMySocialProfile />

      <Divider />

      <MatchSwiper />

      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <LogoutButton />
      </View>
    </View>
  );
}
