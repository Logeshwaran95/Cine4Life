//default apis
import { View, Text,StyleSheet } from 'react-native';
import React from 'react';

//rating library
import { Rating, AirbnbRating } from 'react-native-ratings';

//color palette
import colors from '../Config/colors';

const Ratings = ({rate}) => {
  const isDark=true;
  return (
    <View>
      {/* <Rating
  type='star'
  ratingCount={5}
  imageSize={25}
  showRating
  isDisabled
  ratingTextColor={isDark?colors.white:colors.dark}
  startingValue={3}
  fractions={1}
  // onFinishRating={this.ratingCompleted}
  tintColor={colors.secondary}
  /> */}
  <AirbnbRating
  count={5}
  reviews={["Critical", "OK", "Good","Wow", "Amazing"]}
  defaultRating={Math.round(rate/2)}

  size={20}
  isDisabled
  showRating
  reviewSize={15}
  reviewColor={isDark?colors.white:colors.dark}
/>
    </View>
  )
}

export default Ratings;


const styles = StyleSheet.create({
  
})