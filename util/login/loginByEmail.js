import auth from '@react-native-firebase/auth';

/**
 * @type {string}   email
 * @type {string}   password
 * @type {function}   onSuccess
 * @type {function}   onError
 */
export default LoginWithEmail = ({ email, password, onSuccess = (s) => console.log({ success: s }), onError = (e) => console.log({ error: e }) }) => {
    console.log({email,password});
    
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
          console.log('User account created & signed in!');
          onSuccess('User account created & signed in!')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            onError('That email address is already in use!')
        }
    
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            onError('That email address is invalid!')
        }
    
        console.error(error);
      });
} 

const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!')).catch((e)=>console.log("ps error",e));
}

export { logout }

