import { View,StyleSheet,Image,Dimensions} from 'react-native';
import React from 'react';
import colors from '../Config/colors';
import Swiper from 'react-native-swiper'
import CustomButton from '../Components/CustomButton';

const {width,height} = Dimensions.get('window');

const OnBoardingScreen = ({navigation}) => {
    const isDark = true;
  return (
    <Swiper style={styles.wrapper} showsButtons={true} loop={false}  showsPagination={false} 

    >
    <View style={styles.slide1}>
      <Image source={require('../../assets/page1.png')} style={styles.image}/>
    </View>
    <View style={styles.slide2}>
    <Image source={require('../../assets/page2.png')} style={styles.image}/>
    </View>
    <View style={styles.slide3}>
    <Image source={require('../../assets/pagece.png')} style={styles.image}/>
    </View>

    <View style={styles.slide4}>

    <Image source={require('../../assets/finalpage.png')} style={styles.image1}/>
     
    <View style={styles.btnContainer}>
    {/* <Button title="Lets Go" onPress={() => navigation.replace("Login")} color={colors.primary}/> */}
    <CustomButton type="play" style={{height:90,width:90}} size={45} onPress={() => navigation.replace("Login")}/>
    </View>
    </View>
  </Swiper>
  )
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginTop:0,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
    flexDirection:"column"

  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image:{
    height:height+50,
    width:width
  },
  image1:{
    height:height+50,
    width:width
  },
  btnContainer:{
    height:height,
    width:width,
    zIndex:2,
    textAlign:"center",
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    position:"absolute",
  },
  
})