//default apis
import { View, Text,StyleSheet, Image, ScrollView, TouchableOpacity,Button,Dimensions ,Linking} from 'react-native'
import React, { useEffect, useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

//alerts
import AwesomeAlert from 'react-native-awesome-alerts';

//for api calls
import axios from 'axios'

//progreess indicator
import CircularProgress from 'react-native-circular-progress-indicator';

//icons
import {MaterialCommunityIcons} from '@expo/vector-icons';

//required components
import MovieCards from '../Components/MovieCards';
import ReviewCard from '../Components/ReviewCard';
import VideoCard from '../Components/VideoCard';
import CustomButton from '../Components/CustomButton';
import ActivityIndicator from '../Components/ActivityIndicator';

//function to convert To International Currency System
import convertToInternationalCurrencySystem from '../Components/CurrencyConverter';

//firebase database and authentication
import { db,auth } from '../Config/firebase';

//color palette
import colors from '../Config/colors';
import OfflineStatus from '../Components/OfflineStatus';

//keys
import {api_key} from '@env';

const {width,height} = Dimensions.get('window');

const MovieDetailScreen = ({route,navigation}) => {


  const isDark = true;

    //state variables
  const [casting,setCasting] = useState([]);
  const [crew,setCrew] = useState([]);
  const [moreLikeThis,setMoreLikeThis] = useState([]);
  const [moreInfo,setMoreInfo] = useState({});
  const [video,setVideo] = useState([]);
  const [reviews,setReviews] = useState([]);
  const [alert,setAlert] = useState(false);
  const [click,setClicked] = useState("");
  const [trailer,setTrailer] = useState([]);
  const [watchprovider,setWatchprovider] = useState([]);
  const [loading,setLoading] = useState(false);

  //current userid
  const userId = auth.currentUser?.uid;

  const movie = route.params.movie;
  console.log(movie.id);
  useEffect(()=> {
 
       getCastings();
       getCrew();
       getMoreLikeThis();
       getMoreInfo();
       getVideo();
       getTrailer();
       getReviews();
       getWatchProviders();

  },[]);
  
  //api calls  
  const getCastings = async() => {
    try {
      if(movie.first_air_date){
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/credits?api_key=${api_key}&language=en-US`);
        setCasting(response.data.cast);
      }else{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}&language=en-US`);
        setCasting(response.data.cast);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getCrew = async() => {
    try {
      if(movie.first_air_date){
        
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/credits?api_key=${api_key}&language=en-US`);
        setCrew(response.data.crew);
        
      }else{
       
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}&language=en-US`);
        //first filter directors and producers in first orders,followed by others
        setCrew(response.data.crew.filter(
          (data) => data.job==="Director" ));
        
        setCrew(
          crew.concat(response.data.crew.filter(
            (data) => data.job!=="Director" ))
        );
        
        

      }
    } catch (error) {
      console.log(error);
    }
  }

  const getMoreLikeThis = async() => {
    try {
      if(movie.first_air_date){
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/recommendations?api_key=${api_key}&language=en-US&page=1`);
        setMoreLikeThis(response.data.results.filter(item => item.poster_path!=null));
      }else{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${api_key}&language=en-US&page=1`);
        setMoreLikeThis(response.data.results.filter(item => item.poster_path!=null));
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const getMoreInfo = async() => {
    try {
      if(movie.first_air_date){
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}?api_key=${api_key}&language=en-US`);
        setMoreInfo(response.data);

      }else{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_key}&language=en-US`);
        setMoreInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const getTrailer = async() => {
    try {
      if(movie.first_air_date){
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${api_key}&language=en-US`);
        setTrailer(response.data.results.filter(item => item.type === "Trailer"));
      }else{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${api_key}&language=en-US`);
        setTrailer(response.data.results.filter(item => item.type === "Trailer"));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getVideo = async() => {
    try {
      if(movie.first_air_date){
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${api_key}&language=en-US`);
        setVideo(response.data.results.filter(item => item.type !== "Trailer"));
      }else{
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${api_key}&language=en-US`);
        setVideo(response.data.results.filter(item => item.type !== "Trailer"));
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getReviews = async() => {
    try {
      if(movie.first_air_date){
         const response = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/reviews?api_key=${api_key}&language=en-US&page=1`);
          setReviews(response.data.results);
      }else{
         const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${api_key}&language=en-US&page=1`);
         setReviews(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getWatchProviders = async() => {
    try {
      if(movie.first_air_date){
         const response = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/watch/providers?api_key=${api_key}`);
          setWatchprovider(response.data.results["US"]);
      }else{
         const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${api_key}`);
         setWatchprovider(response.data.results["US"]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addToFav = (name) => {

    var movieWithId = {...movie,userId};
    db.ref('favourites/'+ userId+'/'+name).set({
    movieWithId,
  }).then((data)=>{
    setClicked("Favourites");
    setAlert(true);
    console.log('data ' , data)
  }).catch((error)=>{
    console.log('error ' , error)
  })

  }

  const addToWatchList = (name) => {
    
    var movieWithId = {...movie,userId};
    db.ref('watchlist/'+ userId+'/'+name).set({
    movieWithId,
  }).then((data)=>{
    //success callback
    setClicked("Watchlist");
    setAlert(true);
    console.log('data ' , data)
  }).catch((error)=>{
    //error callback
    console.log('error ' , error)
  })

  }
  
  const addToWatched = (name) => {

    var movieWithId = {...movie,userId};
    db.ref('watched/'+ userId+'/'+name).set({
    movieWithId,
  }).then((data)=>{
    //success callback
    setClicked("Watched");
    setAlert(true);
    console.log('data ' , data)
  }).catch((error)=>{
    //error callback
    console.log('error ' , error)
  })

  }


  return (
    <SafeAreaView>
    <ScrollView>
           <ActivityIndicator visible={loading}/>
           <OfflineStatus/>
    <View style={{backgroundColor:isDark?colors.dark:colors.white,height:"100%"}}>
     
      <Image source={{uri:`https://image.tmdb.org/t/p/w500${moreInfo.backdrop_path}`}} style={{height:250}} blurRadius={0}/>

      <View style={styles.group1}>
      <Image source={{uri:`https://image.tmdb.org/t/p/w500${moreInfo.poster_path}`}} style={styles.mainPoster}/>
      
      <View>
      <TouchableOpacity onPress={() => addToWatchList(movie.id)}>
      <MaterialCommunityIcons name="tag" size={40} color={colors.white} style={{alignSelf:"center"}}/>
      </TouchableOpacity>
     
      </View>
      <CustomButton type="heart" size={35} style={{height:80,width:80}} 
       onPress={() => addToFav(movie.id)} 
      />
      </View>
      
      <View style={{marginTop:150,margin:20,height:"100%"}}>

        <Text style={{color:isDark?colors.white:colors.dark,...styles.title}}>{movie.first_air_date?moreInfo.original_name:(!moreInfo.title?moreInfo.name:moreInfo.title)}</Text>
        <Text style={styles.detail1}>Release Date      {movie.first_air_date?moreInfo.first_air_date:moreInfo.release_date}</Text>
 
        <Text style={styles.detail1}>
          Runtime               {movie.first_air_date?moreInfo.episode_run_time:moreInfo.runtime} minutes</Text>
          <View style={styles.genreContainer}>
            {moreInfo.genres?.map((genre) => (
              <TouchableOpacity key={genre.id} style={styles.genreButton}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        {moreInfo.tagline? 
        <Text style={{color:"gray",fontSize:20,marginTop:10,letterSpacing:1,textAlign:"center",fontStyle:"italic"}}>" {moreInfo.tagline} "</Text>
        :null  
      }
        
        <View style={{marginTop:10}}>

          <View style={styles.watchedContainer}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.title}}>
          Already Watched ?
          </Text>
          <TouchableOpacity onPress={() => addToWatched(movie.id)}>
          <MaterialCommunityIcons name="checkbox-marked-circle" size={40} color="white" style={{alignSelf:"center"}}/>
          </TouchableOpacity>
          </View>

        <Text style={{color:isDark?colors.white:colors.dark,marginBottom:10,...styles.recommended}}>User Score</Text>
        
        <CircularProgress
          value={movie.vote_average*10}
          radius={45}
          duration={2500}
          inActiveStrokeColor={'#2ecc71'}
          inActiveStrokeOpacity={0.2}
          textColor={isDark?colors.white:colors.dark}
          valueSuffix={'%'}
          titleStyle={{fontSize:15}}
          title={`Popularity  ${convertToInternationalCurrencySystem(moreInfo.popularity)}`}
        />
         
        </View>
        
        <View style={{marginTop:10}}>
        
        <Text style={styles.detail1}>Status :        {moreInfo.status} </Text>
        {!movie.first_air_date?
        <View>
          <Text style={styles.detail1}>Budget :        {convertToInternationalCurrencySystem(moreInfo.budget)}  </Text>
          <Text style={styles.detail1}>Collection :   {convertToInternationalCurrencySystem(moreInfo.revenue)} </Text>
          </View>
          :null
        }
      
         
        {!movie.first_air_date? 
         <View>
           <Text style={{color:isDark?colors.white:colors.dark,marginTop:10,marginBottom:10,...styles.recommended}}>Performance in Boxoffice</Text>
       
        <CircularProgress
          value={moreInfo.revenue?((moreInfo.revenue/moreInfo.budget)*100):0}
          radius={45}
          maxValue={10000}
          duration={2500}
          inActiveStrokeColor={'#2ecc71'}
          inActiveStrokeOpacity={0.2}
          textColor={isDark?colors.white:colors.dark}
          valueSuffix={' %'}
          titleStyle={{fontSize:15}}
          title={moreInfo.revenue<moreInfo.budget?"Loss":"Gain"}
        />
         </View>  :null
      }
        
        </View>

        <Text style={{color:isDark?colors.white:colors.dark,marginBottom:10,fontWeight:"bold",...styles.overviewtitle}}>Overview</Text>
        <Text style={styles.overview}>{moreInfo.overview}</Text>
        
        {casting.length!==0? 
        <View style={styles.recommendations}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.recommended}}
        onPress={
          () => {
            navigation.navigate("FullCast",{casting:casting,title:"Castings"})
          }
        }
        >Castings</Text>
        <ScrollView horizontal={true} style={{
          marginTop:10
        }}>

          {/* {casting.map(cast =>
          <TouchableOpacity key={cast.name} style={{maxWidth:170}} onPress={() => {navigation.push("CastDetails",{"id":cast.id,isDark})}}>
          <Image source={{uri:cast.profile_path?`https://image.tmdb.org/t/p/w500${cast.profile_path}`:"https://img.freepik.com/free-vector/actor-holding-star-trophy-cartoon-icon_24908-10408.jpg"}} style={styles.castingCard}/>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.actorName}}>{cast.name}</Text>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.actorName}}>{cast.character}</Text>
          </TouchableOpacity>
          )} */}

{casting.map((cast) => (
                <TouchableOpacity key={cast.id} activeOpacity={0.9}
                onPress={() => {navigation.push("CastDetails",{"id":cast.id,isDark})}}
                >
                  <Image
                    source={{
                      uri: cast.profile_path? `https://image.tmdb.org/t/p/original/${cast.profile_path}`:"https://img.freepik.com/free-vector/actor-holding-star-trophy-cartoon-icon_24908-10408.jpg",
                    }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                  <Text
                    style={[
                      styles.castName,
                      { color: isDark ? colors.white : colors.black },
                    ]}
                  >
                    {cast.name}
                  </Text>
                  <Text
                    style={[
                      styles.role,
                      { color: isDark ? colors.white : colors.black },
                    ]}
                  >
                    {cast.character}
                  </Text>
                </TouchableOpacity>
              ))}

        </ScrollView>
        </View>:null
        }
        
        {crew.length !== 0 ? 
        <View style={{marginTop:-10,...styles.recommendations}}>
        <Text style={{color:isDark?colors.white:colors.dark,marginTop:-10,...styles.recommended}}
        onPress={
          () => {
            navigation.navigate("FullCast",{casting:crew,title:"Crews"})
          }
        }
        >Crews</Text>
        <ScrollView horizontal={true}
        style={{
          marginTop:10
        }}
        >

          {/* {crew.map(cast =>
          <TouchableOpacity style={{maxWidth:170}} onPress={() => {navigation.push("CastDetails",{"id":cast.id,isDark})}}>
          <Image source={{uri:cast.profile_path?`https://image.tmdb.org/t/p/w500${cast.profile_path}`:"https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/37110/original.jpg"}} style={styles.castingCard}/>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.actorName}}>{cast.name}</Text>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.actorName}}>{cast.job}</Text>
          </TouchableOpacity>
          )} */}
          {crew.map((crew) => (
                <TouchableOpacity key={crew.id} activeOpacity={0.9}
                onPress={() => {navigation.push("CastDetails",{"id":crew.id,isDark})}}
                >
                  <Image
                    source={{
                      uri: crew.profile_path? `https://image.tmdb.org/t/p/original/${crew.profile_path}`:"https://img.freepik.com/free-vector/actor-holding-star-trophy-cartoon-icon_24908-10408.jpg",
                    }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                  <Text
                    style={[
                      styles.castName,
                      { color: isDark ? colors.white : colors.black },
                    ]}
                  >
                    {crew.name}
                  </Text>
                  <Text
                    style={[
                      styles.role,
                      { color: isDark ? colors.white : colors.black },
                    ]}
                  >
                     <Text style={styles.crewJob}>{crew.job}</Text>
                  </Text>
                 
                </TouchableOpacity>
              ))}
       

        </ScrollView>
        </View>
         :null
        }


          
        {moreInfo.production_companies && moreInfo.production_companies.length!==0? 
        <View style={styles.recommendations}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.recommended}}>Production Companies</Text>
        <ScrollView horizontal={true}>

          {moreInfo.production_companies?.map(company =>
          <View style={{maxWidth:170}} key={company.name}>
          <Image source={{uri:company.logo_path?`https://image.tmdb.org/t/p/w500${company.logo_path}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/No_Logo_logo.svg/1200px-No_Logo_logo.svg.png"}} style={{resizeMode:"contain",...styles.companyCard}}/>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.actorName}}>
            {
              company.name.trim().length>15?company.name.trim().substring(0,16)+"...":company.name
            }
          </Text>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.actorName}}>{company.origin_country}</Text>
          </View>
          )}

        </ScrollView>
        </View> 
        :null  
      }
        
        
        {/*for tv */}
        {movie.first_air_date && <View style={styles.recommendations}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.recommended}}>Seasons</Text>

        <ScrollView horizontal={true}>
          {moreInfo.seasons? moreInfo.seasons.map(tv =>
          <View style={styles.seasons}>
                     <MovieCards key={tv.id} dark={true} title={tv.name} url={tv.poster_path} onPress={() => {navigation.navigate("SeasonDetails",{tv:tv,"name":moreInfo.name,"seasonNumber":tv.season_number})}}/>
                     <Text style={{color:colors.white,...styles.seasonName}}
                     
                     >{
                      tv.name.trim().length>15?tv.name.trim().substring(0,14)+"...":tv.name
                     }</Text>
                     </View>
          ):null}
        </ScrollView>
        </View>}
        
        {trailer.length !==0 ?
        <View style={{maxHeight:"100%",marginTop:14,...styles.recommendations}}>
        <Text style={{color:isDark?colors.white:colors.dark,marginTop:10,...styles.recommended}}
        onPress={
          () => {
            navigation.navigate("ExtrasViews",{trailer:trailer,title:"Trailers"})
          }
        }
        >Trailer</Text>
          <ScrollView horizontal={true}>
          {trailer.map(video =>
              <VideoCard key={video.key} title={video.name} url={video.key} />
                                
          )}
            </ScrollView>
        </View> : null
         }

        {/* more like this section */}
        {moreLikeThis.length !== 0 ? 
         <View style={{marginTop:18,...styles.recommendations}}>
         <Text style={{color:isDark?colors.white:colors.dark,...styles.recommended}}
         onPress={
          () => {
            navigation.push("FilterEnabler",{
              url: movie.first_air_date? `https://api.themoviedb.org/3/tv/${movie.id}/recommendations?api_key=${api_key}&language=en-US`:`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=${api_key}&language=en-US`
              ,title:`More Like ${
              movie.first_air_date?moreInfo.original_name:(!moreInfo.title?moreInfo.name:moreInfo.title)
            }`})
          }
         }
         >More Like This</Text>
 
         <ScrollView horizontal={true}>
           {moreLikeThis.map(movie =>
                     <MovieCards key={movie.id} dark={true} title={movie.title} url={movie.poster_path} onPress={()=> {navigation.push("MovieDetails",{movie,"dark":{isDark}})}}/>
           )}
 
         </ScrollView>
         </View>
         :null 
       }
        
         
         {video.length!==0? 
         <View style={{maxHeight:"100%",marginTop:10,...styles.recommendations}}>
         <Text style={{color:isDark?colors.white:colors.dark,marginTop:10,...styles.recommended}}
         onPress={
          () => {
            navigation.navigate("ExtrasViews",{trailer:video,title:"Extras"})
          }
        }
         >Extras</Text>
           <ScrollView horizontal={true}>
           {video.map(video =>
              <VideoCard key={video.key} title={video.name} url={video.key} />                   
           )}
             </ScrollView>
         </View> :null 
        }
         
        {/* watch providers */}
        {watchprovider? 

        <View style={{marginTop:20}}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.recommended}}>Watch Providers</Text>
        {watchprovider.flatrate?
        <View style={styles.recommendations}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.secondaryTitle}}>Available at Flatrate</Text>
        <ScrollView horizontal={true}>

          {watchprovider.flatrate.map(item =>
          <View style={{maxWidth:170}} >
          <Image source={{uri:item.logo_path?`https://image.tmdb.org/t/p/w500${item.logo_path}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/No_Logo_logo.svg/1200px-No_Logo_logo.svg.png"}} style={{resizeMode:"contain",borderRadius:10,...styles.watchCard}}/>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.providerName}}>{item.provider_name}</Text>
          </View>
          )}

        </ScrollView>
        </View> :null }
        

        {watchprovider.rent?
        <View style={styles.recommendations}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.secondaryTitle}}>Available for Rent</Text>
        <ScrollView horizontal={true}>

          {watchprovider.rent.map(item =>
          <View style={{maxWidth:170}} >
          <Image source={{uri:item.logo_path?`https://image.tmdb.org/t/p/w500${item.logo_path}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/No_Logo_logo.svg/1200px-No_Logo_logo.svg.png"}} style={{resizeMode:"contain",borderRadius:10,...styles.watchCard}}/>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.providerName}}>{item.provider_name}</Text>
          </View>
          )}

        </ScrollView>
        </View> :null
        }
        
        {watchprovider.buy?
        <View style={styles.recommendations}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.secondaryTitle}}>Available to Buy</Text>
        <ScrollView horizontal={true}>

          {watchprovider.buy.map(item =>
          <View style={{maxWidth:170}} >
          <Image source={{uri:item.logo_path?`https://image.tmdb.org/t/p/w500${item.logo_path}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/No_Logo_logo.svg/1200px-No_Logo_logo.svg.png"}} style={{resizeMode:"contain",borderRadius:10,...styles.watchCard}}/>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.providerName}}>{item.provider_name}</Text>
          </View>
          )}

        </ScrollView>
        </View> :null
         }
         
         {watchprovider.link!==null?
        <View style={styles.recommendations}>
        <Text style={{color:isDark?colors.white:colors.dark,...styles.secondaryTitle}}>Source Data From Just Watch</Text>

          <View style={{maxWidth:width,flexDirection:"row",justifyContent:"space-evenly"}} >
          <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/e/e1/JustWatch.png"}} style={{resizeMode:"contain",...styles.watchCard}}/>
          <View style={styles.watchNow}>
          <Button title="More Info" onPress={()=>{Linking.openURL(watchprovider.link)}} color={colors.secondary}/>
          </View>
          {/* <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.actorName}}>{company.name}</Text>
          <Text ellipsizeMode='head' style={{color:isDark?colors.white:colors.dark,...styles.actorName}}>{company.origin_country}</Text> */}
          </View>
          

        </View> :null
        }
         
        </View>:null
        }
         {reviews.length!==0 ? <View style={{marginTop:15}}>
          <Text style={{color:isDark?colors.white:colors.dark,...styles.recommended}}
          onPress={
            () => {
              navigation.navigate("FullReview",{review:reviews,title:"Reviews"})
            }
          }
          >Reviews</Text>
          <ScrollView horizontal={true}
          style={{
            marginTop:10
          }}
          >
          {reviews.map(review =>
                    <ReviewCard key={review.id} author={review.author} rating={review.author_details.rating} content ={review.content} url={review.author_details.avatar_path}/>
          )}
            </ScrollView>
         </View>:null}
         
      </View>
      <AwesomeAlert
          show={alert}
          showProgress={false}
          title= "Woah !!!"
          message={`${movie.first_air_date?moreInfo.original_name:(!moreInfo.title?moreInfo.name:moreInfo.title)} Added to ${click} !`}
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
      
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default MovieDetailScreen;

const styles = StyleSheet.create({
    container : {
      height:"100%"
    },
    backgroundPoster :{
      width:"100%",height:"28%"
    },
    mainPoster :
    {
      width:"50%",height:"350%",borderRadius:15,marginLeft:"5%",marginTop:"-20%"
    },
    group1 : {
      display:"flex",
      justifyContent:"space-between",
      flexDirection:"row",
      marginEnd:20
    },
    title:{
      fontSize:20,fontWeight:"bold",
    },
    detail1:{
      color:"gray",
      fontSize:18,
      marginTop:3,
      
    },
    overviewtitle:{
      fontSize:22,
      marginTop:10,
      letterSpacing:1
    },
    overview:{
      color:"gray",
      fontSize:17,letterSpacing:1,lineHeight:24,textAlign:"justify",
      fontStyle:"italic"
    },
    recommendations:{
      marginTop:16,
    },
    
    recommended:{
      fontSize:21,fontWeight:"bold",marginTop:10,letterSpacing:1
    },
    secondaryTitle:{
      fontSize:16,fontWeight:"bold",marginTop:10,letterSpacing:1
    },
    moreCard : {
      height:250,width:140,borderRadius:20,marginTop:18,margin:8
    },
    castingCard : {
      height:150,width:150,borderRadius:75,marginTop:18,margin:8
    },
    companyCard : {
      height:150,width:150,marginTop:18,margin:8,marginLeft:18,
    },
    watchCard : {
      height:100,width:100,marginTop:18,margin:8,marginLeft:12
    },
    providerName:{
      fontSize:14,textAlign:"center",marginTop:5,maxWidth:100,justifyContent:"center",alignSelf:"center"
    },
    actorName : {
      textAlign:"center",fontSize:15,flex:1,
      fontWeight:"bold",letterSpacing:1
    },
    movieName : {
      textAlign:"center",fontSize:15
    },
    modal:{
      backgroundColor:colors.primary,height:"100%",width:"100%"
    },
    watchedContainer:{
      display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginTop:10,marginBottom:10
    },
    seasonName:{
      textAlign:"center",fontSize:14,marginTop:5,fontWeight:"bold",
    },
    watchNow:{
      display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:5
    },
    profileImage: {
      width: 100,
      height: 150,
      borderRadius: 10,
      margin: 5,
    },
    castName: {
      width: 100,
      fontSize: 14,
      // numberOfLines: 1,
      fontWeight: 'bold',
      margin: 5,
    },
    role: {
      width: 100,
      fontSize: 12,
      margin: 5,
    },
    crewJob: {
      width: 100,
      fontSize: 12,
      margin: 5,
    },
    genreContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 15,
      marginBottom: 5,
    },
    genreButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10,
    },
    genreText: {
      color: colors.white,
      fontSize: 14,
    }
})