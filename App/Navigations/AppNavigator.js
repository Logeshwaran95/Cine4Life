//default React apis imports
import {Text ,Alert} from 'react-native'
import React from 'react'

//for navigations
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//initialization
const Tab = createBottomTabNavigator();

//for icons
import {FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons'

//color palette
import colors from '../Config/colors';

//my button component
import CustomButton from '../Components/CustomButton';

//required navigators
import MoviesToAllNavigator from './MoviesToAllNavigator';
import FilterToFilterResults from './FilterToFilterResults';
import TvToAllNavigator from './TvToAllNavigator';


const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
      name="Movies"
      component={MoviesToAllNavigator}
      options={{
          headerTitle: 'Movies',
          headerTitleAlign: 'center',
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="play-circle" color={color} size={size}/>
          ),
      }} 
      />
      <Tab.Screen 
      name="SearchAndFilter"
      component={FilterToFilterResults}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <CustomButton
            size={35}
            type="search"
            style={{height:70,width:70}}
            onPress={() => navigation.navigate("SearchAndFilter")}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-search"
            color={color}
            size={size}
          />
        ),
      })}
      />
      <Tab.Screen 
      name="TV"
      component={TvToAllNavigator}
      options={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="television-play" color={color} size={size}/>
          ),
      }} 
      />
    </Tab.Navigator>
  )
};

export default AppNavigator;