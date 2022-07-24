//components to be rendered
import MoviesScreen from '../Screens/MoviesScreen';
import MovieDetailScreen from '../Screens/MovieDetailScreen';

//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavouritesScreen from '../Screens/FavouritesScreen';
import SeasonDetails from '../Screens/SeasonDetails';
import CastDetails from '../Screens/CastDetails';
import TvScreen from '../Screens/TvScreen';
import FullViewScreen from '../Screens/FullViewScreen';
import AccountScreen from '../Screens/AccountScreen';
import ProfileEditScreen from '../Screens/ProfileEditScreen';

//initialization
const Stack = createNativeStackNavigator();

const MoviesToAllNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Movies" component={MoviesScreen} />
      <Stack.Screen name="TvScreen" component={TvScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="ViewAll" component={FullViewScreen}/>
      <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="SeasonDetails" component={SeasonDetails} />
      <Stack.Screen name="CastDetails" component={CastDetails} />
    </Stack.Navigator>
  );
}

export default MoviesToAllNavigator;