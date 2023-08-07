//default apis
import { View, Text,StyleSheet, Image,TouchableWithoutFeedback } from 'react-native'
import React from 'react'

//color palette
import colors from '../Config/colors'

const MovieCards = ({dark,title,url,name,onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
          <Image source={{uri:url?`https://image.tmdb.org/t/p/w500${url}`:"https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"}} style={styles.moreCard}/>
          {/* <Text style={{color:dark?colors.white:colors.black,...styles.movieName}}>{title?title:name}</Text> */}
    </View>
    </TouchableWithoutFeedback>
  )
}

export default MovieCards;

const styles = StyleSheet.create({
  container:{
     maxWidth:160,
  },
    recommendations:{
        marginTop:20,
      },
      recommended:{
        color:colors.white,
        fontSize:28,
      },
      moreCard : {
        height:220,width:140,borderRadius:20,marginTop:18,margin:6/*resizeMode:"stretch"*/
      },
      movieName : {
        textAlign:"center",fontSize:15
      }
})    