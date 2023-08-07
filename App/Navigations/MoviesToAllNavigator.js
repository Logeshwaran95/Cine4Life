import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoviesScreen from '../Screens/MoviesScreen';
import MovieDetailScreen from '../Screens/MovieDetailScreen';
import FavouritesScreen from '../Screens/FavouritesScreen';
import SeasonDetails from '../Screens/SeasonDetails';
import CastDetails from '../Screens/CastDetails';
import TvScreen from '../Screens/TvScreen';
import FullViewScreen from '../Screens/FullViewScreen';
import AccountScreen from '../Screens/AccountScreen';
import ProfileEditScreen from '../Screens/ProfileEditScreen';
import ExtrasViews from '../Screens/ExtrasViews';
import FullCast from '../Screens/FullCast';
import ImageFullScreen from '../Screens/ImageFullScreen';
import FullReview from '../Screens/FullReview';
import FilterEnabler from '../Screens/FilterEnabler';

const Stack = createNativeStackNavigator();

const MoviesToAllNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Movies" component={MoviesScreen} />
      <Stack.Screen name="TvScreen" component={TvScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />

      <Stack.Screen name="MovieDetails" component={MovieDetailScreen} />
      <Stack.Screen name="FullCast" component={FullCast} />
      <Stack.Screen name="ExtrasViews" component={ExtrasViews} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="SeasonDetails" component={SeasonDetails} />
      <Stack.Screen name="CastDetails" component={CastDetails} />
      <Stack.Screen name="ImageFullView" component={ImageFullScreen} />
      <Stack.Screen name="ViewAll" component={FullViewScreen} />
      <Stack.Screen name="FullReview" component={FullReview} />
      <Stack.Screen name="FilterEnabler" component={FilterEnabler} />
    </Stack.Navigator>
  );
}



export default MoviesToAllNavigator;
