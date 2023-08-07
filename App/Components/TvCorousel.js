//default apis
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

//for parallax image
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';


const ENTRIES1 = [
];
const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = ({movies,navigation,dark}) => {
  const data = movies;
  data.map((movie) => {
      ENTRIES1.push(movie);
  })
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);
  const handlePress = (item) => {
    navigation.navigate('MovieDetails',{movie:item,dark:{dark}});
  }
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableWithoutFeedback onPress={() => handlePress(item)} style={{height:800,width:200,margin:20}}>
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <ParallaxImage
          source={{uri:`https://image.tmdb.org/t/p/w500${item.poster_path}`}}
          containerStyle={styles.imageContainer1}
          style={styles.image1}
          parallaxFactor={0}
          {...parallaxProps}
        />
      
      </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    {/* <CustomButton type="forward" size={40} style={{height:60,width:60,marginLeft:280,marginTop:-10}} onPress={goForward}/> */}
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    marginTop:20
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 130,
  },
  imageContainer: {
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    height:200
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  imageContainer1:{
        height:180,
        width:120,
        marginTop:-120,
        marginLeft:20,
        borderRadius:8,
  },
  title:{
    marginTop:-50,
    marginLeft:170,
    fontSize:18
  }

});
