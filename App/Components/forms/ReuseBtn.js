//default apis
import { View, Text ,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import React from 'react'

//color palette
import colors from '../../Config/colors'

//gettting dimensions of the device
const {width,height} = Dimensions.get('window')

const ReuseBtn = ({title,color,...otherProps}) => {
  return (
    <TouchableOpacity style={{backgroundColor:color,...styles.container}} {...otherProps}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ReuseBtn;

const styles = StyleSheet.create({
    container : {
        marginTop:10,
        width:"100%",
        height:height/15,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:3,
        padding:10,
        borderRadius:30
    },
    text : {
        fontSize:18,
        color:"white",
        fontWeight:"bold"
    }
})