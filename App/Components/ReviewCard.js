import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import colors from '../Config/colors';

const { height, width: screenWidth } = Dimensions.get('window');

const ReviewCard = ({ author, url, content, rating }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const isDark = true;

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
      <View style={{ ...styles.container }}>
        <View style={styles.grp1}>
          <Image
            source={{
              uri: url
                ? `https://image.tmdb.org/t/p/w500${url}`
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Fbmz98uGL5zx0dPHLVFmOaBRO46-YJo33kmAtW7zNHoj30XFGi2J0zKzqVWXTDlj8Bc&usqp=CAU',
            }}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={{ ...styles.authorName, color: isDark ? colors.white : colors.black }}>
              {author}
            </Text>
            <Text style={{ ...styles.authorRating, color: isDark ? colors.white : colors.black }}>
              {rating}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text
            style={{
              ...styles.contentText,
              color: isDark ? colors.white : colors.black,
            }}
            numberOfLines={2}
          >
            {content}
          </Text>
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{author}</Text>

              <View style={{ height: height / 1.4, marginBottom: 10, ...styles.container }}>
                <ScrollView>
                  <View style={styles.grp1}>
                    <Image
                      source={{
                        uri: url
                          ? `https://image.tmdb.org/t/p/w500${url}`
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Fbmz98uGL5zx0dPHLVFmOaBRO46-YJo33kmAtW7zNHoj30XFGi2J0zKzqVWXTDlj8Bc&usqp=CAU',
                      }}
                      style={styles.image}
                    />
                    <View style={styles.textContainer}>
                      <Text style={{ ...styles.authorName, color: isDark ? colors.white : colors.black }}>
                        {author}
                      </Text>
                      <Text
                        style={{ ...styles.authorRating, color: isDark ? colors.white : colors.black }}
                      >
                        {rating}
                      </Text>
                    </View>
                  </View>

                  <View style={{ marginBottom: 10, ...styles.content }}>
                    <Text
                      style={{ ...styles.contentText, color: isDark ? colors.white : colors.black }}
                    >
                      {content}
                    </Text>
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
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: screenWidth - 50,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    maxWidth: screenWidth - 50,
  },
  grp1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderColor: colors.white,
    borderWidth: 2,
  },
  textContainer: {
    maxWidth: 210,
  },
  authorName: {
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  authorRating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    margin: 20,
    marginTop: 30,
  },
  contentText: {
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 24,
    textAlign: 'justify',
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
  buttonClose: {
    color: 'black',
    width: 170,
    backgroundColor: colors.white,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.dark,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 28,
    color: colors.white,
  },
});
