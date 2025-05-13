import { YOUTUBE_API_KEY } from '@env';
import { mockYouTubeResponse } from '../types/mockData';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideosByQuery = async (query: string, sort: string = 'relevance') => {
  const searchResponse = await fetch(
    `${BASE_URL}/search?part=snippet&type=video&maxResults=25&order=${sort}&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`
  );

  if (!searchResponse.ok) {
    console.error('YouTube API search error:', await searchResponse.text());
    throw new Error('Failed to fetch videos');
  }

  const searchData = await searchResponse.json();
  const videoItems = searchData.items;

  const videoIds = videoItems.map((item: any) => item.id.videoId).join(',');

  const detailsResponse = await fetch(
    `${BASE_URL}/videos?part=statistics,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`
  );

  if (!detailsResponse.ok) {
    console.error('YouTube API video details error:', await detailsResponse.text());
    throw new Error('Failed to fetch video details');
  }

  const detailsData = await detailsResponse.json();

  return detailsData.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    publishedAt: item.snippet.publishedAt,
    viewCount: parseInt(item.statistics?.viewCount) || Math.floor(Math.random() * 100000),
    likes: parseInt(item.statistics?.likeCount) || Math.floor(Math.random() * 1000),
    snippet: item.snippet,
  }));
};

export const fetchMockVideosByQuery = async (query: string, sort: string = 'date') => {
  // Filtrowanie według kategorii (czyli query)
  const filteredItems = mockYouTubeResponse.items.filter(
    (item) => item.category.toLowerCase() === query.toLowerCase()
  );

  // Sortowanie
  let sortedItems = [...filteredItems];
  if (sort === 'date') {
    sortedItems.sort(
      (a, b) =>
        new Date(b.snippet.publishedAt).getTime() -
        new Date(a.snippet.publishedAt).getTime()
    );
  } else if (sort === 'viewCount') {
    sortedItems.sort((a, b) => b.viewCount - a.viewCount);
  }

  // Transformacja do finalnego formatu
  return sortedItems.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    publishedAt: item.snippet.publishedAt,
    viewCount: item.viewCount || Math.floor(Math.random() * 100000), // jeśli brak, to testowy
    snippet: item.snippet,
    likes: item.likes,
  }));
};
