//default apis
import { View, Text,StyleSheet,Platform,StatusBar, ScrollView, TouchableOpacity,Dimensions ,Image} from 'react-native';
import React, { useEffect, useState } from 'react';

//searchbar
import { SearchBar } from 'react-native-elements';

//color palette
import colors from '../Config/colors'

//other components
import CustomButton from '../Components/CustomButton';
import IconBatch from '../Components/IconBatch';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import OfflineStatus from '../Components/OfflineStatus';

//for api calls
import axios from 'axios';

//keys
import {api_key} from '@env';

//getting screen dimensions
const {width,height} = Dimensions.get('window');

const SearchAndFilterScreen = ({navigation}) => {
  
  const [keyword, setKeyword] = useState([]);
  const [search, setSearch] = useState("");
  const [genres,setGenres] = useState([]);
  const year = [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990];
  const isDark = true;
  const dark =true;


  useEffect(() => {
    getAllGenre();
  },[]);

  const updateSearch = (search) => {
    setSearch(search);
    getSuggestion(search);
  };
  
  //api calls
  const getAllGenre = async() => {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`);
    setGenres(response.data.genres);
  }

  const getSuggestion = async(query) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`);
    setKeyword(response.data.results);
    console.log(keyword);
  }
  
  return (
    <View style={{backgroundColor:isDark?colors.dark:colors.light,...styles.container}}>
         <OfflineStatus/>
        <View style={styles.header}>
          <MaterialCommunityIcons name="movie-search-outline" size={38} color={colors.light} style={{margin:8}}/>
          <Text style={styles.headerContent}>Search And Filter</Text>
        </View>

        <View style={styles.searchBar}>
        <View style={styles.view}>
      <SearchBar
        placeholder="Search Movies, Series, Actors..."
        onChangeText={updateSearch}
        onEndEditing = {(e) => getSuggestion(e)}
        value={search}
        inputContainerStyle={{ backgroundColor: colors.light,height:30}}
        placeholderTextColor="gray"
        containerStyle={{ backgroundColor: colors.light,marginHorizontal:20}}
        inputStyle={{}}
        showLoading={true}
        onClear={() => setKeyword([])}
        onSubmitEditing={() => navigation.navigate("FilterResults",{ search: {search} })}
      />
       
    
       {keyword? 
       <View >
        {keyword.map((movie) =>

              <TouchableOpacity onPress={()=> movie.profile_path?navigation.push("CastDetails",{"id":movie.id,isDark}):navigation.navigate("MovieDetails",{movie,dark:dark})} style={styles.suggestion} >
              
             <Text onPress={()=> navigation.navigate("MovieDetails",{movie,dark:dark})} style={{fontSize:20,color:"white",maxWidth:width/1.4 }}>{movie.title?movie.title:movie.name}</Text>
             <Image source={{uri:`https://image.tmdb.org/t/p/w500${movie.poster_path?movie.poster_path:movie.profile_path}`}} style={{width:45,height:45,borderRadius:10,resizeMode:"contain"}}/>
        
             </TouchableOpacity> 

        )}
       </View>:null
       }
    
    </View>


        </View>
        <View style={styles.filter}>
          <CustomButton type="filter" style={{height:60,width:60,margin:30}}/> 
          <Text style={{color:isDark?colors.white:colors.black,...styles.filterTitleContent}}>Filters</Text>
        </View>
        <View style={styles.categoryContainer}>
        <View>
          <Text style={{color:isDark?colors.white:colors.black,...styles.categoryTitle}}>Categories</Text>
        </View>
        <ScrollView horizontal={true}>
        {genres.map(genre =>
          <IconBatch  title={genre.name} onPress={() => navigation.navigate("genreResults",{genre,"dark":true})}/>
          )}
        </ScrollView>
        </View>
        <View style={styles.Selectyear}>
        <Text style={{color:isDark?colors.white:colors.black,...styles.yearTitle}}>Filter By Year</Text>
        <ScrollView horizontal={true}>
        {year.map(year =>
          <IconBatch  title={year} onPress={() => navigation.navigate("yearResults",{year,dark:isDark})} />
          )}
        </ScrollView>
        </View>
    </View>
  )
}

export default SearchAndFilterScreen;

const styles = StyleSheet.create({
    container : {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1,
    },
    header : {
      backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,
      display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",
    },
    headerContent : {
      color:"white",
      fontSize:25,
      textAlign:"center",
    },
    searchBar : {
      marginTop:30
    },
    filter : {
      display: 'flex',
      flexDirection: 'row',
    },
    filterTitleContent : {
      marginTop:25,
      fontSize:30
    },
    categoryContainer:{
      marginTop:-35,
      marginLeft:5,
    },
    categoryTitle : {
      fontSize:25,
      margin:10
    },
    view: {
      margin: 10,
    },
    yearTitle:{
      fontSize:25,
      marginLeft:15
    },
    Selectyear:{
      marginTop:18,
      marginLeft:5
    },
    suggestion:{
      margin:10,backgroundColor:colors.primary,borderRadius:10,padding:10,
      display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",
    }
})