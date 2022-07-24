//default apis
import { View, Text,StyleSheet,StatusBar,Platform, ScrollView } from 'react-native'
import React ,{useState} from 'react'

//color palette
import colors from '../Config/colors';

//form components
import { FormBtn,FormInput } from '../Components/forms';

//firebase apis
import { db,auth } from '../Config/firebase';

//other components
import {MaterialCommunityIcons} from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import OfflineStatus from '../Components/OfflineStatus';

const ProfileEditScreen = ({navigation}) => {
    const dark = true;
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [about, setAbout] = useState("");
    const [lovedmovie, setLovedmovie] = useState("");
    const [lovedseries, setLovedseries] = useState("");
    const [cinephile, setCinephile] = useState("");
    const [isdone, setIsdone] = useState(false);

    const userId = auth.currentUser?.uid;
    
    
    const handleSubmit = () => {
        console.log(userId);
        if(username ==="" || email ==="" || number ==="" || about ==="" || lovedmovie ==="" || lovedseries ==="" || cinephile ===""){
            alert("Please Fill All Fields");
        }else{
            addUserInfo();
            setIsdone(true);
            setTimeout(() =>  navigation.navigate("Account"), 2500)
        }
    }
    
    const addUserInfo = () => {
            db.ref('userdetails/'+ userId).set({
            username,
            email,
            number,
            about,
            lovedmovie,
            lovedseries,
            cinephile
          }).then((data)=>{
            console.log('data ' , data)
          }).catch((error)=>{
            console.log('error ' , error)
          })
    }

  return (
    <View style={{backgroundColor:dark?colors.dark:colors.light,...styles.container}}>
      <OfflineStatus/>
    <View style={styles.header}>

          <MaterialCommunityIcons name="account-edit" size={38} color={colors.light} style={{margin:8}}/>
          <Text style={styles.headerContent}>Edit Profile</Text>

     </View>

     {isdone? 
      <LottieView
             autoPlay
             loop={false}             
             source={require("../animation/done.json")}
             style={{backgroundColor:colors.white,zIndex:2}}
      />:null
      }
    
    <ScrollView style={styles.body}>

     <Text style={styles.title}>Username</Text>
     <FormInput
        labelValue={username}
        onChangeText={(e) => setUsername(e)}
        placeholderText="Username"
        iconType="user"
        // keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

     <Text style={styles.title}>Email</Text>
     <Text style={{marginLeft:10,color:colors.white}}>if exist already,will be considered as secondary email</Text>
     <FormInput
        labelValue={email}
        onChangeText={(e) => setEmail(e)}
        placeholderText="Email"
        iconType="mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />


     <Text style={styles.title}>Mobile Number</Text>
     <Text style={{marginLeft:10,color:colors.white}}>if exist already,will be considered as secondary mobile number</Text>
     <FormInput
        labelValue={number}
        onChangeText={(e) => setNumber(e)}
        iconType={Platform.OS === 'ios' ? 'phone-portrait' : 'phone'}
        placeholderText="Mobile Number"
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />


     <Text style={styles.title}>About</Text>
     <FormInput
        labelValue={about}
        onChangeText={(e) => setAbout(e)}
        placeholderText="About"
        iconType="message1"
        autoCapitalize="none"
        autoCorrect={false}
      />

     <Text style={styles.title}>The Movie you love the most !</Text>
     <FormInput
        labelValue={lovedmovie}
        onChangeText={(e) => setLovedmovie(e)}
        placeholderText="Most Loved Movie"
        iconType="play"
        autoCapitalize="none"
        autoCorrect={false}
      />

     <Text style={styles.title}>The Series you love the most !</Text>
     <FormInput
        labelValue={lovedseries}
        onChangeText={(e) => setLovedseries(e)}
        placeholderText="Most Loved Series"
        iconType="play"
        autoCapitalize="none"
        autoCorrect={false}
      />
      

     <Text style={styles.title}>Tell us Why you are a cinephile !</Text>
     <FormInput
        labelValue={cinephile}
        onChangeText={(e) => setCinephile(e)}
        placeholderText="Iam A Cinephile"
        iconType="smileo"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.submitBtn}>
          <FormBtn title="Save Changes" onPress={() => handleSubmit()}/>
      </View>
      </ScrollView>
    </View>

  )
}

export default ProfileEditScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1,
      },
      header : {
        backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
        display:"flex",flexDirection:"row",justifyContent:"center"
      },
      headerContent : {
        color:"white",
        fontSize:25,
        textAlign:"center",
      },
      body:{
          marginTop:20,margin:20
      },
      title:{
        fontSize:25,margin:7,color:colors.white
      }
})