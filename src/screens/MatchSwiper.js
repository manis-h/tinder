import {Pressable, ScrollView, View, Alert} from 'react-native';
import {Text} from 'galio-framework';

import auth from '@react-native-firebase/auth';

import LogoutButton from '../../components/LogoutButton';
import useBearStore from '../../store/zustandStore';

import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {fakerEN_IN as faker} from '@faker-js/faker';
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';

const randomName = faker.person.fullName(); // Rowan Nikolaus
// const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// console.log({
//     randomName,
//     randomEmail
// })

export const useGetAllUserFeed = () => {
  const user = auth().currentUser;
  console.log({user});

  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const ref = firestore().collection('users');

  useEffect(() => {
    return ref.onSnapshot(
      querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          console.log(doc);
          // const { name, age } = doc.data();
          list.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setAllUsers(list);

        if (loading) {
          setLoading(false);
        }
      },
      err => {
        console.log(err);
        Alert.alert('something went wrong', `3 ${err.message}`);
      },
    );
  }, []);

  return [loading, allUsers];
};

async function matchAccept(otherUid) {
  const {uid: myUid} = auth().currentUser;

  if (!otherUid) return Alert.alert('need other person uid');
  if (!myUid) return Alert.alert('need myProfile uid');

  console.log('match accept fn', {myUid, otherUid});

  // ACCEPT/Swipe Right Action with other person's id
  const inMyPendingDocRef = firestore()
    .collection('users')
    .doc(myUid)
    .collection('pending')
    .doc(otherUid);
  const inMyPendingDoc = await inMyPendingDocRef.get();
  console.log(inMyPendingDoc.exists);

  // check if already
  // pending by myside only -> if yes match,
  // else pending by other / store in others pending collection

  if (!inMyPendingDoc.exists) {
    // store in other person's pending
    const othersPending = firestore()
      .collection('users')
      .doc(otherUid)
      .collection('pending')
      .doc(myUid);
    await othersPending.set(
      {
        uid: myUid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      },
      {merge: true},
    );
    console.log('be patient match is in pending by other side');
  }
  if (inMyPendingDoc.exists) {
    console.log('hooray there is a match , other side chose you too');
    Alert.alert(`Congrats matched with uid: ${otherUid}`);

    async function storeMatch(uid, uid2) {
      // storing uid2 into uid collection named "match"
      // storing match info for chat enable and notification
      const othersPending = firestore()
        .collection('users')
        .doc(uid)
        .collection('match')
        .doc(uid2);
      await othersPending.set(
        {
          uid: myUid,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );
      console.log(
        `changed pending collection of uid ${uid} by inserting uid ${uid2}`,
      );
    }

    await storeMatch(myUid, otherUid);
    await storeMatch(otherUid, myUid);
  }

  // try {
  //   await userDocRef.set({
  //   uid,
  //   name,
  //   age
  //     },{merge:true});
  // } catch (error) {
  //   Alert.alert('something went wrong', `2 ${error.message}`)
  // }
}

export default MatchSwiper = () => {
  const [loading, allUsers] = useGetAllUserFeed();

  return (
    <ScrollView
      style={{
        backgroundColor: 'black',
        minHeight: 50,
        width: '100%',
        maxHeight: '100%',
      }}>
      {loading && <ActivityIndicator />}

      {allUsers.map(user => {
        return (
          <Pressable
            key={user.id}
            onPress={() => {
              // ArrayUnion(user.id);
              matchAccept(user.id);
            }}
            style={{marginVertical: 5}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text h5>{user.name}</Text>
              </View>
              <View>
                <Text h5>{user.id}</Text>
              </View>
            </View>
            <View>
              <Text>{JSON.stringify(user)}</Text>
            </View>
            <Divider />
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
