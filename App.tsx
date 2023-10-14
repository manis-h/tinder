import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ScreenNavigator from './ScreenNavigator';
import { SafeAreaView } from 'react-native';



export default function App() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView> */}
        <ScreenNavigator />
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}