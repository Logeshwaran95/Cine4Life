//components and screens to be rendered
import MoviesScreen from '../Screens/MoviesScreen';
import MovieDetailScreen from '../Screens/MovieDetailScreen';
import FavouritesScreen from '../Screens/FavouritesScreen';
import SeasonDetails from '../Screens/SeasonDetails';
import CastDetails from '../Screens/CastDetails';
import TvScreen from '../Screens/TvScreen';
import FullViewScreen from '../Screens/FullViewScreen';
import ExtrasViews from '../Screens/ExtrasViews';
import ImageFullScreen from '../Screens/ImageFullScreen';
import FullReview from '../Screens/FullReview';
import FullCast from '../Screens/FullCast';
import FilterEnabler from '../Screens/FilterEnabler';

//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//initialization
const Stack = createNativeStackNavigator();

const TvToAllNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TvScreen" component={TvScreen} />
      {/* <Stack.Screen name="ViewAll" component={FullViewScreen} /> */}
      <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
      <Stack.Screen name="ExtrasViews" component={ExtrasViews} />
      <Stack.Screen name="FullCast" component={FullCast} />
    
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="SeasonDetails" component={SeasonDetails} />
      <Stack.Screen name="CastDetails" component={CastDetails} />
      <Stack.Screen name="ImageFullView" component={ImageFullScreen} />
      <Stack.Screen name="FullReview" component={FullReview} />
      <Stack.Screen name="ViewAll" component={FullViewScreen} />
      <Stack.Screen name="FilterEnabler" component={FilterEnabler} />
      
    </Stack.Navigator>
  );
}

export default TvToAllNavigator;