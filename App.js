//navigation container
import { NavigationContainer } from '@react-navigation/native';

//Authentication Navigator
import AuthNavigator from './App/Navigations/AuthNavigator';

export default function App() {
  return (
    <>
    {/* <AppBar/> */}
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
    </>
  );
}

