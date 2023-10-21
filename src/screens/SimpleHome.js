import {
    View,
} from 'react-native';
import { Text } from 'galio-framework'

import LogoutButton from '../../components/LogoutButton';
import useBearStore from '../../store/zustandStore';

function ShowUserProfile() {
  const userProfile = useBearStore((state) => state.userProfile)
    return <>
  {/* <Text h5>{(userProfile?.uid)}</Text> */}
  <Text h3 color='gold'>{(userProfile?.email)}</Text>
  <Text>{JSON.stringify(userProfile)}</Text>
      
  </>
}


export default function SimpleHome() {

    return <View style={{
        flex:1,
        backgroundColor: "black"
    }}
    >
        <Text h1>Welcome</Text>
        <ShowUserProfile />
        
        <View style={{position:"absolute",bottom:0,width:"100%"}}>
        <LogoutButton/>
        </View>

    </View>
} 