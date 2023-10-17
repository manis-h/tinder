import auth from '@react-native-firebase/auth';

/**
 * @type {string}   email
 * @type {string}   password
 * @type {function}   onSuccess
 * @type {function}   onError
 */
export default LoginWithEmail = ({ email, password, onSuccess = (s) => console.log({ default_success: s }), onError = (e) => console.log({ default_error: e }) }) => {
    console.log({email,password});
    
    auth()
      // .createUserWithEmailAndPassword(email, password)
      .signInWithEmailAndPassword(email, password)
      .then(() => {
          console.log('User signed in!');
          onSuccess('User signed in Successfully!')
      })
      .catch(error => {
     
        if (error.code === 'auth/invalid-login') {
            console.log('INVALID_LOGIN_CREDENTIALS!');
            return onError('login credentials are invalid!')
        }
    
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            return onError('That email address is invalid!')
        }
    
        console.error(error);
        return onError(error.message)

      });
} 

const signUpWithEmail = ({ email, password, onSuccess = (s) => console.log({ default_success: s }), onError = (e) => console.log({ default_error: e }) }) => {
    console.log({email,password});
    
    auth()
      .createUserWithEmailAndPassword(email, password)
      // .signInWithEmailAndPassword(email, password)
      .then(() => {
          console.log('User account created & signed in!');
          onSuccess('User account created & signed in!')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            return onError('That email address is already in use!')
        }
        if (error.code === 'auth/weak-password') {
            console.log('auth/weak-password!');
            return onError('Try using a Stronger password my friend!')
        }
    
        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            return onError('That email address is invalid!')
        }
        console.error(error);
        return onError(error.message)
      });
} 

const logout = ({ onSuccess = () => console.log("default success: logged out") }) => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        onSuccess();
    }).catch((e)=>console.log("ps error",e));
}

export { logout ,signUpWithEmail }

