import {View, Image} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {Text} from 'galio-framework';
import {getFileFromCloud} from '../util/login/uploadUtil';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native-paper';
import useBearStore from '../store/zustandStore';

const defaultImage = null;

const ShowImage = ({uri = defaultImage}) => {
  if (!uri) {
    return (
      <View
        style={{
          backgroundColor: 'black',
          aspectRatio: 1,
          borderRadius: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text h4> no profile photo</Text>
      </View>
    );
  }
  return (
    <Image
      // height={200}
      // width={200}
      aspectRatio={1}
      source={{
        uri,
      }}
    />
  );
};

export function ProfilePhoto() {
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState();
  const {uid: myUid} = auth().currentUser;
  const OnlineProfilePath = `${myUid}/profile-photo.png`;
  const userProfilePhotoUrl = useBearStore(state => state.userProfilePhotoUrl);
  console.log({userProfilePhotoUrl});

  const getProfileUrl = async () => {
    const url = await getFileFromCloud(OnlineProfilePath);
    if (url) {
      setPhotoUrl(url);
    }
    setLoading(false);
  };
  getProfileUrl();

  return (
    <View
      style={{
        aspectRatio: 1,
        backgroundColor: 'grey',
        // justifyContent: 'center',
      }}>
      {!loading ? (
        <ShowImage
          key={userProfilePhotoUrl?.metadata?.md5Hash}
          uri={photoUrl}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={80} />
        </View>
      )}
    </View>
  );
}

export default ProfilePhoto;
