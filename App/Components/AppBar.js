//default apis
import { View, Text,StyleSheet,StatusBar,Platform, TouchableOpacity, Image,Dimensions} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

//icons
import {MaterialCommunityIcons} from '@expo/vector-icons'

//color palette
import colors from '../Config/colors';

//getting dimensions of the device
const {width, height} = Dimensions.get('window');

const AppBar = ({onPress1,onPress2}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onPress2}>
      <MaterialCommunityIcons name="account" size={45} color="white" style={{
        marginLeft:5,
      }}/>
      </TouchableOpacity>
      <View style={styles.brand}>
         
          <Image source={require("../../assets/logodark2.png")} style={styles.logo}/>
      </View>
     
      <TouchableOpacity style={styles.secondaryIcon} onPress={onPress1}>
          <MaterialCommunityIcons name="heart" size={35} color="white"/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AppBar;

const styles = StyleSheet.create({
    container: {
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:colors.primary,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    title : {
         fontSize:25,
         marginLeft:15,
         marginTop:4,
         color:"white",
    },
    brand:{
        display:"flex",
        flexDirection:"row",
        margin:5,
    },
    secondaryIcon : {
        margin:8,
    },
    logo:{
      height:40,width:width/1.7
    }
})