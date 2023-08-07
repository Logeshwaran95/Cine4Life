//default apis
import { View, Text ,Button,StyleSheet,StatusBar,Platform,ScrollView, Dimensions, TouchableNativeFeedback, Image, FlatList,Animated, TouchableWithoutFeedback} from 'react-native'
import React,{useRef,useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context'

//required components
import Rating from '../Components/Rating';

//icons
import {MaterialCommunityIcons} from '@expo/vector-icons';

//color palette
import colors from '../Config/colors';

//other components
import MaskedView from '@react-native-community/masked-view';
import Svg,{Rect} from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomButton from '../Components/CustomButton';
import ActivityIndicator from '../Components/ActivityIndicator';

//firebase apis
import { db ,auth} from '../Config/firebase';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';
import { TouchableOpacity } from 'react-native-web';

//getting screen dimensions
const {width,height} = Dimensions.get('window');

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SPACING = 10;
const ITEM_SIZE = width*0.72;
const SPACER_ITEM_SIZE = (width-ITEM_SIZE)/2;
const BACKDROP_HEIGHT = height*0.6;

const Backdrop = ({movies,scrollX}) => {
  return(
    <View style={{position:"absolute",width,height:BACKDROP_HEIGHT}}>
     <FlatList
     data={movies}
     keyExtractor={(item)=>item.key}
     renderItem={({item,index})=>{

      const inputRange = [
        (index-2)*ITEM_SIZE,
        (index-1)*ITEM_SIZE,
      ]
      const translateX = scrollX.interpolate({
        inputRange,
        outputRange:[-width,0],
      })
       return (
         <MaskedView style={{position:'absolute'}}
         maskElement={
           <AnimatedSvg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{transform:[{translateX}]}}>
             <Rect
             x='0'
             y='0'
             width={width}
             height={height}
             fill="red"
             />
             </AnimatedSvg>
         }
         > 
           <Image source={{uri:`https://image.tmdb.org/t/p/w500/6qkeXdIEwqOuOWuxsomwnin2RdD.jpg`}} style={{width,height:100,resizeMode:'cover'}}/>
         </MaskedView>
       )
     }}
     />
     <LinearGradient colors={['transparent',colors.primary]} style={{width,height:BACKDROP_HEIGHT,position:'absolute',bottom:0}}/>
    </View>
  )
}

