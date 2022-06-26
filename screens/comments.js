import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  SectionList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';

import {userContext} from '../contexts/userContext';
import {authUserContext} from '../contexts/authUserContext';

//Component
import ListItem from '../components/listItems/comments';

const defaultImg =
  'https://secondchancetinyhomes.org/wp-content/uploads/2016/09/empty-profile.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Comments({route, navigation}) {
  const [comment, onChangeComment] = React.useState('');
  const {user} = React.useContext(userContext);
  const {authUser} = React.useContext(authUserContext);
  const [allComments, setAllComments] = React.useState(null);
  const id = route.params;

  React.useEffect(() => {
    if (authUser) {
      const subscriber = firestore()
        .collection('posts')
        .doc(id)
        .onSnapshot(documentSnapshot => {
          setAllComments(documentSnapshot.data().comments);
        });
      return () => subscriber();
    }
  }, [authUser.uid]);

  const newComment = () => {
    const commentData = {
      name: user.name,
      message: comment,
      dp: user.dp ? user.dp : defaultImg,
      created: new Date(),
      uid: authUser.uid,
      pid: id,
    };

    firestore()
      .collection('posts')
      .doc(id)
      .update({
        comments: firestore.FieldValue.arrayUnion(commentData),
      });

    onChangeComment('');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 0.9}}>
        {allComments && allComments.length ? (
          <FlatList
            data={allComments}
            renderItem={({item, index}) => (
              <ListItem item={item} index={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text
            style={{
              ...styles.comment_text,
              padding: 20,
              textAlign: 'center',
            }}>
            No Comments
          </Text>
        )}
      </View>
      <View style={styles.comment_box}>
        <TextInput
          style={styles.comment_text_box}
          onChangeText={onChangeComment}
          value={comment}
          placeholderTextColor={'#7f7f7f'}
          placeholder="Add Comment ..."
        />
        <TouchableOpacity
          disabled={!comment ? true : false}
          onPress={() => newComment()}>
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="ios-paper-plane-outline"
              color={comment ? '#000' : '#cccccc'}
              size={25}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: windowWidth / 1.1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  details: {
    width: windowWidth / 1.4,
  },
  dp: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
  dp_text: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 14.5,
  },
  comment_text: {
    fontFamily: 'Nunito-Regular',
    color: '#282c40',
    fontSize: 14,
  },
  options: {
    flexDirection: 'row',
    width: windowWidth / 4,
    marginTop: 14,
    justifyContent: 'space-between',
  },
  time_text: {
    fontFamily: 'Nunito-SemiBold',
  },
  comment_box: {
    flex: 0.12,
    paddingLeft: 30,
    paddingRight: 20,
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  comment_text_box: {
    fontFamily: 'Nunito-Regular',
    color: '#282c40',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 30,
    paddingLeft: 20,
    width: windowWidth / 1.3,
    paddingRight: 20,
    height: 42,
  },
});
