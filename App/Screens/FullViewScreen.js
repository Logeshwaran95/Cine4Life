//default apis
import { View, Text,StyleSheet ,StatusBar,ScrollView,Image,TouchableWithoutFeedback,Dimensions} from 'react-native'
import React from 'react'

//color palette
import colors from '../Config/colors';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';

const {width,height} = Dimensions.get("window");

const FullViewScreen = ({route,navigation}) => {

    //state variables
    const movies = route.params.movies;
    const title= route.params.title;
    const isDark=true;

    
  return (
    <ScrollView style={{backgroundColor:isDark?colors.dark:colors.light,...styles.container}}>
      <OfflineStatus/>
    <View style={styles.header}>
    <Text style={styles.headerContent}>{title}</Text>
    </View>
    <ScrollView contentContainerStyle={styles.contentContainer}>
        {movies.map(movie => 
               <TouchableWithoutFeedback onPress={()=> navigation.navigate("MovieDetails",{movie,"dark":{isDark}})}>
               <View style={styles.container1}>
                     <Image source={{uri:movie.poster_path?`https://image.tmdb.org/t/p/w500${movie.poster_path}`:"https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"}} style={styles.moreCard}/>
                     {/* <Text style={{color:dark?colors.white:colors.black,...styles.movieName}}>{title?title:name}</Text> */}
               </View>
               </TouchableWithoutFeedback>
          )}
      </ScrollView>
    </ScrollView>
  )
}

export default FullViewScreen;

const styles = StyleSheet.create({
    container : {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height: "100%",
        maxHeight: "100%",
      },
      header : {
        backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
        display:"flex",flexDirection:"row",justifyContent:"center"
      },
      headerContent : {
        color:"white",
        fontSize:35,
        textAlign:"center",
      },
      contentContainer: {
        display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",margin:5,marginBottom:38
      },
      container1:{
        maxWidth:width,
     },
      moreCard : {
        height:180,width:width/3.5,borderRadius:20,marginTop:18,margin:5/*resizeMode:"stretch"*/
      },
})