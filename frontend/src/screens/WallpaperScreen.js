import React from 'react';
import { View, StyleSheet, Share } from 'react-native';
import WallpaperGrid from '../components/WallpaperGrid';

const WallpaperScreen = ({ route }) => {
  const { wallpapers } = route.params;

  const handleWallpaperPress = async (wallpaper) => {
    try {
      await Share.share({
        url: wallpaper, // iOS
        message: wallpaper, // Android
      });
    } catch (error) {
      console.error('Error sharing wallpaper:', error);
      alert('Failed to share wallpaper');
    }
  };

  return (
    <View style={styles.container}>
      <WallpaperGrid 
        wallpapers={wallpapers} 
        onWallpaperPress={handleWallpaperPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default WallpaperScreen;