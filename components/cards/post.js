import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SocialIcon} from 'react-native-elements';
import LottieView from 'lottie-react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';

import {authUserContext} from '../../contexts/authUserContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Post({item, index}) {
  const [like, setLike] = React.useState(false);
  const {authUser} = React.useContext(authUserContext);

  const navigation = useNavigation();
  const heartAnimation = React.useRef(null);

  const setMainLike = () => {
    if (like) {
      firestore()
        .collection('posts')
        .doc(item.id)
        .update({
          likes: firestore.FieldValue.arrayRemove(authUser.uid),
        });
    } else {
      firestore()
        .collection('posts')
        .doc(item.id)
        .update({
          likes: firestore.FieldValue.arrayUnion(authUser.uid),
        });
    }
  };

  React.useEffect(() => {
    if (authUser) {
      const subscriber = firestore()
        .collection('posts')
        .doc(item.id)
        .onSnapshot(documentSnapshot => {
          documentSnapshot.data().likes.find(id => id === authUser.uid)
            ? setLike(true)
            : setLike(false);
        });
      return () => subscriber();
    }
  }, [authUser.uid]);

  const TimeDifference = () => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    let current = new Date();
    let elapsed = current - item.created.toDate();

    if (elapsed < msPerMinute) {
      return (
        <Text style={styles.time_text}>
          {Math.round(elapsed / 1000)} seconds ago
        </Text>
      );
    } else if (elapsed < msPerHour) {
      return (
        <Text style={styles.time_text}>
          {Math.round(elapsed / msPerMinute)} minutes ago
        </Text>
      );
    } else if (elapsed < msPerDay) {
      return (
        <Text style={styles.time_text}>
          {Math.round(elapsed / msPerHour)} hours ago
        </Text>
      );
    } else if (elapsed < msPerMonth) {
      return (
        <Text style={styles.time_text}>
          {Math.round(elapsed / msPerDay)} days ago
        </Text>
      );
    } else if (elapsed < msPerYear) {
      return (
        <Text style={styles.time_text}>
          {Math.round(elapsed / msPerMonth)} months ago
        </Text>
      );
    } else {
      return (
        <Text style={styles.time_text}>
          {Math.round(elapsed / msPerYear)} years ago
        </Text>
      );
    }
  };

  return (
    <View style={styles.card}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Post', item)}>
        <View style={styles.main}>
          <View>
            <Image style={styles.sub_main} source={{uri: item.imageUrls[0]}} />
            {/* <View style={styles.profile}>
              <View>
                <Image
                  style={styles.dp}
                  source={require('../../assets/temp/profile.jpg')}
                />
              </View>
            </View> */}
            <View style={styles.overlay} />
            <View style={styles.title}>
              <Text style={styles.title_text}>{item.title}</Text>

              <TimeDifference />

              <View style={styles.options}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (!like) heartAnimation.current.play();
                    setMainLike();
                    setLike(prev => !prev);
                  }}>
                  <View style={styles.options_icons}>
                    {like ? (
                      <Ionicons name="ios-heart" size={25} color="#e7525b" />
                    ) : (
                      <Ionicons
                        name="ios-heart-outline"
                        size={25}
                        color="#fff"
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <LottieView
              ref={heartAnimation}
              source={require('../../assets/animations/heart.json')}
              autoPlay={false}
              speed={2}
              loop={false}
              style={styles.animation}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: windowHeight / 2,
    width: windowWidth,
    marginTop: 20,
  },

  main: {
    alignItems: 'center',
  },
  animation: {
    height: windowHeight / 2.2,
    width: windowWidth / 1.05,
    zIndex: 1,
    position: 'absolute',
  },
  sub_main: {
    height: windowHeight / 2,
    width: windowWidth / 1.05,
    borderRadius: 5,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: windowHeight / 2,
    width: windowWidth / 1.05,
    borderRadius: 5,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    position: 'absolute',
    padding: 25,
    bottom: 10,
  },
  title_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 21,
    color: '#ffffff',
  },
  options_icons: {
    marginTop: 10,
    zIndex: 100,
  },

  // profile: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   top: 10,
  //   padding: 20,
  //   zIndex: 100,
  // },
  // dp: {
  //   height: 35,
  //   width: 35,
  //   borderRadius: 100,
  // },
  time_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    marginTop: 5,
    color: '#fff',
  },
});
