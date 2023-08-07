import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import colors from '../Config/colors';
import OfflineStatus from '../Components/OfflineStatus';
import ReviewCard from '../Components/ReviewCard';

const { width, height } = Dimensions.get('window');

const FullViewScreen = ({ route, navigation }) => {
  const reviews = route.params.review;
  const title = route.params.title;
  const isDark = true;
    


  // State variables for search
  const [searchName, setSearchName] = useState('');
  const [searchRating, setSearchRating] = useState('');

  // Function to filter reviews by name
const filterReviewsByName = () => {
    if (searchName === '') return reviews;
  
    return reviews.filter((review) => review.author.toLowerCase().includes(searchName.toLowerCase()));
  };
  

  // Function to filter reviews by rating
  const filterReviewsByRating = () => {
    if (searchRating === '') return reviews;

    const rating = parseFloat(searchRating);
    return reviews.filter(
      (review) => review.author_details.rating >= rating && review.author_details.rating < rating + 1
    );
  };

  // Merged and filtered reviews
    const filteredReviews = filterReviewsByRating().filter((review) =>
    review.author.toLowerCase().includes(searchName.toLowerCase())
    );

  return (
    <SafeAreaView style={{ backgroundColor: isDark ? colors.dark : colors.light, ...styles.container }}>
      <OfflineStatus />
      <View style={styles.header}>
        <Text style={styles.headerContent}>{title}</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by Name"
          placeholderTextColor={"gray"}
          value={searchName}
          onChangeText={setSearchName}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by Rating"
          placeholderTextColor={"gray"}
          value={searchRating}
          onChangeText={setSearchRating}
        />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {filteredReviews.map((review) => (
          <ReviewCard
            key={review.id}
            author={review.author}
            rating={review.author_details.rating}
            content={review.content}
            url={review.author_details.avatar_path}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FullViewScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: '100%',
    maxHeight: '100%',
  },
  header: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerContent: {
    color: 'white',
    fontSize: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
    margin:10

  },
  input: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 10,
    flex: 1,
    margin: 5,
    color: colors.white,
    fontWeight: 'bold',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 5,
    paddingBottom: 30,
    marginBottom: 38,
  },
});
