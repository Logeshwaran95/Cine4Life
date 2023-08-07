import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import colors from '../Config/colors';
import Rating from '../Components/Rating';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActivityIndicator from '../Components/ActivityIndicator';
import OfflineStatus from '../Components/OfflineStatus';
import CircularProgress from "react-native-circular-progress-indicator";
import axios from 'axios';
import { api_key } from '@env';

const { height, width } = Dimensions.get('window');

const FilterResults = ({ route, navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    getSearchResults();
  }, []);

  const query = route.params.search.search;
  console.log(query);

  const isDark = true;

  const getSearchResults = async (pageNumber = 1) => {
    setLoading(true);
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
    );
    if (response.data.results.length === 0) {
      setEmpty(true);
    }
    if (pageNumber === 1) {
      setMovies(response.data.results);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    }
    setLoading(false);
    setHasMorePages(response.data.page < response.data.total_pages);
  };

  // Function to filter movies by title, year, and rating
  const filterMovies = () => {
    return movies.filter((movie) => {
      const searchTermTitle = searchTitle.toLowerCase().trim();
      const searchTermYear = searchYear.trim();
      const searchTermRating = searchRating.trim();

      const movieTitle = movie.title ? movie.title?.toLowerCase() : movie.name?.toLowerCase() || '';
      const movieYear = movie.release_date?.substring(0, 4) || '';
      const movieRating = movie.vote_average?.toString() || '';

      const titleMatch = movieTitle.includes(searchTermTitle);
      const yearMatch = movieYear.includes(searchTermYear);
      const ratingMatch = movieRating.includes(searchTermRating);

      return titleMatch && yearMatch && ratingMatch;
    });
  };

  // Merged and filtered movies
  const filteredMovies = filterMovies().slice(0, page * 20); // Assuming 20 movies per page.

  const handleLoadMore = () => {
    const nextPage = page + 1;
    getSearchResults(nextPage);
    setPage(nextPage);
  };

  return (
    <SafeAreaView style={{ backgroundColor: isDark ? colors.dark : colors.light, ...styles.container }}>
      <ActivityIndicator visible={loading} />
      <OfflineStatus />
      {empty === true ? (
        <View style={styles.overlay}>
          {/* <Text>No Results Found !!</Text> */}
          <LottieView
            autoPlay
            loop
            source={require("../animation/noresults.json")}
          />
        </View>
      ) : null}

      <View style={styles.header}>
        <Text style={styles.headerContent}>Results <MaterialCommunityIcons name="movie" size={28} /></Text>
      </View>

      {/* Add the search inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="gray"
          value={searchTitle}
          onChangeText={setSearchTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          placeholderTextColor="gray"
          value={searchYear}
          onChangeText={setSearchYear}
        />
        <TextInput
          style={styles.input}
          placeholder="Rating"
          placeholderTextColor="gray"
          value={searchRating}
          onChangeText={setSearchRating}
        />
      </View>

      <View style={{ margin: 10, maxHeight: height / 1.139, marginBottom: hasMorePages ? 138 : 0 }}>
        <ScrollView>
          {filteredMovies.map((movie) => (
            <TouchableNativeFeedback
              key={movie.id}
              onPress={() => movie.gender ? navigation.push("CastDetails", { "id": movie.id, isDark }) : navigation.navigate("MovieDetails", { movie, "dark": { isDark } })}
            >
              <View>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.gender ? movie.profile_path : movie.poster_path}` }} style={styles.image} />
                <View style={styles.outline}>
                  <View style={styles.textContainer}>
                    <Text style={styles.movieTitle}>{movie.media_type === "tv" || movie.gender ? movie.name : movie.title}</Text>
                    <Text style={styles.info}>Popularity : {movie.popularity}</Text>

                    {movie.gender ? <Text style={styles.info}>Gender : {movie.gender == 2 ? "Male" : "Female"}</Text> : null}
                    {movie.gender ?
                      <View style={{ marginTop: 5 }}>
                        <CircularProgress
                          value={movie.popularity ? movie.popularity : 0}
                          radius={35}
                          maxValue={100}
                          duration={2500}
                          inActiveStrokeColor={'#2ecc71'}
                          inActiveStrokeOpacity={0.2}
                          textColor={isDark ? colors.white : colors.dark}
                          textStyle={{ marginLeft: 50 }}
                          valueSuffix={' %'}
                          title={'Popularity'}
                          titleStyle={{ marginLeft: 50 }}
                        />
                      </View>
                      : null
                    }

                    {!movie.gender ? <View style={styles.rating}>
                      <Rating rate={movie.vote_average} />
                    </View> : null}
                  </View>
                </View>
              </View>
            </TouchableNativeFeedback>
          ))}
        </ScrollView>
      </View>

      {hasMorePages && (
        <TouchableNativeFeedback onPress={handleLoadMore}>
          <View style={styles.loadMoreButton}>
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </View>
        </TouchableNativeFeedback>
      )}
    </SafeAreaView>
  )
}

export default FilterResults;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: "100%",
    maxHeight: "100%",
  },
  header: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 1,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 3,
    marginTop: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    color: colors.white,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: 140,
    borderRadius: 15,
    marginTop: 18,
    margin: 15,
    marginLeft: 30,
  },
  outline: {
    height: 190,
    width: "95%",
    backgroundColor: colors.secondary,
    marginTop: -190,
    zIndex: -2,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 180,
    marginTop: 20,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    color: colors.white,
    marginRight: 1,
  },
  info: {
    marginRight: 30,
    fontSize: 12,
    color: "gray",
    marginTop: 5
  },
  rating: {
    marginTop: 0,
    marginRight: 38,
  },
  overlay: {
    position: "absolute",
    backgroundColor: colors.primary,
    height: "100%",
    opacity: 0.8,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: "100%",
    zIndex: 1,
  },
  loadMoreButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50, // Make it round
    position: 'absolute',
    bottom: 10, // Adjust bottom positioning
    right: 20, // Adjust right positioning
    
  },
  loadMoreButtonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: 'bold',
  },
});
