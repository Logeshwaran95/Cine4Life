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

const { width, height } = Dimensions.get('window');

const FullViewScreen = ({ route, navigation }) => {
  const unchange = route.params.movies;
  const movies = unchange.filter((movie) => movie.key==undefined);
  


  const title = route.params.title;
  const isDark = true;

  // State variables for search
  const [searchName, setSearchName] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [searchGenre, setSearchGenre] = useState('');

  // console.log("here are ",movies);

  // Function to filter movies by name
  const filterMoviesByName = () => {
    if (searchName === '') return movies;

    return movies.filter(
      (movie) =>
        movie.original_title
          ? movie.original_title.toLowerCase().includes(searchName.toLowerCase())
          : movie.original_name.toLowerCase().includes(searchName.toLowerCase())
    );
  };

  // Function to filter movies by year
  const filterMoviesByYear = (moviesToFilter) => {
    if (searchYear === '') return moviesToFilter;

    return moviesToFilter.filter((movie) => movie.release_date?
      movie.release_date.includes(searchYear):movie.first_air_date.includes(searchYear)
    );
  };

  // Function to filter movies by rating
  const filterMoviesByRating = (moviesToFilter) => {
    if (searchRating === '') return moviesToFilter;

    const rating = parseFloat(searchRating);
    return moviesToFilter.filter(
      (movie) => movie.vote_average >= rating && movie.vote_average < rating + 1
    );
  };

  // Chained and filtered movies
  let filteredMovies = filterMoviesByName(movies);


  filteredMovies = filterMoviesByYear(filteredMovies);
  filteredMovies = filterMoviesByRating(filteredMovies);

  return (
    <SafeAreaView style={{ backgroundColor: isDark ? colors.dark : colors.light, ...styles.container }}>
      <OfflineStatus />
      <View style={styles.header}>
        <Text style={styles.headerContent}>{title}</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={"gray"}
          value={searchName}
          onChangeText={setSearchName}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          placeholderTextColor={"gray"}
          value={searchYear}
          onChangeText={setSearchYear}
        />
        <TextInput
          style={styles.input}
          placeholder="Rating"
          placeholderTextColor={"gray"}
          value={searchRating}
          onChangeText={setSearchRating}
        />
      </View>

      <ScrollView style={{
        marginBottom: 5
      }} contentContainerStyle={styles.contentContainer}>
        {filteredMovies.map((movie) => (
          <TouchableWithoutFeedback key={movie.id} onPress={() => navigation.push("MovieDetails", { movie, "dark": { isDark } })}>
            <View style={styles.container1}>
              <Image
                source={{
                  uri: movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg",
                }}
                style={styles.moreCard}
              />
              {/* <Text style={{color:dark?colors.white:colors.black,...styles.movieName}}>{title?title:name}</Text> */}
            </View>
          </TouchableWithoutFeedback>
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
    marginBottom: 100,
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
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
    margin: 10,
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
    justifyContent: 'space-evenly',
    margin: 5,
    marginBottom: 38,
  },
  container1: {
    maxWidth: width,
  },
  moreCard: {
    height: 180,
    width: width / 3.5,
    borderRadius: 20,
    marginTop: 18,
    margin: 5,
    /*resizeMode:"stretch"*/
  },
});
