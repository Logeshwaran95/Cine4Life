//default apis
import { View, Text,StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import React from 'react';

//color palette
import colors from '../Config/colors';

const IconBatch = ({icon,title,onPress,...others}) => {
  return (
      <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.container}>
        {/* <View style={styles.icon}>
       <MaterialCommunityIcons name={icon} size={50} color={colors.white} />
       </View> */}
      <Text style={styles.text} {...others}>{title}</Text>
    </View>
    </TouchableNativeFeedback>
  )
}

export default IconBatch;

const styles = StyleSheet.create({
    container : {
        height:85,width:90,backgroundColor:colors.secondary,
        borderRadius:20,margin:10,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"
    },
    icon : {
        
    },
    text : {
        color:colors.white,
        marginBottom:5,
        fontSize:13,
        textAlign:"center",
        fontWeight:"bold",
        letterSpacing:1,
    }
})