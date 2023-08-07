//default apis
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

//icons
import { FontAwesome } from "@expo/vector-icons";

//color palette
import colors from "../Config/colors";

const CustomButton = ({type,size, onPress,style ,isDisabled}) => {
  var iconSize=40;
  if(size?iconSize=size:iconSize= 40);
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled?true:false}>
      <View style={{...style,...styles.container}}>
        <FontAwesome
          name={type}
          color={colors.white}
          size={iconSize}
        />
      </View>
    </TouchableOpacity>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    bottom: 20,
    justifyContent: "center",
  },
});

