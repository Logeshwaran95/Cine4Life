import { View, Text, StyleSheet, StatusBar, ScrollView, Image, TouchableWithoutFeedback, Dimensions, TextInput } from 'react-native';
import React, { useState } from 'react';
import colors from '../Config/colors';
import OfflineStatus from '../Components/OfflineStatus';
import VideoCard from '../Components/VideoCard';
import {SafeAreaView} from 'react-native-safe-area-context'

const { width, height } = Dimensions.get("window");

const FullViewScreen = ({ route, navigation }) => {
  const allTrailers = route.params.trailer;
  const title = route.params.title;
  const isDark = true;
  const [searchText, setSearchText] = useState('');
  
  // Function to filter trailers by video name
  const filterTrailers = () => {
    if (searchText === '') return allTrailers;
    const searchTerm = searchText.toLowerCase().trim();
    return allTrailers.filter(trailer => trailer.name.toLowerCase().includes(searchTerm));
  };

  // Merged and filtered trailers
  const filteredTrailers = filterTrailers();

  return (
    <SafeAreaView style={{ backgroundColor: isDark ? colors.dark : colors.light, ...styles.container }}>
      <OfflineStatus />
      <View style={styles.header}>
        <Text style={styles.headerContent}>{title}</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Video Name"
        placeholderTextColor="gray"
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView contentContainerStyle={styles.contentContainer} horizontal={false}>
        {filteredTrailers.map(video =>
          <VideoCard key={video.key} title={video.name} url={video.key} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default FullViewScreen;

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
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  headerContent: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    letterSpacing: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  container1: {
    maxWidth: width,
  },
  moreCard: {
    height: 180, width: width / 3.5, borderRadius: 20, marginTop: 18, margin: 5
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 10,
    margin:20,
    marginTop:20,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom:14
  },
})
