import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Main(props) {
  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <View style={styles.options}>{/* Extra Space */}</View>
        <View>
          <Text style={styles.route_text}>{props.route.name}</Text>
        </View>
        <View style={styles.options}>{/* Extra Space */}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sub_container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight / 12,
  },
  route_text: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 18,
  },
  each_option: {
    borderRadius: 50,
  },
  logo: {
    height: 40,
    width: 40,
  },
});
