import {View, Text, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function profile() {
  return (
    <SkeletonPlaceholder>
      <View style={styles.card}>
        <View style={styles.sub_main} />
      </View>
      <View style={styles.card}>
        <View style={styles.sub_main} />
      </View>
      <View style={styles.card}>
        <View style={styles.sub_main} />
      </View>
      <View style={styles.card}>
        <View style={styles.sub_main} />
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  card: {
    height: windowHeight / 3.1,
    width: windowWidth,
    alignItems: 'center',
  },

  main: {},
  sub_main: {
    height: windowHeight / 3.5,
    width: windowWidth / 1.05,
    borderRadius: 5,
    padding: 20,
    justifyContent: 'space-around',
  },
});
