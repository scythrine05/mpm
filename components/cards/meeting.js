import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const bgColors = [
  '#acddde',
  '#caf1de',
  '#e1f8dc',
  '#dbf3fa',
  '#fef8dd',
  '#f7d8ba',
];

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

export default function Meeting({item, index}) {
  const navigation = useNavigation();

  const date = item.date.toDate();

  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Meeting', item)}>
          <View
            style={{
              ...styles.sub_main,
              backgroundColor: bgColors[index % bgColors.length],
            }}>
            <View style={styles.head}>
              <View>
                <Text style={styles.title_text}>
                  {item.title.length > 10
                    ? item.title.substring(0, 10) + '...'
                    : item.title}
                </Text>
              </View>
            </View>
            <View style={styles.location}>
              <Ionicons
                name="location-sharp"
                size={12}
                color="#4f4f4f"
                style={{alignSelf: 'flex-start'}}
              />
              <View>
                <Text style={styles.location_text}>
                  {item.street}, {item.city}
                </Text>
                <Text style={styles.location_text}>{item.state}</Text>
              </View>
            </View>
            <View style={styles.foot}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Participants', item)}>
                <View style={styles.participants}>
                  <Ionicons
                    name="person"
                    size={14}
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
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: windowHeight / 3.1,
    width: windowWidth,
  },

  main: {
    alignItems: 'center',
  },
  sub_main: {
    height: windowHeight / 3.5,
    width: windowWidth / 1.05,
    borderRadius: 5,
    padding: 20,
    justifyContent: 'space-around',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  title_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#282c40',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location_text: {
    fontSize: 10,
    fontFamily: 'Nunito-Bold',
    marginLeft: 2,
    color: '#4f4f4f',
  },
  schedule_text_mon: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    color: '#4f4f4f',
  },
  schedule_text_time: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    color: '#4f4f4f',
  },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participants_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 11,
    color: '#282c40',
    marginLeft: 5,
  },
  dp: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
});
