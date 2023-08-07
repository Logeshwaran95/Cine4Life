import React, { useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';


import {FormInput, FormBtn, SocialBtn} from '../Components/forms';
import colors from '../Config/colors';
import {auth} from '../Config/firebase';

import signInWithGoogleAsync from '../auth/GoogleAuth';
import OfflineStatus from '../Components/OfflineStatus';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id,setId] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  },[])

  const handleLogin = () => {
    if(email === ""|| password === ""){
        alert("Please fill all the fields");
    }else{
      auth.signInWithEmailAndPassword(email, password).then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
        console.log("successfully logged in with ",user.email);
        console.log("here is the id",user.uid);
      })
      .catch(error => Alert.alert(error.message));
    }
    
  }
   
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <OfflineStatus/>
      <Image
        source={require("../../assets/logowhite.png")}
        style={styles.logo}
      />
      <Text style={{textAlign: 'center', fontSize: 30, margin: 10,color:"white",fontWeight:"bold",letterSpacing:1}}>Log In</Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormBtn
        title="Log In"
        onPress={handleLogin}
      />

      {/* <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity> */}

      {/* {Platform.OS === 'android' ? (
        <View>

          <SocialBtn
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => signInWithGoogleAsync()}
          />
          <SocialBtn
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

        </View>
      ) : null} */}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUp')}
        >
        <Text style={styles.nav1}>Don't have an account? <Text style={styles.navButtonText}>Sign Up</Text></Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:colors.primary,
    height:"100%"
  },
  logo: {
    height: 90,
    width: width-20,
    resizeMode: 'cover',
    marginBottom:30,
    borderRadius:50
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 10,
    color: 'white',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color:colors.danger
  },
  nav1:{
    fontSize: 18,
    fontWeight: '500',
    color:"gray"
  }
});