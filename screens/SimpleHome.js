import {
    View,
    // Text
} from 'react-native';
import { Text } from 'galio-framework'

import LogoutButton from '../components/LogoutButton';
import useBearStore from '../store/zustandStore';

function ShowUserProfile() {
  const userProfile = useBearStore((state) => state.userProfile)
  return <Text>{JSON.stringify(userProfile)}</Text>
}


export default function SimpleHome() {

    return <View style={{
        flex:1,
        backgroundColor: "green"
    }}
    >
        <Text h1>Welcome</Text>
        <ShowUserProfile/>
        <LogoutButton/>

    </View>
} 