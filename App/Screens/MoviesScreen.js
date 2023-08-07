//default react Apis
import { View, Text,StyleSheet ,ScrollView,RefreshControl,TouchableOpacity,Dimensions} from 'react-native';
import {React,useEffect,useState,useCallback} from 'react';

//for api calls
import axios from 'axios';

//required components
import AppBar from '../Components/AppBar';
import MovieCards from '../Components/MovieCards';
import CustomButton from '../Components/CustomButton';
import Corousel from '../Components/Corousel';
import OfflineStatus from '../Components/OfflineStatus';
import ActivityIndicator from '../Components/ActivityIndicator';
import Constants from 'expo-constants';

//color palette
import colors from '../Config/colors';

//notifications 
import * as Notifications from 'expo-notifications';

//firebase apis
import {db,auth} from '../Config/firebase';

//getting screen dimensions
const {width,height} = Dimensions.get('window');

//keys
import {api_key} from '@env';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const MoviesScreen = ({navigation}) => {
  
  //state variables
  const [movies,setMovies] = useState([]);
  const [popular,setPopular] = useState([]);
  const [topRated,setTopRated] = useState([]);
  const [upcoming,setUpcoming] = useState([]);
  const [nowPlaying,setNowPlaying] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dark,setDark]  = useState(true);
  const [isLoading,setIsLoading] = useState(false);

  const userId = auth.currentUser?.uid;
  const email = auth.currentUser?.email;
  const name = auth.currentUser?.displayName;

  useEffect(()=>{
    
    setIsLoading(true);
    NowPlaying();
    Trending();
    Popular();
    TopRated();
    Upcoming();
    registerForPushNotificationsAsync();
    setIsLoading(false);

  },[]);
  
  const addUserToDatabase = async (token) => {
    db.ref('users/'+ userId).set({
      email:email,
      name:name?name:'Not Defined',
      userId:userId,     
      notificationToken:token,
    })
  }

  //api calls
  const Trending = async() => {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&language=en-US&page=1`);
    setMovies([...response.data.results.filter(item => item.poster_path!=null)])
  }
  const Popular = async() => {
    const response1 = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`);
    setPopular([...response1.data.results.filter(item => item.poster_path!=null)]);
  }
  const TopRated = async() => {
    const response1 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`);
    setTopRated([...response1.data.results.filter(item => item.poster_path!=null)]);
  }
  const Upcoming = async() => {
    const response1 = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`);
    setUpcoming([...response1.data.results.filter(item => item.poster_path!=null)]);
  }
  const NowPlaying = async() => {
    const response1 = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`);
    setNowPlaying([...response1.data.results.filter(item => item.poster_path!=null)]);
  }

  //refresh control for pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      saveToken(token);
      addUserToDatabase(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  const saveToken = (token) => {
      db.ref('tokens/'+ userId ).set({
        token,
    }).then((data)=>{
      console.log('data ' , data)
    }).catch((error)=>{
      console.log('error ' , error)
    })
  }
  
  return (
    <View style={{backgroundColor:dark?colors.dark:colors.light,...styles.container}}>
      <ActivityIndicator visible={isLoading}/>
      <OfflineStatus/>
      <AppBar  onPress1={()=> navigation.navigate("Favourites",{path:"favourites",dark:dark})} onPress2={() => navigation.navigate("Account")} />
      <ScrollView 
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        <View style={styles.secondaryHeader}>
          <Text style={{color:dark?colors.white:colors.dark,...styles.secondaryHeaderText}}
          onPress={
            () => navigation.navigate("FilterEnabler",{
              url:`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US`  
              ,title:"Now Playing",dark:dark})
          }
          >Now Playing</Text>
          <View style={styles.darkModeBtn}>
        {/* <CustomButton type={dark?"sun-o":"moon-o"} size={30} style={{height:60,width:60}} /> */}
      </View>
        </View>
      <Corousel movies={nowPlaying} navigation={navigation} dark={dark}/>

      {/* base view */}
      <View style={{marginTop:30}}>
        <View style={styles.titleButtonGrp}>
        <Text style={{color:dark?colors.white:colors.dark,...styles.title}}
        onPress={() => navigation.navigate("FilterEnabler",{url:`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&language=en-US`,title:"Latest and Trending",dark:dark})}
        >Latest and Trending</Text>
        {/* <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewAll",{movies,title:"Latest and Trending",dark:dark})}><Text style={styles.viewTitle}>View All</Text></TouchableOpacity> */}
        </View>
      <ScrollView horizontal={true}
      style={styles.scroll}
      >
        {movies.map(movie => 
              <MovieCards key={movie.id}  dark={dark} title={movie.title} name={movie.name} url={movie.poster_path} onPress={()=> navigation.navigate("MovieDetails",{movie,dark:dark})}/>
          )}
      </ScrollView>
      </View>
       
       {/* base view */}
      <View style={{marginTop:30}}>
      <View style={styles.titleButtonGrp}>
        <Text style={{color:dark?colors.white:colors.dark,...styles.title}}
        onPress={() => navigation.navigate("FilterEnabler",{url: 
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US`
          ,title:"Popular"})}
        >Popular</Text>
        {/* <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewAll",{movies:popular,title:"Popular"})}><Text style={styles.viewTitle}>View All</Text></TouchableOpacity> */}
        </View>
      <ScrollView horizontal={true}
      style={styles.scroll}
      >
        {popular.map(movie => 
              <MovieCards key={movie.id} dark={dark} title={movie.title} name={movie.name} url={movie.poster_path} onPress={()=> navigation.navigate("MovieDetails",{movie,dark:dark})}/>
          )}
      </ScrollView>
      </View>

      {/* base view */}
      <View style={{marginTop:30}}>
      <View style={styles.titleButtonGrp}>
        <Text style={{color:dark?colors.white:colors.dark,...styles.title}}
         onPress={() => navigation.navigate("FilterEnabler",{
          url:`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US`
          ,title:"Top Rated"})}
        >Top Rated</Text>
        {/* <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewAll",{movies:topRated,title:"Top Rated"})}><Text style={styles.viewTitle}>View All</Text></TouchableOpacity> */}
        </View>
      <ScrollView horizontal={true}
      style={styles.scroll}
      >
        {topRated.map(movie => 
              <MovieCards key={movie.id} dark={dark} title={movie.title} name={movie.name} url={movie.poster_path} onPress={()=> navigation.navigate("MovieDetails",{movie,dark:dark})}/>
          )}
      </ScrollView>
      </View>
       
       {/* base view */}
      <View style={{marginTop:30,marginBottom:35}}>
      <View style={styles.titleButtonGrp}>
        <Text style={{color:dark?colors.white:colors.dark,...styles.title}}
        onPress={() => navigation.navigate("FilterEnabler",{
          url:`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US`
          ,title:"Upcoming"})}
        >Upcoming</Text>
        {/* <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewAll",{movies:upcoming,title:"Upcoming"})}><Text style={styles.viewTitle}>View All</Text></TouchableOpacity> */}
      </View>
      <ScrollView horizontal={true}
      style={styles.scroll}
      >
        {upcoming.map(movie => 
              <MovieCards key={movie.id} dark={dark} title={movie.title} name={movie.name} url={movie.poster_path} onPress={()=> navigation.navigate("MovieDetails",{movie,dark:dark})}/>
          )}
      </ScrollView>
      </View>

      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      maxHeight: '100%',
    },
    title: {
      fontSize: 23,
      marginLeft:20,
      marginTop:10,
      fontWeight:"bold",letterSpacing:1
    },
    darkModeBtn : {
      marginTop:30,
      alignItems:'flex-end',
      margin:10,
      height:2,
    },
    secondaryHeader : {
      display:'flex',
      justifyContent:'space-between',
      flexDirection:'row',
    },
    secondaryHeaderText : {
      fontSize:26,
      fontWeight:"bold",
      letterSpacing:1,
      paddingTop:20,
      marginHorizontal:20
    },
    scroll:{
      marginLeft:10,
    },  
    titleButtonGrp:{
      display:"flex",flexDirection:"row",justifyContent:"space-between"
    },
    viewBtn:{
      height:40,width:width/4,margin:10,borderRadius:18,backgroundColor:colors.secondary,justifyContent:"center",alignItems:"center"
    },
    viewTitle:{
      fontSize:20,color:colors.white,textAlign:"center"
    }
});

export default MoviesScreen;