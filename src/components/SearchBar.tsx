import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ShowMore'>;

const SearchBar = () => {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');

  const onSubmit = () => {
    if (query.trim()) {
      navigation.navigate('ShowMore', { query });
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Image source={require('../assets/icons/search-icon.png')} />
          <TextInput
            placeholder="Search for videos"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={onSubmit}
            style={styles.input}
            returnKeyType="search"
          />
        </View>
        <Image source={require('../assets/icons/settings-icon.png')} />
      </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchBar: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2B2D42',
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 16,
    marginLeft: 12,
    color: '#2B2D4299',
  },
  settingIcon: {
    width: 32,
    height: 32,
  }
});
