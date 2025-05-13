import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { fetchMockVideosByQuery } from '../services/youtube';
import ShowMoreSearchBar from '../components/ShowMoreSearchBar';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type ShowMoreRouteProp = RouteProp<RootStackParamList, 'ShowMore'>;

const sortOptions = [
  { label: 'latest', value: 'date' },
  { label: 'oldest', value: 'oldest' }, // niestandardowe, trzeba sortować lokalnie
  { label: 'most popular', value: 'viewCount' },
];

export default function ShowMoreScreen() {
  const route = useRoute<ShowMoreRouteProp>();
  const category = route.params?.query || '';
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<string>('date');

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const result = await fetchMockVideosByQuery(category, sort === 'oldest' ? 'date' : sort);
        const sorted = sort === 'oldest'
          ? result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
          : result;
        setVideos(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [category, sort]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ShowMoreSearchBar placeholderText={category}/>
      <Text style={styles.searchResultText}>{videos.length} results found for: {''}
        <Text style={styles.category}>
          “{category}” 
        </Text>
      </Text>
      <View style={styles.sortContainer}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => setSort(option.value)}
            style={[
              styles.sortButton,
              sort === option.value && styles.sortButtonActive,
            ]}
          >
            <Text style={[
                styles.sortText,
                sort === option.value && styles.sortTextActive,
                ]}>Sort date: {option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2B2D42" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.videoCard} 
            onPress={() => navigation.navigate('VideoDetail', {
                title: item.title,
                channelName: item.channelTitle,
                description: item.description,
                viewCount: item.viewCount, 
                likes: item.likes,
            })}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <Text style={styles.title}>{item.channelTitle}</Text>
              <Text style={styles.description}>{item.title}</Text>
              <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 24,
  },
  searchResultText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    marginBottom: 10,
  },
  category: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortButton: {
    display: 'flex',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2B2D42',
    borderRadius: 16,
  },
  sortButtonActive: {
    backgroundColor: '#2B2D42',
  },
  sortText: {
    fontSize: 12,
    color: '#2B2D42',
  },
  sortTextActive: {
    color: '#FFFFFF',
  },
  videoCard: {
    marginBottom: 16,
    paddingBottom: 12,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    fontWeight: '500',
    color: '#2B2D42',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#2B2D42',
  },
  date: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: '#2B2D42',
    textAlign: 'right',
  },
});
