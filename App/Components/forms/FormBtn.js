//default apis
import { View, Text ,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import React from 'react'

//color palette
import colors from '../../Config/colors'

//getting dimensions of the device
const {width,height} = Dimensions.get('window')

const FormBtn = ({title,...otherProps}) => {
  return (
    <TouchableOpacity style={styles.container} {...otherProps}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default FormBtn;

const styles = StyleSheet.create({
    container : {
        marginTop:10,
        width:"100%",
        height:height/15,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:3,
        padding:10,
        borderColor:colors.danger,
        backgroundColor:colors.danger,
        borderRadius:30
    },
    text : {
        fontSize:18,
        color:"white",
        fontWeight:"bold"
    }
})