//default apis
import { View, Text,StyleSheet,ScrollView ,StatusBar,TouchableNativeFeedback,Image,Dimensions} from 'react-native'
import React, { useEffect,useState } from 'react'

//api calls
import axios from 'axios';

//color palette
import colors from '../Config/colors';

//other components
import Rating from '../Components/Rating';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActivityIndicator from '../Components/ActivityIndicator';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';

//keys
import {api_key} from '@env';

const {height,width} = Dimensions.get('window');

const YearResults = ({route,navigation}) => {
    const year = route.params.year;
    console.log(year);
    const isDark=true;
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        getMovieByYear();
    },[]);
     
    const getMovieByYear = async() => {
        setLoading(true);
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=${year}&with_watch_monetization_types=flatrate`);
        setMovies(response.data.results);
        setLoading(false);
    }

  return (
    <View style={{backgroundColor:isDark?colors.dark:colors.light,...styles.container}}>
     <ActivityIndicator visible={loading}/>
     <OfflineStatus/>
    <View style={styles.header}>
    <Text style={styles.headerContent}>Popular in {year} <MaterialCommunityIcons name="movie" size={30}/></Text>
    </View>
    {/* base view */}
    <View style={{margin:10,maxHeight:height/1.139}}>
    <ScrollView>
      {movies.map(movie => 
      <TouchableNativeFeedback onPress={()=> navigation.navigate("MovieDetails",{movie,dark:{isDark}})}>
            <View>
             <Image source={{uri:`https://image.tmdb.org/t/p/w500${movie.poster_path}`}} style={styles.image}/>
            <View style={styles.outline}>
                <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{movie.media_type=="tv" || movie.gender?movie.name:movie.title}</Text>
                <Text style={styles.info}>Popularity : {movie.popularity}</Text>
                <View style={styles.rating}>
                <Rating rate={movie.vote_average}/>
                </View>
            </View>
            </View>
            </View>
             </TouchableNativeFeedback>
      )}
        
    </ScrollView>
    </View>
  </View>
  )
}

export default YearResults;

const styles = StyleSheet.create({
    container : {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      height: "100%",
      // backgroundColor:colors.dark,
      maxHeight: "100%",
    },
    header : {
      backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
    },
    headerContent : {
      color:"white",
      fontSize:35,
      textAlign:"center",
    },
    image : {
      height:200,width:140,borderRadius:15,marginTop:18,margin:15,marginLeft:30
    },
    outline : {
      height:190,width:"95%",backgroundColor:colors.secondary,marginTop:-190,zIndex:-2,marginHorizontal:10,
      borderRadius:15,
    },
    textContainer : {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
      //   alignSelf:"flex-end",
      //   alignItems:"center",
      //   margin:20,
        marginLeft:180,
        marginTop:20,    
    },
    movieTitle: {
        fontSize:20,
        color:colors.white,
    },
    info : {
        marginRight:30,
        fontSize:13,
        color:colors.white,
    },
    rating : {
        marginTop:-5,
        marginRight:38,
    }
  })