//components to be rendered
import SearchAndFilterScreen from '../Screens/SearchAndFilterScreen';
import FilterResults from '../Screens/FilterResults';
import GenreResults from '../Screens/GenreResults';
import yearResults from '../Screens/YearResults';
import MovieDetailScreen from '../Screens/MovieDetailScreen';
import FavouritesScreen from '../Screens/FavouritesScreen';
import SeasonDetails from '../Screens/SeasonDetails';
import CastDetails from '../Screens/CastDetails';
import FullViewScreen from '../Screens/FullViewScreen';
import ExtrasViews from '../Screens/ExtrasViews';
import ImageFullScreen from '../Screens/ImageFullScreen';
import FullReview from '../Screens/FullReview';
import FullCast from '../Screens/FullCast';
import FilterEnabler from '../Screens/FilterEnabler';


//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import FavouritesScreen from '../Screens/FavouritesScreen';
//initialization
const Stack = createNativeStackNavigator();

const MoviesToAllNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchAndFilter" component={SearchAndFilterScreen} />
      <Stack.Screen name="FilterResults" component={FilterResults} />
      <Stack.Screen name="genreResults" component={GenreResults} />
      <Stack.Screen name="yearResults" component={yearResults} />
      <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
      <Stack.Screen name="ExtrasViews" component={ExtrasViews} />
      <Stack.Screen name="FullCast" component={FullCast} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="SeasonDetails" component={SeasonDetails} />
      <Stack.Screen name="CastDetails" component={CastDetails} />
      <Stack.Screen name="FullReview" component={FullReview} />
      <Stack.Screen name="ViewAll" component={FullViewScreen} />
      <Stack.Screen name="FilterEnabler" component={FilterEnabler} />
      <Stack.Screen name="ImageFullView" component={ImageFullScreen} />
    </Stack.Navigator>
  );
}

export default MoviesToAllNavigator;