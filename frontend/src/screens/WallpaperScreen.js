import React from 'react';
import { View, StyleSheet, Share, Alert, Platform } from 'react-native';
import RNShare from 'react-native-share';
import RNFetchBlob from 'react-native-blob-util';
import WallpaperGrid from '../components/WallpaperGrid';

const WallpaperScreen = ({ route }) => {
  const { wallpapers } = route.params;

  const downloadAndShare = async (wallpaper) => {
    try {
      const options = {
        title: 'Choose an action',
        message: 'What would you like to do with this wallpaper?',
        buttons: [
          'Download',
          'Share',
          'Cancel'
        ],
        cancelButtonIndex: 2
      };

      Alert.alert(options.title, options.message, [
        {
          text: 'Download',
          onPress: () => downloadWallpaper(wallpaper)
        },
        {
          text: 'Share',
          onPress: () => shareWallpaper(wallpaper)
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to process wallpaper');
    }
  };

  const downloadWallpaper = async (url) => {
    try {
      const date = new Date();
      const { config, fs } = RNFetchBlob;
      const downloadDir = Platform.select({
        ios: fs.dirs.DocumentDir,
        android: fs.dirs.DownloadDir
      });
      
      const fileName = `wallpaper-${date.getTime()}.jpg`;
      const filePath = `${downloadDir}/${fileName}`;

      const configOptions = Platform.select({
        ios: {
          fileCache: true,
          path: filePath,
          appendExt: 'jpg',
        },
        android: {
          fileCache: true,
          path: filePath,
          appendExt: 'jpg',
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: filePath,
            description: 'Wallpaper download',
            mime: 'image/jpeg',
            mediaScannable: true,
          },
        },
      });

      const response = await RNFetchBlob.config(configOptions).fetch('GET', url);
      
      if (Platform.OS === 'ios') {
        // For iOS, we need to save to photo library
        await RNFetchBlob.ios.previewDocument(response.path());
      }

      Alert.alert(
        'Success',
        'Wallpaper downloaded successfully! You can find it in your gallery/downloads.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download wallpaper');
    }
  };

  const shareWallpaper = async (url) => {
    try {
      await Share.share({
        url: url, // iOS
        message: url, // Android
      });
    } catch (error) {
      console.error('Error sharing wallpaper:', error);
      Alert.alert('Error', 'Failed to share wallpaper');
    }
  };

  return (
    <View style={styles.container}>
      <WallpaperGrid 
        wallpapers={wallpapers} 
        onWallpaperPress={downloadAndShare}
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