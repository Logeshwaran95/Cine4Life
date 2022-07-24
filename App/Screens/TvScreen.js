//default apis
import { View, Text ,StyleSheet,StatusBar,Platform,Button,ScrollView,RefreshControl,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect,useCallback}from 'react';

//for api calls
import axios from 'axios';

//required components
import TvCorousel from '../Components/TvCorousel';
import MovieCards from '../Components/MovieCards';
import OfflineStatus from '../Components/OfflineStatus';
import ActivityIndicator from '../Components/ActivityIndicator';

//keys
import {api_key} from '@env';

//color palette
import colors from '../Config/colors';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const MineScreen = ({navigation}) => {

  //state variables
  const [trending,setTrending] = useState([]);
  const [latest,setLatest] = useState([]);
  const [onTheAir,setOnTheAir] = useState([]);
  const [popular,setPopular] = useState([]);
  const [topRated,setTopRated] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const dark = true;
  
  useEffect(()=>{

    Latest();
    OnTheAir();
    Popular();
    TopRated();
    Trending();

  },[]);
  
  //api calls
  const Trending = async() => {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`);
    setTrending(response.data.results);
  }
  const Latest = async() => {
    const response1 = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&language=en-US&page=1`);
    const response2 = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&language=en-US&page=2`);
    const response3 = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&language=en-US&page=3`);
    setLatest([...response1.data.results,...response2.data.results,...response3.data.results]);
  }
  const OnTheAir = async() => {
    const response1 = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=1`);
    const response2 = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=2`);
    const response3 = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=3`);
    setOnTheAir([...response1.data.results.filter(item => item.poster_path!=null),...response2.data.results.filter(item => item.poster_path!=null),...response3.data.results.filter(item => item.poster_path!=null)]);
  }
  const Popular = async() => {
    const response1 = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`);
    const response2 = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=2`);
    const response3 = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=3`);
    setPopular([...response1.data.results.filter(item => item.poster_path!=null),...response2.data.results.filter(item => item.poster_path!=null),...response3.data.results.filter(item => item.poster_path!=null)]);
  }
  const TopRated = async() => {
    const response1 = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`);
    const response2 = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=2`);
    const response3 = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=3`);
    setTopRated([...response1.data.results.filter(item => item.poster_path!=null),...response2.data.results.filter(item => item.poster_path!=null),...response3.data.results.filter(item => item.poster_path!=null)]);
  }

  //refresh function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
       <ActivityIndicator visible={isLoading}/>
      <OfflineStatus/>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
      {/* <View style={styles.header}>
      <Text style={styles.headerContent}>TV   <MaterialCommunityIcons name="television" size={25}/></Text>
      </View> */}
      <View style={styles.secondaryHeader}>
          <Text style={{color:dark?colors.white:colors.dark,...styles.secondaryHeaderText}}>Airing Today</Text>
          <View style={styles.darkModeBtn}>
        {/* <CustomButton type={dark?"sun-o":"moon-o"} size={30}  style={{height:60,width:60}}/> */}
      </View>
        </View>
      <TvCorousel movies={latest} navigation={navigation} dark={dark}/>
       
      <View style={{marginTop:30}}>
      <View style={styles.titleButtonGrp}>
        <Text style={{color:dark?colors.white:colors.dark,...styles.title}}>Trending</Text>
        <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewAll",{movies:trending,title:"Trending"})}><Text style={styles.viewTitle}>View All</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {trending.map(movie => 
              <MovieCards key={movie.id} dark={dark} title={movie.name} url={movie.poster_path} onPress={()=> navigation.navigate("MovieDetails",{movie,dark:dark})}/>
          )}
      </ScrollView>
      </View>

      <View style={{marginTop:30}}>
      <View style={styles.titleButtonGrp}>
        <Text style={{color:dark?colors.white:colors.dark,...styles.title}}>On The Air</Text>
        <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewAll",{movies:onTheAir,title:"On The Air"})}><Text style={styles.viewTitle}>View All</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {onTheAir.map(movie => 
              <MovieCards key={movie.id} dark={dark} title={movie.name} url={movie.poster_path} onPress={()=> navigation.navigate("MovieDetails",{movie,"dark":{dark}})}/>
          )}
      </ScrollView>
      </View>
      
      <View style={{marginTop:30}}>
      <View style={styles.titleButtonGrp}>
        <Text style={{color:dark?colors.white:colors.dark,...styles.title}}>Popular</Text>
        <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewAll",{movies:popular,title:"Popular"})}><Text style={styles.viewTitle}>View All</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {popular.map(movie => 
              <MovieCards key={movie.id} dark={dark} title={movie.name} url={movie.poster_path} onPress={()=> navigation.navigate("MovieDetails",{movie,"dark":{dark}})}/>
          )}
      </ScrollView>
      </View>
      

      <View style={{marginTop:30}}>
      <View style={styles.titleButtonGrp}>
        <Text style={{color:dark?colors.white:colors.dark,...styles.title}}>Top Rated</Text>
        <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate("ViewAll",{movies:topRated,title:"Top Rated"})}><Text style={styles.viewTitle}>View All</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        {topRated.map(movie => 
              <MovieCards key={movie.id} dark={dark} title={movie.name} url={movie.poster_path} onPress={()=> navigation.navigate("MovieDetails",{movie,"dark":{dark}})}/>
          )}
      </ScrollView>
      </View>

      </ScrollView>
    </View>
  )
}

export default MineScreen;

const styles = StyleSheet.create({
  container : {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    maxHeight: '100%',
    backgroundColor:colors.dark
  },
  header : {
    backgroundColor: colors.primary,
  },
  headerContent : {
    color:"white",
    fontSize:25,
    textAlign:"center",
  },
  title: {
    fontSize: 25,
    marginLeft:20,
    marginTop:10
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
    fontSize:30,
    paddingTop:20,
    marginHorizontal:20
  },
  titleButtonGrp:{
    display:"flex",flexDirection:"row",justifyContent:"space-between"
  },
  viewBtn:{
    height:40,width:90,margin:10,borderRadius:18,backgroundColor:colors.secondary,justifyContent:"center",alignItems:"center"
  },
  viewTitle:{
    fontSize:20,color:colors.white,textAlign:"center"
  }
})
