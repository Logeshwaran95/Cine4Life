//default apis
import React from "react";
import { View, StyleSheet,Text,Platform,StatusBar } from "react-native";

//for accessing users network info
import { useNetInfo } from "@react-native-community/netinfo";

//lottie animation
import LottieView from "lottie-react-native";

//color palette
import colors from "../Config/colors";

const OfflineStatus = (props) => {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <>
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
        
      </View>
      <View style={styles.overlay}>
      <LottieView
      autoPlay
      loop
      style={{}}
      source={require("../animation/offline.json")}
    />
      </View>
      </>
    );

  return null;
}

export default OfflineStatus;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    height: Platform.OS === 'android' ? StatusBar.currentHeight*2 : 0,
    justifyContent: "center",
    position: "absolute",
    top: 20,
    width: "100%",
    zIndex: 1,
  },
  text: {
    color: colors.white,
    fontSize:20,
  },
  overlay: {
    position: "absolute",
    backgroundColor: colors.primary,
    height: "100%",
    opacity: 0.8,
    marginTop:Platform.OS === 'android' ? StatusBar.currentHeight*2 : 0,
    width: "100%",
    zIndex: 1,
  },
});


