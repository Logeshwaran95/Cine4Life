//default apis
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//using searchbar of react native elements 
import { SearchBar } from 'react-native-elements';

//color palette
import colors from '../Config/colors';


const SwitchComponent = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Search Movies ..."
        onChangeText={updateSearch}
        value={search}
        inputContainerStyle={{ backgroundColor: colors.light,height:30}}
        placeholderTextColor="gray"
        containerStyle={{ backgroundColor: colors.light,marginHorizontal:20}}
        inputStyle={{}}
        showLoading={true}
      />
    </View>
  );
};

export default SwitchComponent;

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

