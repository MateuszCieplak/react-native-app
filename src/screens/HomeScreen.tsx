import React from 'react';
import { fetchMockVideosByQuery } from '../services/youtube';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import SearchBar from '../components/SearchBar';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const categories = ['React Native', 'React', 'TypeScript', 'JavaScript'];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [videosByCategory, setVideosByCategory] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    const loadVideos = async () => {
      const allData: { [key: string]: any[] } = {};
      for (const category of categories) {
        try {
          const videos = await fetchMockVideosByQuery(category);
          allData[category] = videos;
        } catch (err) {
          console.error('Error fetching for category:', category, err);
        }
      }
      setVideosByCategory(allData);
    };
  
    loadVideos();
  }, []);

    const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar />
      {categories.map((category, index) => (
        <View key={category} style={styles.section}>
          <View style={[
            styles.headerRow,
            index === 0 && { borderTopWidth: 0 },
            ]}>
            <Text style={styles.category}>{category}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ShowMore', { query: category })
              }
            >
              <Text style={styles.showMore}>Show more</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={videosByCategory[category] || []}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.videoCard}
                onPress={() => navigation.navigate('VideoDetail', {
                title: item.title,
                channelName: item.channelTitle,
                description: item.description,
                viewCount: item.viewCount, 
                likes: item.likes,
            })}
              >
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <Text numberOfLines={2} style={styles.videoTitle}>{item.title}</Text>
              <Text style={styles.videoDate}>{formatDate(item.snippet.publishedAt)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    boxSizing: 'border-box',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 24,
    borderTopWidth: 2,
    borderTopColor: '#2B2D42',
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  showMore: {
    textDecorationLine: 'underline',
    color: '#2B2D42',
    fontSize: 12,
  },
  videoCard: {
    padding: 24,
    borderRadius: 16,
    marginRight: 10,
    width: 200,
  },
  thumbnail: {
    width: 180,
    height: 120,
    borderRadius: 16,
    marginBottom: 8,
  },
  videoTitle: {
    fontFamily: 'Poppins_500Medium',
    color: '#2B2D42',
    letterSpacing: 0.12,
    fontSize: 12,
    marginBottom: 4,
  },
  videoDate: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    textAlign: 'left',
    color: '#2B2D42',
  }
});
