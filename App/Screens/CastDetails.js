//default apis
import { View, Text ,StyleSheet,StatusBar,Platform,ScrollView, TouchableNativeFeedback, Image,Dimensions} from 'react-native'
import React ,{useState,useEffect}from 'react';
import {SafeAreaView} from 'react-native-safe-area-context'

//required components
import MovieCards from '../Components/MovieCards';

//for circular progress
import CircularProgress from 'react-native-circular-progress-indicator';

//for api calls
import axios from 'axios';

//color palette
import colors from '../Config/colors';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';

//keys
import {api_key} from '@env';

const {width,height} = Dimensions.get('window');

const FavouritesScreen = ({route,navigation}) => {

  //state variables
  const [personDetail,setPersonDetail] = useState([]);
  const [movies,setMovies] = useState([]);
  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(false);

  const person_id = route.params.id;

  const isDark = true;

    useEffect(()=> {
        getDetails();
        getMovieCredits();
        getImages();
    },[]);
    
    //api calls
    const getDetails = async() => {
       
        const response = await axios.get(`https://api.themoviedb.org/3/person/${person_id}?api_key=${api_key}&language=en-US`);
        setPersonDetail(response.data);
     
    }
    const getMovieCredits = async() => {
      
      const response = await axios.get(`https://api.themoviedb.org/3/person/${person_id}/combined_credits?api_key=${api_key}&language=en-US`);
      setMovies(response.data.cast);
    
    } 
    const getImages = async() => {
   
      const response = await axios.get(`https://api.themoviedb.org/3/person/${person_id}/images?api_key=${api_key}&language=en-US`);
      setImages(response.data.profiles);
     
    }

  return (
    <SafeAreaView style={{backgroundColor:isDark?colors.dark:colors.light,...styles.container}}>
       {/* <ActivityIndicator visible={loading}/> */}
       <OfflineStatus/>
      <View style={styles.header}>
      <Text style={styles.headerContent}>{personDetail.name}</Text>
      </View>
      {/* base view */}
      <View style={{margin:5,maxHeight:height}}>
      <ScrollView>
          <View style={{height:"100%"}}>
          <TouchableNativeFeedback >
           <Image source={{uri:personDetail.profile_path!==null?`https://image.tmdb.org/t/p/w500${personDetail.profile_path}`:"https://i.stack.imgur.com/Pg182.png"}} style={styles.image}/>
          </TouchableNativeFeedback>
          <View style={styles.outline}>
              <View style={styles.textContainer}>
              <Text style={styles.movieTitle}>{personDetail.name} </Text>
              <Text style={styles.info}>Known For : {personDetail.known_for_department}</Text>
              <Text style={styles.info}>Date of Birth : {personDetail.birthday}</Text>
              <View style={{marginTop:20}}>
              <CircularProgress
                value={personDetail.popularity?personDetail.popularity:0}
                radius={45}
                duration={2500}
                inActiveStrokeColor={'#2ecc71'}
                inActiveStrokeOpacity={0.2}
                maxValue={personDetail.popularity>100?200:100}
                textColor={isDark?colors.white:colors.white}
                valueSuffix={'%'}
                title={`Popularity `}
                titleStyle={{fontSize:15}}
              />
              </View>
              
              <View style={{marginTop:15}}>
              <Text style={{marginTop:18,...styles.info}}>Place of Birth : {personDetail.place_of_birth}</Text>
              <Text style={styles.info}>Actual Popularity : {personDetail.popularity} </Text>
              </View>
              

              {images.length !==0 ? 
              <View>
              <Text style={{marginTop:20,...styles.movieTitle}}
              onPress={
                ()=> navigation.push("ImageFullView",{"images":images,"title":`Images of ${personDetail.name}`})
              }
              >Images</Text>
              <ScrollView horizontal={true}>
              {images.map(image => 
                <Image source={{uri:`https://image.tmdb.org/t/p/w500${image.file_path}`}} style={{ height:220,width:140,borderRadius:20,marginTop:18,margin:6}}/>
              )}
               </ScrollView>
               </View> :null}
               
               {movies.length !==0 ?
                <View>
              <Text style={{marginTop:30,...styles.movieTitle}}
              onPress={
                ()=> navigation.push("ViewAll",{"movies":movies,"title":"Movies"})
              }
              >Movies</Text>
              <ScrollView horizontal={true}>
                {movies.map(movie =>
                          <MovieCards key={movie.id} dark={true} title={movie.title} url={movie.poster_path} onPress={()=> {navigation.push("MovieDetails",{movie,"dark":{isDark}})}}/>
                )}
              </ScrollView>
              </View> :null}


               {personDetail.biography? 
                <View>
              <Text style={{marginTop:18,marginBottom:20,...styles.movieTitle}}>Biography</Text>
              <Text style={styles.info}>{personDetail.biography}</Text>
              </View> :null}

          </View>
          </View>
          </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default FavouritesScreen;

const styles = StyleSheet.create({
  container : {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: "100%",
    // backgroundColor:colors.dark,
    maxHeight: "100%",
  },
  header : {
    backgroundColor: colors.dark,
  },
  headerContent : {
    color:"white",
    fontSize:22,
    fontWeight:"bold",
    fontStyle:"italic",
    letterSpacing:1,
    textAlign:"center",
  },
  image : {
    height:200,width:140,borderRadius:15,marginTop:18,margin:15,marginLeft:30,
    
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
      fontSize:22,
      fontWeight:"bold",
      letterSpacing:1,
      color:colors.white,
  },
  info : {
      marginTop:5,
      marginRight:30,
      fontSize:16,
      color:colors.white,
      letterSpacing:1,margin:1,textTransform:"capitalize",lineHeight:25,
  },
  rating : {
      marginTop:-5,
      marginRight:38,
  }
})
