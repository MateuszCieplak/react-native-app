import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ShowMore'>;

type Props = {
  placeholderText: string;
};

const ShowMoreSearchBar = ({ placeholderText }: Props) => {
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
            placeholder={placeholderText}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={onSubmit}
            style={styles.input}
            returnKeyType="search"
          />
        </View>
      </View>
  );
};

export default ShowMoreSearchBar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingTop: 40,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2B2D42',
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  input: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#2B2D42',
    marginLeft: 12,
  },
});
