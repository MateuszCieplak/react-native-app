import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import type { RootStackParamList } from '../navigation/AppNavigator';

type VideoDetailRouteProp = RouteProp<RootStackParamList, 'VideoDetail'>;

export default function VideoDetailScreen() {
  const route = useRoute<VideoDetailRouteProp>();
  const navigation = useNavigation();
  const { title, channelName, description, viewCount, likes } = route.params;

  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isPlaying) {
        videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = async () => {
    if (videoRef.current) {
      setIsMuted((prev) => !prev);
      await videoRef.current.setIsMutedAsync(!isMuted);
    }
  };

  const skipForward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.positionMillis != null && status.durationMillis != null) {
        videoRef.current.setPositionAsync(Math.min(status.positionMillis + 10000, status.durationMillis));
      }
    }
  };

  const skipBackward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.positionMillis != null) {
        videoRef.current.setPositionAsync(Math.max(status.positionMillis - 10000, 0));
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={require('../assets/video/broadchurch.mp4')}
          style={styles.video}
          resizeMode="cover"
          isMuted={isMuted}
          shouldPlay={false}
          useNativeControls={false}
        />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons/back-icon.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
          <Image source={require('../assets/icons/volume-icon.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.airPlay} onPress={() => {}}>
          <Image source={require('../assets/icons/airplay-icon.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backwardButton} onPress={skipBackward}>
          <Image source={require('../assets/icons/backward-icon.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
          <Image source={require('../assets/icons/play-icon.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.forwardButton} onPress={skipForward}>
          <Image source={require('../assets/icons/forward-icon.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fullscreenButton} onPress={() => {}}>
          <Image source={require('../assets/icons/fullscreen-icon.png')} />
        </TouchableOpacity>
      </View>

      {/* Reszta ekranu */}
      <View style={styles.videoDetail}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.channelDetail}>
          <Image source={require('../assets/icons/channel-name.png')} style={styles.channelProfile} />
          <Text style={styles.channelName}>{channelName}</Text>
        </View>
        <View style={styles.videoDesription}>
          <Text style={styles.titleDetail}>Description</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.titleDetail}>Statistics</Text>
          <View style={styles.statistics}>
            <View style={styles.statisticsDetail}>
              <Image source={require('../assets/icons/views-icon.png')} style={styles.statisticsIcon} />
              <Text style={styles.statisticsText}>{viewCount} views</Text>
            </View>
            <View style={styles.statisticsDetail}>
              <Image source={require('../assets/icons/likes-icon.png')} style={styles.statisticsIcon} />
              <Text style={styles.statisticsText}>{likes} likes</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2B2D42',
  },
  videoDetail: { 
    paddingHorizontal: 24, 
    paddingTop: 20 
  },
  channelDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  channelProfile: { 
    width: 48, 
    height: 48 
  },
  channelName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#2B2D42',
    paddingLeft: 12,
  },
  videoDesription: {},
  titleDetail: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 12,
    marginBottom: 16,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statisticsDetail: {
    width: 136,
    backgroundColor: '#2B2D42',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  statisticsIcon: {
    width: 15,
    height: 15,
    marginRight: 12,
  },
  statisticsText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    lineHeight: 12,
    color: '#FFFFFF',
  },
  videoContainer: {
    height: 280,
    position: 'relative',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#00000040',
    borderRadius: 16,
    padding: 8,
  },
  muteButton: {
    position: 'absolute',
    top: 16,
    right: 52,
    backgroundColor: '#00000040',
    borderRadius: 16,
    padding: 8,
  },
  airPlay: {
    position: 'absolute',
    top: 16,
    right: 12,
    backgroundColor: '#00000040',
    borderRadius: 16,
    padding: 8,
  },
  playButton: {
    backgroundColor: '#00000040',
    borderRadius: 20,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backwardButton: {
    position: 'absolute',
    top: '50%',
    left: 50,
    backgroundColor: '#00000040',
    borderRadius: 16,
    padding: 8,
    transform: [{ translateY: -16 }],
  },
  forwardButton: {
    position: 'absolute',
    top: '50%',
    right: 50,
    backgroundColor: '#00000040',
    borderRadius: 16,
    padding: 8,
    transform: [{ translateY: -16 }],
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 12,
    right: 10,
    padding: 8,
  },
});
