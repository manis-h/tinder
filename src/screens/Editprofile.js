import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, SegmentedButtons, Text, TextInput} from 'react-native-paper';
import useBearStore from '../../store/zustandStore';
import auth from '@react-native-firebase/auth';
import SimpleHome, {updateCreateProfile} from './SimpleHome';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
export default function Editprofile() {
  const [myProfile, setMyProfile] = useState(null);
  // const user = auth().currentUser;

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
  const {uid} = auth().currentUser;
  const navigation = useNavigation();
  const [data, setData] = useState({
    uid: uid,
    name: '',
    age: '',
    intrests: '',
    lookingFor: '',
    bio: '',
    proffesion: '',
  });

  useEffect(() => {
    console.log({zyzzz: myProfile});
    setData({
      ...data,
      ...myProfile,
    });
  }, [myProfile]);

  const user = auth().currentUser;
  const onSubmit = () => {
    console.log({name: user.name});
    updateCreateProfile({
      uid,
      name: data.name,
      age: data.age,
      intrests: data.intrests,
      lookingFor: data.lookingFor,
      bio: data.bio,
      proffesion: data.proffesion,
    });
  };

  console.log({uid});
  useEffect(() => {
    console.log({data});
  }, [data]);
  return (
    <View style={{padding: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Ionicons style={{padding: 10}} size={30} name="return-up-back" />
      </TouchableOpacity>
      {/* <Text> {JSON.stringify(data)}</Text> */}
      {/* <SimpleHome /> */}
      <TextInput
        style={styles.field}
        onChangeText={text => setData({...data, name: text})}
        placeholder="Enter Your Name"
        value={data.name}
      />
      <TextInput
        placeholder="Your Age"
        onChangeText={text => setData({...data, age: text})}
        keyboardType="numeric"
        value={data.age}
      />
      <TextInput
        onChangeText={text => setData({...data, intrests: text})}
        placeholder="Your Hobbies/Intrests"
        value={data.intrests}
      />
      <TextInput
        onChangeText={text => setData({...data, proffesion: text})}
        placeholder="Your Proffesion?"
        value={data.proffesion}
      />
      <Text>Looking For?</Text>
      <SegmentedButtons
        value={data.lookingFor}
        onValueChange={text => setData({...data, lookingFor: text})}
        // onValueChange={setValue}
        buttons={[
          {
            value: 'shortTerm',
            label: 'Short Term',
          },
          {value: 'longTerm', label: 'Long Term'},
        ]}
      />
      <TextInput
        value={data.bio}
        onChangeText={text => setData({...data, bio: text})}
        placeholder="Enter Bio"
        multiline={true}
        numberOfLines={4}
      />
      <Button
        onPress={() => {
          onSubmit(), navigation.navigate('Profile');
        }}
        mode="contained">
        Submit
      </Button>
    </View>
  );
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
