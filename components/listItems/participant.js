import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Participants({item}) {
  return (
    <View style={styles.main}>
      <View style={styles.profile}>
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.about}>{item.about}</Text>
          <Text style={styles.place}>{item.place}</Text>
        </View>
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
  details: {
    marginLeft: 10,
  },
  name: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 14.5,
  },
  about: {
    fontFamily: 'Nunito-Regular',
    color: '#282c40',
  },
  place: {
    fontFamily: 'Nunito-Regular',
    color: '#4f4f4f',
    fontSize: 12,
  },
});
