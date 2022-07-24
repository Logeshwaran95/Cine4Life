//default apis
import { View, Text,StyleSheet,Image,Dimensions,Modal,Pressable,TouchableWithoutFeedback, ScrollView } from 'react-native';
import React,{useState} from 'react';

//color palette
import colors from '../Config/colors';

//getting dimensions of the device
const {height,width: screenWidth} = Dimensions.get('window');

const ReviewCard = ({author,url,content,rating}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const dark=true;
  // console.log(url);
  // url = url?`https://image.tmdb.org/t/p/w500${url}`:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png";
  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
    <View style={{height:250,...styles.container}}>

      <View style={styles.grp1}>

      <Image source={{uri:url?`https://image.tmdb.org/t/p/w500${url}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Fbmz98uGL5zx0dPHLVFmOaBRO46-YJo33kmAtW7zNHoj30XFGi2J0zKzqVWXTDlj8Bc&usqp=CAU"}} style={styles.image}/>
      <View style={styles.textContainer}>
          <Text style={{color:dark?colors.white:colors.black,...styles.authorName}}>{author}</Text>
          <Text style={{color:dark?colors.white:colors.black,...styles.authorRating}}>{rating}</Text>
      </View>

      </View>
         
      <View style={styles.content}>
      <Text style={{color:dark?colors.white:colors.black,...styles.contentText}} numberOfLines={5}>{content}</Text>
      </View>    
       {/* modal */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        {/* for modal */}
        
      <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Text style={styles.modalText}>{author}</Text>

      <View style={{height:height/1.4,marginBottom:10,...styles.container}}>
        <ScrollView>
      <View style={styles.grp1}>
      <Image source={{uri:url?`https://image.tmdb.org/t/p/w500${url}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Fbmz98uGL5zx0dPHLVFmOaBRO46-YJo33kmAtW7zNHoj30XFGi2J0zKzqVWXTDlj8Bc&usqp=CAU"}} style={styles.image}/>
      <View style={styles.textContainer}>
          <Text style={{color:dark?colors.white:colors.black,...styles.authorName}}>{author}</Text>
          <Text style={{color:dark?colors.white:colors.black,...styles.authorRating}}>{rating}</Text>
      </View>
      </View>
      <View style={{marginBottom:10,...styles.content}}>
      <Text style={{color:dark?colors.white:colors.black,...styles.contentText}}>{content}</Text>
      </View>
      </ScrollView>
      </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close Review</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
         
    </View>
    </TouchableWithoutFeedback>
  )
}

export default ReviewCard;

const styles = StyleSheet.create({
    container:{
       margin:5,width:screenWidth-50,backgroundColor:colors.secondary,borderRadius:10,
       maxWidth:screenWidth-50,
    },
    grp1:{
        flexDirection:"row",justifyContent:"space-around",alignItems:"center",marginTop:15
    },
    image:{
      height:90,width:90,borderRadius:45
    },
    textContainer:{ 
      maxWidth:210
    },
    authorName:{
        fontSize:20,textTransform:"capitalize",fontWeight:"bold"
    },
    authorRating:{
      fontSize:18,fontWeight:"bold"
    },
    content:{
      margin:20
    },
    contentText:{
      fontSize:17,letterSpacing:1,lineHeight:24
    },
    modalView: {
      margin: 10,
      backgroundColor:colors.primary,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      color:"black",
      width:170,
      backgroundColor:colors.white
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      color:colors.dark
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize:28,
      color:colors.white
    }
})
