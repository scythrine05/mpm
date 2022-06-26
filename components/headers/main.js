import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';

import MaterialIconsMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Main(props) {
  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <View>
          <View>
            <Image
              style={styles.logo}
              source={require('../../assets/logo/logo.png')}
            />
          </View>
        </View>
        <View>
          <Text style={styles.route_text}>{props.route.name}</Text>
        </View>
        <View style={styles.each_option}>
          {/* <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#a9a9a9', true)}> */}
          <View style={{padding: 4}}>
            <MaterialIconsMaterialIcons
              name="language"
              color="#282c40"
              size={23}
            />
          </View>
          {/* </TouchableNativeFeedback> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sub_container: {
    paddingLeft: 15,
    paddingRight: 15,
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
    opacity: 0,
  },
  logo: {
    height: 40,
    width: 40,
  },
  options: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
