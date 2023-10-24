import DocumentPicker from 'react-native-document-picker';

export async function selectSinglePicture() {
  try {
    const result = await DocumentPicker.pickSingle({
      type: 'image/jpeg',
    });
    console.log(
      result.uri,
      result.type, // mime type
      result.name,
      result.size,
    );
    return result;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker
      console.warn('file selection canceled');
    } else {
      throw err;
    }
  }
  return false;
}