const FavouritesScreen = ({route,navigation}) => {
    // console.log(route.params.movies);
    const path = route.params.path;
    // // const moviesDemo = route.params.movies;
    const [alert,setAlert] = useState(false);
    const isDark = true;
    const scrollX = useRef(new Animated.Value(0)).current;
    const [movies,setMovies] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [removed,setRemoved] = useState("");
    const userId = auth.currentUser?.uid;
    let data;
    let mainData = [];
    
    React.useEffect(()=>{
      // getFav();
      
      readFromFav();
      
    
    },[]);


    const readFromFav = () => {
      setIsLoading(true);
      db.ref(`${path}/`+userId+'/').on('value', function (snapshot) {
      // console.log(snapshot.val());
      if(snapshot.val()){
        data = Object.values(snapshot.val()); 
        for(let i=0;i<data.length;i++){
          mainData.push(data[i].movieWithId);
        }
      }
      setMovies([{key:'left-spacer'},...mainData,{key:'right-spacer'}]);
      setIsLoading(false);
      return true;
      // console.log("here is maindata",mainData);
  }); 
  }
    
    const deleteFromFav = (name,title) => {
      
      console.log("delete from fav is ",name);
      db.ref(`${path}/`+ userId+'/'+name).remove().then((data)=>{
      //success callback
      console.log('data ' , data)
      setRemoved(title);
      setAlert(true);
      readFromFav();
      setMovies([{key:'left-spacer'},...mainData,{key:'right-spacer'}]);
    }).catch((error)=>{
      //error callback
      console.log('error ' , error)
    })

    
    }
    let icon;
    if(path === "favourites"){
      icon="heart";
    }
    if(path === "watchlist"){
      icon="eye";
    }
    if(path === "watched"){
      icon="eye-check";
    }
    // const name = movie.first_air_date?moreInfo.original_name:(!moreInfo.title?moreInfo.name:moreInfo.title);
  

  return (
    <SafeAreaView style={{backgroundColor:isDark?colors.dark:colors.light,...styles.container}}>
      <OfflineStatus/>

      
      <View style={styles.header}
      
      >

      <MaterialCommunityIcons name={icon} size={38} color={colors.light} style={{margin:8}}
      />
      {/* <Text style={styles.headerContent}
      onPress={
        () => navigation.navigate("ViewAll",{movies:movies,title:`My ${path}`})
      }
      >My {path}</Text> */}
      <TouchableWithoutFeedback>
  <Text style={styles.headerContent}>My {path}</Text>
</TouchableWithoutFeedback>
      
      </View>
  

      <ActivityIndicator visible={isLoading}/>
      <Backdrop movies={movies} scrollX={scrollX}/>
      <Animated.FlatList
      showsHorizontalScrollIndicator={false}
      data={movies}
      keyExtractor={(item)=>item.key}
      horizontal
      contentContainerStyle={{alignItems:'center'}}
      snapToInterval={ITEM_SIZE}
      decelerationRate={0}
      bounces={false}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {x: scrollX}}}],
        {useNativeDriver: true},
      )}
      scrollEventThrottle={16}

      renderItem={({item,index})=> {
        const movie=item;
        if(!item.poster_path){
          return <View style={{width:SPACER_ITEM_SIZE}}/>
        }
        const inputRange = [
          (index-2)*ITEM_SIZE,
          (index-1)*ITEM_SIZE,
          (index)*ITEM_SIZE
        ];
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange:[0,-50,0],
        })
        return (
          <TouchableWithoutFeedback 
          onLongPress={
            ()=> navigation.navigate("ViewAll",{movies:movies,title:`My ${path}`})
          }
          onPress={() => navigation.navigate("MovieDetails",{movie})}>
          
          <View style={{width:ITEM_SIZE}}>
          <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}} style={{height:200,width:280,zIndex:-2,resizeMode:"contain"}}/>
            <Animated.View style={{marginHorizontal:SPACING,padding:SPACING*2,alignItems:'center',borderRadius:34,backgroundColor:colors.dark,transform:[{translateY}]}}>
              <Image source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={styles.posterImage}/>
               
              <Text style={{fontSize:24,color:"white"}} numberOfLines={1}>
                {!item.title?item.name:item.title}
              </Text>
              <Rating rate={movie.vote_average}/>
              {/* <Text style={{fontSize:12,color:"white",marginTop:15}} numberOfLines={3}>
                {item.overview}
              </Text> */}
              <AwesomeAlert
                show={alert}
                showProgress={false}
                title= " !!!"
                message={`${removed} Removed from ${path} !`}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                // showCancelButton={true}
                showConfirmButton={true}
                // cancelText="No, cancel"
                confirmText="Confirm"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                  setAlert(false);
                }}
                onConfirmPressed={() => {
                  setAlert(false);
                }}
              />


          </Animated.View>
          
          <CustomButton type="trash-o" size={30} style={{height:60,width:60,marginLeft:width/3.5}} 
               onPress={() => deleteFromFav(item.id,!item.title?item.name:item.title)} 
                />

          

          </View>
          
          </TouchableWithoutFeedback>
        )
        }}
      />
    
    </SafeAreaView>
  )
}

export default FavouritesScreen;

const styles = StyleSheet.create({
  container : {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
      letterSpacing: 1,
      textAlign:"center",
  },
  posterImage : { //actual height 280
    height:height/3,width:220,borderRadius:15,marginTop:0,margin:10,resizeMode:"contain"
  },
  outline : {
    height:190,width:"95%",backgroundColor:colors.secondary,marginTop:-190,zIndex:-2,marginHorizontal:10,
    borderRadius:15,
  },
  textContainer : {
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      marginLeft:180,
      marginTop:20,    
  },
  movieTitle: {
      fontSize:25,
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
