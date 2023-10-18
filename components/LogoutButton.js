import { Button } from 'react-native';

import useBearStore from '../store/zustandStore';
import { logout } from '../util/login/loginByEmail';

export default function LogoutButton() {
    const setLoginState = useBearStore((state) => state.setLoginState);

    function onLogout() {
    logout({
      onSuccess: () => {
          // console.log("run this on logout")
          setLoginState(false,null);
        }}
      )
    }
    
  return  <Button
      title="logout"
      onPress={onLogout}
    />
}
