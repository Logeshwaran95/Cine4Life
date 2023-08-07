//default apis
import React,{useState,useEffect} from 'react';

//components to be rendered
import OnBoardingScreen from '../Screens/OnBoardingScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';

//using async storage to detect if the app is launched for the first time
import AsyncStorage from '@react-native-async-storage/async-storage';

//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';

//initialization
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routename;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value==null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    })
  },[]);
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routename = 'Onboarding';
  } else {
    routename = 'Login';
  }

  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }} 
    initialRouteName={routename}
    >
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={AppNavigator} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;