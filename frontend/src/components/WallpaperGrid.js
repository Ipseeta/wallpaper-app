import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const WallpaperGrid = ({ wallpapers, onWallpaperPress }) => {
  return (
    <View style={styles.container}>
      {wallpapers.map((wallpaper, index) => (
        <TouchableOpacity
          key={index}
          style={styles.wallpaperContainer}
          onPress={() => onWallpaperPress(wallpaper)}
        >
          <Image
            source={{ uri: wallpaper }}
            style={styles.wallpaper}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  wallpaperContainer: {
    width: (Dimensions.get('window').width - 30) / 2,
    marginBottom: 10,
  },
  wallpaper: {
    width: '100%',
    height: (Dimensions.get('window').width - 30) / 2 * 1.75,
    borderRadius: 8,
  },
});

export default WallpaperGrid;
