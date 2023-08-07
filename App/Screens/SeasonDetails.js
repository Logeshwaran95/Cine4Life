//default apis
import { View, Text ,Button,StyleSheet,StatusBar,Platform,ScrollView, TouchableNativeFeedback, Image,Dimensions} from 'react-native'
import React, {useState} from 'react';

//color palette
import colors from '../Config/colors';

//other components
import {MaterialCommunityIcons} from '@expo/vector-icons';
import OfflineStatus from '../Components/OfflineStatus';

//geting screen dimensions
const {width,height} = Dimensions.get('window');

const FavouritesScreen = ({route,navigation}) => {
  const tv = route.params.tv;
  const tvName = route.params.name;
  const season_number = route.params.seasonNumber;
  const tvId = route.params.tv.id;

  const [images,setImages] = useState([]);

  // console.log(tvId,season_number);
  const isDark = true;

  // useEffect(()=>{
  //   getImages();
  // },[]);

  // const getImages = async () => {
  //   try {
  //     const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${season_number}/images?api_key=a50228dd8f8b42687b37555ace8c60cc&language=en-US`);
  //     setImages(response.data.posters);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
//  console.log(tv.poster_path);
  return (
    <View style={{backgroundColor:isDark?colors.dark:colors.light,...styles.container}}>
      <OfflineStatus/>
      <View style={styles.header}>
      <MaterialCommunityIcons name="plus-circle" size={38} color={colors.light} style={{margin:8}}/>
      <Text style={styles.headerContent}>{tv.name} </Text>
      </View>

      {/* base view */}
      <View style={{margin:10,maxHeight:height/1.13}}>
      <ScrollView >
          <View style={{height:"100%"}}>

          <TouchableNativeFeedback >
           <Image source={{uri:tv.poster_path?`https://image.tmdb.org/t/p/w500${tv.poster_path}`:"https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"}} style={styles.image}/>
          </TouchableNativeFeedback>

          <View style={styles.outline}>
              <View style={styles.textContainer}>
              <Text style={styles.movieTitle}>{tvName} </Text>
              {tv.overview? 
              <View>
              <Text style={styles.overview}>Overview</Text>
              <Text style={styles.info}>{tv.overview}</Text> 
              </View>
              :null 
            }
              
              <Text style={styles.info}>Episode Count : {tv.episode_count}</Text>
              <Text style={styles.info}>Release Date : {tv.air_date}</Text>
             </View>

             {/* <Text style={{marginTop:30,...styles.movieTitle}}>Images</Text>
              <ScrollView horizontal={true}>
              {images?.map(image => 
                <Image source={{uri:`https://image.tmdb.org/t/p/w500${image.file_path}`}} style={{width:width-85,height:380,margin:8,borderRadius:20}}/>
              )}
               </ScrollView> */}

          </View>
          
          
               
          </View>
      </ScrollView>
      </View>
    </View>
  )
}

export default FavouritesScreen;

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
    fontSize:22,
    fontWeight:"bold",
    fontStyle:"italic",
    textAlign:"center",
  },
  image : {
    height:200,width:140,borderRadius:15,marginTop:18,margin:15,marginLeft:30
  },
  outline : {
    height:"100%",width:"95%",backgroundColor:colors.secondary,marginTop:-190,zIndex:-2,marginHorizontal:10,
    borderRadius:15,marginBottom:100
  },
  textContainer : {
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      marginLeft:20,
      marginTop:190,    
  },
  movieTitle: {
      fontSize:24,
      fontWeight:"bold",
      letterSpacing:1,
      color:colors.white,
  },
  overview : {
      marginTop:18,
      fontSize:20,
      fontWeight:"500",
      letterSpacing:1,
      color:colors.white,
  },

  info : {
      marginRight:30,marginTop:15,
      fontSize:16,
      color:colors.white,letterSpacing:1,lineHeight:25,
      textTransform:"capitalize",
  },
  rating : {
      marginTop:-5,
      marginRight:38,
  }
})
