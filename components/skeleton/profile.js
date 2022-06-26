import {View, Text, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function profile() {
  return (
    <SkeletonPlaceholder>
      <View style={styles.profile}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.dp} />
          <View style={styles.location}></View>
        </View>
      </View>
      <View style={styles.options}>
        <View style={styles.each}></View>
        <View style={styles.each}></View>
        <View style={styles.each}></View>
        <View style={styles.each}></View>
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  profile: {
    height: windowHeight / 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  location: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dp: {
    marginBottom: 50,
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  options: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  each: {
    marginBottom: 20,
    height: windowHeight / 15,
    width: windowWidth / 1.2,
    borderRadius: 10,
  },
});
