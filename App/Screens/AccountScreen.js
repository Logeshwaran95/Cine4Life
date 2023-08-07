//default apis
import { View, Text,StyleSheet, Alert,StatusBar, Image ,Dimensions, ScrollView, Pressable, TouchableOpacity} from 'react-native';
import React, { useEffect,useState } from 'react';

//required components
import { FormBtn } from '../Components/forms';
import ReuseBtn from '../Components/forms/ReuseBtn';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context'

//firebase apis
import { auth,db } from '../Config/firebase';

//color palette
import colors from '../Config/colors';

//offline detector
import OfflineStatus from '../Components/OfflineStatus';

const {width, height} = Dimensions.get('window');

const AccountScreen = ({navigation}) => {
  const dark=true;
  const userId = auth.currentUser?.uid;
  let favdata;
  let watchData;
  let watchedData;

  const [favCount,setFavCount] = useState(0);
  const [watchCount,setWatchCount] = useState(0);
  const [watchedCount,setWatchedCount] = useState(0);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [about, setAbout] = useState("");
  const [lovedmovie, setLovedmovie] = useState("");
  const [lovedseries, setLovedseries] = useState("");
  const [cinephile, setCinephile] = useState("");

  const handleLogout = () => {
     auth.signOut().then(() => {
       navigation.replace("Login");
     }).catch(error => Alert.alert(error.message));
  }
  
  useEffect(() => {
      readFromFav();
      readFromWatchList();
      readFromWatched();
      getUserInfo();
  },[])

  const readFromFav = () => {
    db.ref('favourites/'+userId+'/').on('value', function (snapshot) {
    // console.log(snapshot.val());
    if(snapshot.val()){
      favdata = Object.values(snapshot.val()); 
      setFavCount(favdata.length);
    }
  });
}
   const readFromWatchList = () => {
     db.ref('watchlist/'+userId+'/').on('value', function (snapshot) {
     // console.log(snapshot.val());
     if(snapshot.val()){
       watchData = Object.values(snapshot.val()); 
       setWatchCount(watchData.length);
     }
   });
   }
  
   const readFromWatched = () => {
    db.ref('watched/'+userId+'/').on('value', function (snapshot) {
    // console.log(snapshot.val());
    if(snapshot.val()){
      watchedData = Object.values(snapshot.val()); 
      setWatchedCount(watchedData.length);
    }
  });
  }

  const getUserInfo = () => {
    db.ref('userdetails/'+userId).on('value', function (snapshot) {
      if(snapshot.val()){
        const data = snapshot.val();
        setUsername(data.username);
        setEmail(data.email);
        setNumber(data.number);
        setAbout(data.about);
        setLovedmovie(data.lovedmovie);
        setLovedseries(data.lovedseries);
        setCinephile(data.cinephile);
      }
    });
  }
  
  const usernameConfirm = username?username:"Free User";
  const emailConfirm = email?email:(auth.currentUser?auth.currentUser.email:"Not Verified");
  const numberConfirm = number?number:"Not Provided";
  const aboutConfirm = about?about:"Not Provided";
  const lovedmovieConfirm = lovedmovie?lovedmovie:"Not Provided";
  const lovedseriesConfirm = lovedseries?lovedseries:"Not Provided";
  const cinephileConfirm = cinephile?cinephile:"Not Provided";

  return (
    <SafeAreaView style={{backgroundColor:dark?colors.dark:colors.light,...styles.container}}>
       <OfflineStatus/>
       <View style={styles.header}>

          <MaterialCommunityIcons name="account-circle" size={38} color={colors.light} style={{margin:8}}/>
          <Text style={styles.headerContent}>My Account</Text>

        </View>

        <ScrollView>
        <Image source={{uri:auth.currentUser.photoURL?auth.currentUser.photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Fbmz98uGL5zx0dPHLVFmOaBRO46-YJo33kmAtW7zNHoj30XFGi2J0zKzqVWXTDlj8Bc&usqp=CAU"}} style={styles.image}/>
        <View style={styles.Outline}>

          <View style={styles.textContainer}>

          <Text style={styles.userName}>{usernameConfirm}</Text>
          <Text style={styles.email}>{emailConfirm}</Text>

          </View>

          <View style={styles.contents}>

            <TouchableOpacity onPress={()=> navigation.navigate("Favourites",{path:"watched"})}>
           <View style={styles.content}>
             <Text style={styles.textValue}>{watchedCount}</Text>
             <Text style={styles.text}>WATCHED</Text>
           </View>
           </TouchableOpacity>

           <TouchableOpacity onPress={()=> navigation.navigate("Favourites",{path:"favourites"})}>
           <View style={styles.content}>
           <Text style={styles.textValue}>{favCount}</Text>
             <Text style={styles.text}>FAVOURITES</Text>
           </View>
           </TouchableOpacity>
           
           <TouchableOpacity onPress={()=> navigation.navigate("Favourites",{path:"watchlist"})}>
           <View style={styles}>
             <Text style={styles.textValue}>{watchCount}</Text>
             <Text style={styles.text}>WATCHLIST</Text>
           </View>
           </TouchableOpacity>
          </View>
     
        </View>
         <View style={styles.btnGroup}>
            <ReuseBtn title="Watched" color={colors.secondary} onPress={()=> navigation.navigate("Favourites",{path:"watched"})}/>
            <ReuseBtn title="Favourites" color={colors.secondary} onPress={()=> navigation.navigate("Favourites",{path:"favourites"})}/>
            <ReuseBtn title="Watchlist" color={colors.secondary} onPress={()=> navigation.navigate("Favourites",{path:"watchlist"})}/>
         </View>

        <View style={styles.Outline1}>
          <View style={styles.infoContainer}>

            <Text style={styles.info}>My Profile</Text>

            <View style={styles.infoContent}>
            <Text style={styles.field}>Email </Text>
            <Text style={styles.valueMail}>{emailConfirm}</Text>
            </View>

            <View style={styles.infoContent}>
            <Text style={styles.field}>Username </Text>
            <Text style={styles.value}>{usernameConfirm}</Text>
            </View>

            <View style={styles.infoContent}>
            <Text style={styles.field}>phone number </Text>
            <Text style={styles.value}>{numberConfirm}</Text>
            </View>
            

            <View style={styles.infoMore}>
            <Text style={styles.field}>Most Loved Movie</Text>
            <Text style={styles.value}>{lovedmovieConfirm}</Text>
            </View>

            <View style={styles.infoMore}>
            <Text style={styles.field}>Most Loved Series </Text>
            <Text style={styles.value}>{lovedseriesConfirm}</Text>
            </View>
             

            <View style={styles.infoMore}>
            <Text style={styles.field}>About me</Text>
            <Text style={{lineHeight:25,...styles.value}}>{aboutConfirm}</Text>
            </View>


            <View style={styles.infoMore}>
            <Text style={styles.field}>Why iam a Cinephile ?</Text>
            <Text style={{lineHeight:25,...styles.value}}>{cinephileConfirm}</Text>
            </View>
            
          </View>
        </View>

      <View style={styles.editBtn}>
      <ReuseBtn title="Edit Profile" color={colors.secondary} onPress={() => navigation.navigate("ProfileEdit")}/>
      </View>
      <View style={styles.logoutBtn}>
      <FormBtn
        title="Log Out"
        onPress={handleLogout}
      />
      </View>

      <View style={styles.credits}>
       <Text style={styles.creditsTitle}>Made With <MaterialCommunityIcons name="heart" size={25} style={{color:colors.danger}}/>  By Logeshwaran</Text>
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex:1,
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
  Outline:{
    height:height/3,width:width-20,backgroundColor:colors.secondary,borderRadius:20,margin:10,marginTop:-height/10
  },
  Outline1:{
    width:width-20,backgroundColor:colors.secondary,borderRadius:20,margin:10,marginTop:10
  },
  image:{
    height:150,width:150,borderRadius:75,alignSelf:"center",marginTop:20,zIndex:1
  },
  userName:{
    textAlign:"center",fontSize:24,color:colors.white,margin:5,
    fontWeight:"bold",letterSpacing:1
  },
  email:{
    textAlign:"center",fontSize:13,color:colors.white
  },
  textContainer:{
    marginTop:80
  },
  logoutBtn:{
    width:width/1.5,alignSelf:"center",marginTop:20,marginBottom:25
  },
  contents:{
    flexDirection:"row",alignContent:"center",justifyContent:"space-around",marginTop:20
  },
  content:{
    borderRightColor:"gray",borderRightWidth:3
  },
  textValue:{
    fontSize:20,color:colors.white,textAlign:"center"
  },
  text:{
    fontWeight:"bold",marginRight:17,marginLeft:17,fontSize:15,color:colors.white
  },
  infoContainer:{
    alignContent:"center",justifyContent:"center",marginTop:10,marginBottom:30
  },
  info:{
    fontSize:22,color:colors.white,textAlign:"center",margin:15,fontWeight:"bold",letterSpacing:1
  },
  infoContent:{
    display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10,alignItems:"center",marginLeft:30,marginRight:30
  },
  infoMore:{
    display:"flex",justifyContent:"center",marginTop:18,alignItems:"center",marginLeft:30,marginRight:30
  },
  field:{
    fontSize:20,color:colors.danger,textAlign:"center",textTransform:"capitalize"
  },
  value:{
    fontSize:18,color:colors.white,maxWidth:width,textAlign:"center",textTransform:"capitalize",letterSpacing:0.8,margin:8,
  },
  valueMail:{
    fontSize:18,color:colors.white,maxWidth:width/1.7,textAlign:"center",letterSpacing:0.2
  },
  editBtn:{
    width:width/1.2,alignSelf:"center",
  },
  btnGroup:{
    flexDirection:"column",justifyContent:"space-around",alignItems:"center",marginTop:8,marginBottom:8,width:width/1.2,alignSelf:"center"
  },
  credits:{
    width:width,height:60,alignSelf:"center",justifyContent:"center",alignItems:"center",backgroundColor:colors.secondary,borderTopLeftRadius:20,borderTopRightRadius:20
  },
  creditsTitle:{
    fontSize:20,color:colors.white,textAlign:"center",fontWeight:"bold",letterSpacing:1,fontStyle:"italic"
  }
})