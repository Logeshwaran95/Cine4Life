//default apis
import { View, Text ,StyleSheet,StatusBar,Platform,ScrollView, TouchableNativeFeedback, Image,Dimensions} from 'react-native';
import React, { useEffect,useState } from 'react';

//components
import Rating from '../Components/Rating';
import CircularProgress from 'react-native-circular-progress-indicator';
import ActivityIndicator from '../Components/ActivityIndicator';
import LottieView from "lottie-react-native";

//api calls
import axios from 'axios';

//icons
import {MaterialCommunityIcons} from '@expo/vector-icons';

//color palette
import colors from '../Config/colors';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';

//keys
import {api_key} from '@env';

const {height,width} = Dimensions.get('window');

const FilterResults = ({route,navigation}) => {
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    const [empty,setEmpty] = useState(false);

    useEffect(() => {
         getSearchResults();
    },[])

    const query = route.params.search.search;
    console.log(query);

    const isDark = true;

    const getSearchResults = async() => {
      setLoading(true);
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`);
      if(response.data.results.length === 0){
        setEmpty(true);
      }
      setMovies(response.data.results);
      setLoading(false);
    }
    

  return (
    <View style={{backgroundColor:isDark?colors.dark:colors.light,...styles.container}}>
       <ActivityIndicator visible={loading}/>
       <OfflineStatus/>
       {empty===true? <View style={styles.overlay}>
           {/* <Text>No Results Found !!</Text> */}
           <LottieView
        autoPlay
        loop
        source={require("../animation/noresults.json")}
      />
        </View>:null}
        
      <View style={styles.header}>
      <Text style={styles.headerContent}>Results <MaterialCommunityIcons name="movie" size={30}/></Text>
      </View>
      {/* base view */}
      <View style={{margin:10,maxHeight:height/1.139}}>
        
      <ScrollView>
        {movies.map(movie => 
        <TouchableNativeFeedback onPress={()=> movie.gender?navigation.push("CastDetails",{"id":movie.id,isDark}):navigation.navigate("MovieDetails",{movie,"dark":{isDark}})}>
              <View>
               <Image source={{uri:`https://image.tmdb.org/t/p/w500${movie.gender?movie.profile_path:movie.poster_path}`}} style={styles.image}/>
              <View style={styles.outline}>
                  <View style={styles.textContainer}>
                  {/* <Text style={styles.movieTitle}>{movie.gender?movie.name:null}</Text>   */}
                  <Text style={styles.movieTitle}>{movie.media_type=="tv" || movie.gender?movie.name:movie.title}</Text>
                  <Text style={styles.info}>Popularity : {movie.popularity}</Text>

                  {movie.gender? <Text style={styles.info}>Gender : {movie.gender==2?"Male":"Female"}</Text> :null}
                  {movie.gender? 
                  <View style={{marginTop:5}}>
                                 <CircularProgress
                                   value={movie.popularity?movie.popularity:0}
                                   radius={35}
                                   maxValue={100}
                                   duration={2500}
                                   inActiveStrokeColor={'#2ecc71'}
                                   inActiveStrokeOpacity={0.2}
                                   textColor={isDark?colors.white:colors.dark}
                                   textStyle={{marginLeft:50}}
                                   valueSuffix={' %'}
                                  //  titleStyle={{fontSize:15}}
                                   title={'Popularity'}
                                   titleStyle={{marginLeft:50}}
                                   // subtitle={"Currently"}
                                   // subtitleStyle={{fontSize:22,color:isDark?colors.black:colors.white}}
                                 />
                                 </View>
                                 :null             
                                              }

                  {/* <Text style={styles.info}>Vote Count : {movie.vote_count}</Text> */}
                  {!movie.gender? <View style={styles.rating}>
                  <Rating rate={movie.vote_average}/>
                  </View> : null}
                  
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

export default FilterResults;

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
      marginTop:3,
      fontSize:13,
      color:colors.white,
  },
  rating : {
      marginTop:-5,
      marginRight:38,
  },
  overlay: {
    position: "absolute",
    backgroundColor: colors.primary,
    height: "100%",
    opacity: 0.8,
    marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: "100%",
    zIndex: 1,
  },
})
