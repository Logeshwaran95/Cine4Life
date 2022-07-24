//components to be rendered
import FilterResults from '../Screens/FilterResults';
import MovieDetailScreen from '../Screens/MovieDetailScreen';

//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import FavouritesScreen from '../Screens/FavouritesScreen';
//initialization
const Stack = createNativeStackNavigator();

const MoviesToAllNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FilterResults" component={FilterResults} />
      <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
}

export default MoviesToAllNavigator;