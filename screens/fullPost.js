import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {authUserContext} from '../contexts/authUserContext';

//Components
import PostFooter from '../components/footers/post';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Fullpost = ({route, navigation}) => {
  const {imageUrls, title, description, id} = route.params;
  const {authUser} = React.useContext(authUserContext);

  const [like, setLike] = React.useState(false);
  const [totalLikes, setTotalLikes] = React.useState(0);

  const setMainLike = () => {
    if (like) {
      firestore()
        .collection('posts')
        .doc(id)
        .update({
          likes: firestore.FieldValue.arrayRemove(authUser.uid),
        });
    } else {
      firestore()
        .collection('posts')
        .doc(id)
        .update({
          likes: firestore.FieldValue.arrayUnion(authUser.uid),
        });
    }
  };

  React.useEffect(() => {
    if (authUser) {
      const subscriber = firestore()
        .collection('posts')
        .doc(id)
        .onSnapshot(documentSnapshot => {
          documentSnapshot.data().likes.find(id => id === authUser.uid)
            ? setLike(true)
            : setLike(false);
          setTotalLikes(documentSnapshot.data().likes);
        });
      return () => subscriber();
    }
  }, [authUser.uid]);

  const _renderItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.num}>
          <Text style={styles.num_text}>
            {index + 1} / {imageUrls.length}
          </Text>
        </View>
        <Image style={styles.sub_main} source={{uri: item}} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} scrollEnabled>
      <FlatList
        data={imageUrls}
        decelerationRate="fast"
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        disableintervalmomentum={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
      />

      <View style={styles.description}>
        <View style={styles.heading}>
          <Text style={styles.heading_text}>{title}</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.paragraph_text}>{description}</Text>
        </View>
      </View>
      <PostFooter
        totalLikes={totalLikes}
        id={id}
        like={like}
        setLike={() => {
          setMainLike();
          setLike(prev => !prev);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sub_main: {
    height: windowHeight / 2,
    width: windowWidth,
  },

  num: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 10,
  },
  num_text: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
  },
  description: {
    padding: 10,
  },
  heading: {
    padding: 10,
  },
  heading_text: {
    fontSize: 21,
    color: '#282c40',
    fontFamily: 'Nunito-Bold',
  },
  paragraph: {
    padding: 10,
  },
  paragraph_text: {
    fontSize: 14,
    color: '#282c40',
    fontFamily: 'Nunito-Regular',
  },
});

export default Fullpost;
