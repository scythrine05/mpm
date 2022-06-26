import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {SocialIcon} from 'react-native-elements';
import LottieView from 'lottie-react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Post({item}) {
  const [highlight, setHightlight] = React.useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <TouchableNativeFeedback onPress={() => navigation.navigate('Post')}>
        <View style={styles.main}>
          {/* <Image
            style={styles.sub_main}
            source={require('../../assets/temp/main4.jpg')}
          /> */}
          <View style={styles.title}>
            <Text style={styles.title_text}>
              Lipsum generator: Lorem Ipsum - All the facts ....
            </Text>
            <Text style={styles.time_text}>25 mins ago</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: windowHeight / 9,
    width: windowWidth,
    marginTop: 20,
  },
  main: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  sub_main: {
    height: 65,
    width: 65,
    borderRadius: 5,
  },
  title: {
    bottom: 10,
    marginLeft: 10,
    width: windowWidth / 1.6,
  },
  title_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#282c40',
  },
  time_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    marginTop: 5,
    color: '#282c40',
  },
});
