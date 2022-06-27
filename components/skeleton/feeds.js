import {View, Text, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function profile() {
  return (
    <SkeletonPlaceholder>
      <View style={styles.container}>
        <View style={styles.card} />
      </View>
      <View style={styles.container}>
        <View style={styles.card} />
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight / 2,
    width: windowWidth,
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    height: windowHeight / 2,
    width: windowWidth / 1.05,
    borderRadius: 5,
  },
});
