export const mockYouTubeResponse = {
  items: [
    // React Native
    ...Array.from({ length: 10 }, (_, i) => {
      const viewCount = Math.floor(Math.random() * 100000);
      return {
        id: { videoId: `rn-${i + 1}` },
        snippet: {
          title: `React Native Tutorial #${i + 1}`,
          description: `Opis React Native Tutorial #${i + 1}`,
          channelTitle: `Kanał React Native ${i + 1}`,
          thumbnails: {
            medium: {
              url: `https://placehold.co/320x180?text=ReactNative+${i + 1}`,
            },
          },
          publishedAt: `2023-12-${String(i + 1).padStart(2, '0')}T10:00:00Z`,
        },
        category: 'React Native',
        viewCount,
        likes: Math.floor(viewCount / 10),
      };
    }),

    // React
    ...Array.from({ length: 10 }, (_, i) => {
      const viewCount = Math.floor(Math.random() * 100000);
      return {
        id: { videoId: `react-${i + 1}` },
        snippet: {
          title: `React Basics #${i + 1}`,
          description: `Opis React Native Tutorial #${i + 1}`,
          channelTitle: `Kanał React Native ${i + 1}`,
          thumbnails: {
            medium: {
              url: `https://placehold.co/320x180?text=React+${i + 1}`,
            },
          },
          publishedAt: `2024-01-${String(i + 1).padStart(2, '0')}T09:00:00Z`,
        },
        category: 'React',
        viewCount,
        likes: Math.floor(viewCount / 10),
      };
    }),

    // TypeScript
    ...Array.from({ length: 10 }, (_, i) => {
      const viewCount = Math.floor(Math.random() * 100000);
      return {
        id: { videoId: `ts-${i + 1}` },
        snippet: {
          title: `TypeScript Guide #${i + 1}`,
          description: `Opis React Native Tutorial #${i + 1}`,
          channelTitle: `Kanał React Native ${i + 1}`,
          thumbnails: {
            medium: {
              url: `https://placehold.co/320x180?text=TypeScript+${i + 1}`,
            },
          },
          publishedAt: `2024-02-${String(i + 1).padStart(2, '0')}T12:00:00Z`,
        },
        category: 'TypeScript',
        viewCount,
        likes: Math.floor(viewCount / 10),
      };
    }),

    // JavaScript
    ...Array.from({ length: 10 }, (_, i) => {
      const viewCount = Math.floor(Math.random() * 100000);
      return {
        id: { videoId: `js-${i + 1}` },
        snippet: {
          title: `JavaScript Deep Dive #${i + 1}`,
          description: `Opis React Native Tutorial #${i + 1}`,
          channelTitle: `Kanał React Native ${i + 1}`,
          thumbnails: {
            medium: {
              url: `https://placehold.co/320x180?text=JavaScript+${i + 1}`,
            },
          },
          publishedAt: `2024-03-${String(i + 1).padStart(2, '0')}T14:00:00Z`,
        },
        category: 'JavaScript',
        viewCount,
        likes: Math.floor(viewCount / 10),
      };
    }),
  ],
};
