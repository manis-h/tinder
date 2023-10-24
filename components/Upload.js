import React, {useEffect} from 'react';
import {View, Button, PermissionsAndroid} from 'react-native';

import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ProfilePhoto from './profilePhoto';
import {
  handleUploadPhoto,
  getFileFromCloud,
  getProfileOnlinePathUrl,
} from '../util/login/uploadUtil';
import useBearStore from '../store/zustandStore';

const requestWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('ok You can use the WRITE_EXTERNAL_STORAGE');
    } else {
      console.error('error WRITE_EXTERNAL_STORAGE permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
const requestReadPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('ok You can use the READ_EXTERNAL_STORAGE');
    } else {
      console.error('error READ_EXTERNAL_STORAGE permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function UploadCompo() {
  const uploadPath = getProfileOnlinePathUrl();
  const setUserProfilePhotoUrl = useBearStore(
    state => state.setUserProfilePhotoUrl,
  );

  return (
    <View>
      <Button title="req write" onPress={requestWritePermission} />
      <Button title="req read" onPress={requestReadPermission} />
      <Button
        title="upload"
        onPress={() =>
          handleUploadPhoto(uploadPath, url => setUserProfilePhotoUrl(url))
        }
      />
      <Button
        title="download"
        onPress={() => getFileFromCloud('testDir/testfile.png')}
      />
      <ProfilePhoto />
    </View>
  );
}
