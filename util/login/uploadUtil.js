import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';

import {selectSinglePicture} from './fileSystemUtil';
import Profile from '../../src/screens/Profile';
import useBearStore from '../../store/zustandStore';

export function getProfileOnlinePathUrl() {
  const {uid: myUid} = auth().currentUser;
  const uploadStoragePath = `${myUid}/`;
  const fileName = 'profile-photo.png';
  const uploadPath = uploadStoragePath + fileName;
  return uploadPath;
}

export async function handleUploadPhoto(
  uploadPath,
  onSuccess = () => {
    console.warn('empty success fn');
  },
) {
  const reference = storage().ref(uploadPath);
  // select file from platform fileManager
  try {
    const pathOfFileOnDevice = await selectSinglePicture();
    // console.log({pathOfFileOnDevice});
    const contentUri = pathOfFileOnDevice?.uri;
    if (!contentUri) {
      return console.warn('no file path found or err');
    }
    // converting ContentUri to absolute filepath on filesystem
    // path to existing file on filesystem
    // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/Screenshots/ps.png`;
    const stat = await RNFetchBlob.fs.stat(contentUri);
    // console.log({stat});
    const pathToFile = stat.path;
    console.log('trying to upload', {pathToFile});

    // finally uploads file
    await (async function uploadFile(reference, pathToFile) {
      try {
        // await reference.putFile(pathToFile);
        const task = reference.putFile(pathToFile);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });

        task.then(uploaded => {
          console.log(
            'ok Image uploaded to the bucket!',
            uploaded?.metadata?.fullPath,
          );
          console.log('------------');
          //   onSuccess(uploaded?.metadata?.fullPath);
          onSuccess(uploaded);
          console.log('------------');
        });
      } catch (err) {
        console.error('error uploading file');
      }
    })(reference, pathToFile);
  } catch (error) {
    console.log(error);
    console.log('upload failed');
  }
}
export async function getFileFromCloud(path) {
  // const reference = storage().ref(path);
  // const downloadUrl = await reference.getDownloadURL();
  // console.log({downloadUrl});
  try {
    const url = await storage().ref(path).getDownloadURL();
    console.log({url});
    return url;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      // when file on server dont exist
      console.warn(error.code);
    }
    console.log(error);
  }
  return false;
}
