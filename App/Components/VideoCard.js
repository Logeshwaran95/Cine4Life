//default apis
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

//youtube ifrmae provider and player
import YoutubePlayer from 'react-native-youtube-iframe';

//required component
import CustomButton from './CustomButton';

//getting dimensions of the device
const { width, height } = Dimensions.get('window');

//color palette
import colors from '../Config/colors';

const VideoCard = ({ title, url }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: `https://img.youtube.com/vi/${url}/maxresdefault.jpg` }}
        style={styles.image}
      />
      {/* CustomButton with absolute positioning */}
      <View style={styles.buttonContainer}>
        <CustomButton
          type="play"
          size={30}
          style={{ height: 60, width: 60 }}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={styles.grp1}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white', textAlign: 'center', fontSize: 15, maxWidth: width / 1.44, marginTop: 10 }}>
          {title}
        </Text>
        {/* Rest of your components in grp1 */}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> {title}</Text>
            <YoutubePlayer videoId={url} play={true} width={width-20} height={height/3.5}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close Video</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 230,
    width: width - 60,
    backgroundColor: colors.dark,
    margin: 10,
    borderRadius: 20,
    marginTop: 25,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  image: {
    height: 200,
    width: width - 60,
    borderRadius: 20,
  },
  grp1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // New styles for the button container
  buttonContainer: {
    position: 'absolute',
    top: '50%', // Adjust this value to position the button vertically
    left: '50%', // Adjust this value to position the button horizontally
    transform: [{ translateX: -30 }, { translateY: -30 }], // Adjust these values based on your button size
  },
  modalView: {
    margin: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    color: 'black',
    width: 170,
    backgroundColor: colors.white,
  },
  textStyle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.dark,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: colors.white,
  },
});

export default VideoCard;
