import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import colors from '../Config/colors';
import OfflineStatus from '../Components/OfflineStatus';

const { width, height } = Dimensions.get('window');

const FullViewScreen = ({ route, navigation }) => {
  const casting = route.params.casting;
  const title = route.params.title;
  const isDark = true;

  // State variables for search
  const [searchName, setSearchName] = useState('');
  const [searchCharacter, setSearchCharacter] = useState('');

  // Function to filter casting by name
  const filterCastingByName = () => {
    if (searchName === '') return casting;

    return casting.filter((cast) => cast.name.toLowerCase().includes(searchName.toLowerCase()));
  };

  // Function to filter casting by character or role
  const filterCastingByCharacter = () => {
    if (searchCharacter === '') return casting;

    return casting.filter(
      (cast) =>
        cast.character?.toLowerCase().includes(searchCharacter.toLowerCase()) ||
        cast.known_for_department?.toLowerCase().includes(searchCharacter.toLowerCase())
    );
  };

  // Merged and filtered casting
  // let filteredCasting = filterCastingByName();
  // filteredCasting = filterCastingByCharacter();
  const filteredCasting = filterCastingByCharacter().filter((cast) =>
    cast.name.toLowerCase().includes(searchName.toLowerCase())
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
          placeholderTextColor={'gray'}
          value={searchName}
          onChangeText={setSearchName}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by character/role"
          placeholderTextColor={'gray'}
          value={searchCharacter}
          onChangeText={setSearchCharacter}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {filteredCasting.map((cast) => (
          <TouchableOpacity
            key={cast.id}
            activeOpacity={0.9}
            onPress={() => {
              navigation.push('CastDetails', { id: cast.id, isDark });
            }}
          >
            <Image
              source={{
                uri: cast.profile_path
                  ? `https://image.tmdb.org/t/p/original/${cast.profile_path}`
                  : 'https://img.freepik.com/free-vector/actor-holding-star-trophy-cartoon-icon_24908-10408.jpg',
              }}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={[styles.castName, { color: isDark ? colors.white : colors.black }]}>{cast.name}</Text>
            <Text style={[styles.role, { color: isDark ? colors.white : colors.black }]}>
              {cast.character ? cast.character : cast.known_for_department}
            </Text>
          </TouchableOpacity>
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
    fontWeight: 'bold',
    letterSpacing: 1,
    fontStyle: 'italic',
    textAlign: 'center',
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
    justifyContent: 'space-between',
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
  castingCard: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginTop: 18,
    margin: 8,
  },
  actorName: {
    textAlign: 'center',
    fontSize: 15,
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    margin: 5,
  },
  castName: {
    width: 100,
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5,
  },
  role: {
    width: 100,
    fontSize: 12,
    margin: 5,
  },
});
