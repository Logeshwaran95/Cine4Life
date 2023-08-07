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
import axios from 'axios';
import { api_key } from '@env';

const { height, width } = Dimensions.get('window');

const GenreResults = ({ route, navigation }) => {
  const genre = route.params.genre.id;
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
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${genre}`
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

      const movieName = movie.original_title?.toLowerCase() || movie.title?.toLowerCase();
      const movieRating = movie.vote_average?.toString();
      const movieYear = movie.release_date;

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

  return (
    <SafeAreaView style={{ backgroundColor: isDark ? colors.dark : colors.light, ...styles.container }}>
      <ActivityIndicator visible={loading} />
      <OfflineStatus />
      <View style={styles.header}>
        <Text style={styles.headerContent}>Popular in {route.params.genre.name} <MaterialCommunityIcons name="movie" size={28} /></Text>
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
      <View style={{ margin: 10, maxHeight: height / 1.139, marginBottom: hasMorePages ? 140 : 0 }}>
        <ScrollView>
          {filteredMovies.map((movie) => (
            <TouchableNativeFeedback key={movie.id} onPress={() => navigation.navigate("MovieDetails", { movie, dark: { isDark } })}>
              <View>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
                <View style={styles.outline}>
                  <View style={styles.textContainer}>
                    <Text style={styles.movieTitle}>{movie.media_type === "tv" || movie.gender ? movie.name : movie.title}</Text>
                    <Text style={styles.info}>Popularity: {movie.popularity}</Text>
                    <View style={styles.rating}>
                      <Rating rate={movie.vote_average} />
                    </View>
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
    fontSize: 22,
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
});

export default GenreResults;
