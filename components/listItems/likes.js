import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Likes({item}) {
  return (
    <View style={styles.main}>
      <View style={styles.profile}>
        <View>
          {/* <Image
            style={styles.dp}
            source={require('../../assets/temp/profile.jpg')}
          /> */}
        </View>
        <View style={styles.details}>
          <Text style={styles.dp_text}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.time}>
        <Text style={styles.time_text}>2h ago</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: windowHeight / 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: windowWidth / 20,
    paddingRight: windowWidth / 20,
    marginBottom: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dp: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  dp_text: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 14.5,
  },
  time_text: {
    fontFamily: 'Nunito-SemiBold',
  },
  details: {
    alignItems: 'center',
    marginLeft: 10,
  },
});
