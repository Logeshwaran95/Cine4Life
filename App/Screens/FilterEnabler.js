import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../Config/colors';
import Rating from '../Components/Rating';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActivityIndicator from '../Components/ActivityIndicator';
import OfflineStatus from '../Components/OfflineStatus';
import axios from 'axios';
import { api_key } from '@env';

const { height, width } = Dimensions.get('window');

const FilterEnabler = ({ route, navigation }) => {
  const isDark = true;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    getMovieByGenre();
  }, []);

  const getMovieByGenre = async (pageNumber = 1) => {
    setLoading(true);
    const response = await axios.get(
      `${route.params.url}&page=${pageNumber}`
    );
    if (pageNumber === 1) {
      setMovies(response.data.results);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    }
    setLoading(false);
    setHasMorePages(response.data.page < response.data.total_pages);
  };

  // Function to filter movies by name, title, and year
  const filterMovies = () => {
    return movies.filter((movie) => {
      const searchTermName = searchName.toLowerCase().trim();
      const searchTermRating = searchRating.trim();
      const searchTermYear = searchYear.trim();

      const movieName = movie.original_title?.toLowerCase() || movie.title?.toLowerCase() || movie.name?.toLowerCase();
      const movieRating = movie.vote_average?.toString()[0];
      const movieYear = movie.release_date?.toString() || movie.first_air_date?.toString();

      const nameMatch = !searchTermName || (movieName && movieName.includes(searchTermName));
      const ratingMatch = !searchTermRating || (movieRating && movieRating.includes(searchTermRating));
      const yearMatch = !searchTermYear || (movieYear && movieYear.includes(searchTermYear));

      return nameMatch && ratingMatch && yearMatch;
    });
  };

  // Merged and filtered movies
  const filteredMovies = filterMovies().slice(0, page * 20); // Assuming 20 movies per page.

  const handleLoadMore = () => {
    const nextPage = page + 1;
    getMovieByGenre(nextPage);
    setPage(nextPage);
  };

//   console.log(filteredMovies);

  return (
    <SafeAreaView style={{flex:1,backgroundColor: isDark ? colors.dark : colors.light, ...styles.container }}>
      <ActivityIndicator visible={loading} />
      <OfflineStatus />
      <View style={styles.header}>
        <Text style={styles.headerContent}
        numberOfLines={1}
        >
            {
                route.params.title
            }
        </Text>
      </View>
      {/* Search input row */}
      <View style={styles.searchRow}>
        {/* Search by Name */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="gray"
          value={searchName}
          onChangeText={setSearchName}
        />
        {/* Search by Year */}
        <TextInput
          style={styles.input}
          placeholder="Year"
          placeholderTextColor="gray"
          value={searchYear}
          onChangeText={setSearchYear}
        />
        {/* Search by Rating */}
        <TextInput
          style={styles.input}
          placeholder="Rating"
          placeholderTextColor="gray"
          value={searchRating}
          onChangeText={setSearchRating}
        />
      </View>
      {/* base view */}
      
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

      {hasMorePages && (
        <TouchableWithoutFeedback onPress={handleLoadMore}>
          <View style={styles.loadMoreButton}>
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

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
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 1,
    textAlign: "center",
  },
  searchRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 1,
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
  loadMoreButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50, // Make it round
    position: 'absolute',
    bottom: 8, // Adjust bottom positioning
    right: 20, // Adjust right positioning
    
  },
  loadMoreButtonText: {
    color: "gray",
    fontSize: 16,
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

export default FilterEnabler;
