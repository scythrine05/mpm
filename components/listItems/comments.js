import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';

import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {authUserContext} from '../../contexts/authUserContext';

// const Reply = ({item}) => {
//   return (
//     <View>
//       <View style={styles.main}>
//         <View style={styles.profile}>
//           <View>
//             <Image
//               style={styles.dp}
//               source={require('../../assets/temp/profile.jpg')}
//             />
//           </View>
//           <View style={styles.details}>
//             <Text style={styles.dp_text}>
//               {item.name}
//               <Text style={styles.comment_text}>
//                 {'   '}
//                 {item.message}
//               </Text>
//             </Text>
//             <View style={styles.options}>
//               <Text style={styles.time_text}>2h ago</Text>
//               <Text style={styles.reply_text}>Reply</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

export default function Comments({item, index}) {
  const [showR, setShowR] = React.useState(false);
  const {authUser} = React.useContext(authUserContext);

  const deleteComment = () => {
    firestore()
      .collection('posts')
      .doc(item.pid)
      .update({
        comments: firestore.FieldValue.arrayRemove(item),
      });
  };

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
    <View style={styles.main}>
      <View style={styles.profile}>
        <View>
          <Image style={styles.dp} source={{uri: item.dp}} />
        </View>
        <View style={styles.details}>
          <Text style={styles.dp_text}>
            {item.name}
            <Text style={styles.comment_text}>
              {'   '}
              {item.message}
            </Text>
          </Text>
          <View style={styles.options}>
            <TimeDifference />
            {authUser.uid === item.uid ? (
              <TouchableOpacity onPress={() => deleteComment()}>
                <Text style={styles.reply_text}> delete </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>

          {/* Reply Section */}

          {/* {showR ? (
            <SafeAreaView style={styles.replySection}>
              <FlatList
                data={item.replies}
                renderItem={({item, index}) => (
                  <Reply item={item} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </SafeAreaView>
          ) : (
            <></>
          )}

          {item.replies.length > 0 ? (
            <TouchableWithoutFeedback onPress={() => setShowR(prev => !prev)}>
              <View style={styles.replies}>
                <View
                  style={{
                    borderBottomColor: '#d8d8d8',
                    borderBottomWidth: 1,
                    marginTop: 20,
                  }}
                />

                {showR ? (
                  <Text style={styles.reply_text_2}>
                    Hide {item.replies.length == 1 ? ' Reply' : ' Replies'}
                  </Text>
                ) : (
                  <Text style={styles.reply_text_2}>
                    Show{' '}
                    {item.replies.length == 1
                      ? item.replies.length + ' Reply'
                      : item.replies.length + ' Replies'}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <></>
          )} */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginBottom: 20,
    alignItems: 'center',
  },
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
    width: windowWidth / 2.5,
    marginTop: 14,
    justifyContent: 'space-between',
  },
  replySection: {
    marginTop: 20,
  },
  time_text: {
    fontFamily: 'Nunito-SemiBold',
    color: '#4f4f4f',
  },
  reply_text: {
    fontFamily: 'Nunito-SemiBold',
    color: '#4f4f4f',
  },
  reply_text_2: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#4f4f4f',
  },
  replies: {
    flexDirection: 'column',
  },
});
