import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';

import Ionicons from 'react-native-vector-icons/Ionicons';

//Components
import PostFooter from '../components/footers/post';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const FullMeeting = ({route}) => {
  const item = route.params;

  const date = item.date.toDate();

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} scrollEnabled>
      <View style={styles.description}>
        <View style={styles.heading}>
          <Text style={styles.heading_text}>{item.title}</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.paragraph_text}>{item.description}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Participants', item)}>
          <View style={styles.participants}>
            <Ionicons
              name="person"
              size={18}
              color="#282c40"
              // style={{alignSelf: 'flex-start'}}
            />
            <Text style={styles.participants_text}>
              {item.people.length} people
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.schedule}>
          <Text style={styles.schedule_text_mon}>
            {date.getDate()} {month[date.getMonth()]} {date.getFullYear()}
          </Text>
          <Text style={styles.schedule_text_time}>
            {date.getHours() - 12}:
            {date.getMinutes() < 10
              ? '0' + date.getMinutes()
              : date.getMinutes()}{' '}
            {date.getHours() > 12 ? 'PM' : 'AM'}
          </Text>
        </View>
        <View style={styles.location}>
          <Ionicons name="location-sharp" size={12} color="#4f4f4f" />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.location_text}>
              {item.street}, {item.city}
            </Text>
            <Text style={styles.location_text}>{item.state}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sub_main: {
    height: windowHeight / 2.2,
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
    fontSize: 24,
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
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  participants_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: '#282c40',
    marginLeft: 5,
  },
  dp: {
    height: 45,
    width: 45,
    borderRadius: 100,
  },
  schedule: {
    padding: 10,
  },
  schedule_text_mon: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: '#4f4f4f',
  },
  schedule_text_time: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: '#4f4f4f',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  location_text: {
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    marginLeft: 2,
    color: '#4f4f4f',
  },
});

export default FullMeeting;
