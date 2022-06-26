import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Likes(props) {
  return (
    <View style={styles.main}>
      <View style={styles.profile}>
        <View>
          <Image
            style={styles.dp}
            source={require('../../assets/temp/profile.jpg')}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.dp_text}>{props.name}</Text>
          <Text style={styles.dp_description}>{props.name}</Text>
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
  dp: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  dp_text: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 16,
  },
  dp_description: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#4f4f4f',
  },
});
