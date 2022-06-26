import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Post = props => {
  const navigation = useNavigation();
  const refRBSheet = React.useRef();
  return (
    <View>
      <View style={styles.footer}>
        <View style={styles.options}>
          <View style={styles.likes}>
            <TouchableOpacity onPress={props.setLike}>
              <View>
                {props.like ? (
                  <Ionicons name="heart" color="#e7525b" size={26} />
                ) : (
                  <Ionicons name="heart-outline" color="#282c40" size={26} />
                )}
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.like_text}>{props.totalLikes.length}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Comments', props.id)}>
            <View style={styles.comments}>
              <View>
                <Ionicons
                  name="ios-chatbubble-outline"
                  color="#282c40"
                  size={24}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom_sheet_text: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    paddingLeft: windowWidth / 20,
    paddingRight: windowWidth / 20,
    paddingTop: 16,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comments: {
    marginLeft: 20,
  },
  bookmark: {
    marginLeft: 30,
  },
  like_text: {
    fontFamily: 'Nunito-Bold',
    color: '#000',
    marginLeft: 10,
    fontSize: 13,
  },
  comment_text: {
    fontFamily: 'Nunito-Bold',
    color: '#000',
    marginLeft: 10,
    fontSize: 13,
  },
});

export default Post;
