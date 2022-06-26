import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import AntDesign from 'react-native-vector-icons/AntDesign';

//Contexts
import {peopleContext} from '../../contexts/peopleContext';

export default function AddPeople({item}) {
  const {setPeopleData, removePeopleData} = React.useContext(peopleContext);

  const [selected, setSelected] = React.useState(false);
  return (
    <TouchableNativeFeedback
      onPress={() => {
        selected
          ? removePeopleData(item.name)
          : setPeopleData({
              name: item.name,
              about: item.about,
              place: item.place,
            });
        setSelected(prev => !prev);
      }}>
      <View
        style={{...styles.main, backgroundColor: selected ? '#ffcccb' : null}}>
        <View style={styles.profile}>
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.about}>{item.about}</Text>
            <Text style={styles.place}>{item.place}</Text>
          </View>
          <View>
            {selected ? (
              <AntDesign name="checkcircle" size={22} color="#d0312d" />
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    height: windowHeight / 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: windowWidth / 20,
    paddingRight: windowWidth / 20,
    marginBottom: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth / 1.1,
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  details: {
    marginLeft: 10,
  },
  name: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 14.5,
  },
  about: {
    fontFamily: 'Nunito-Regular',
    color: '#282c40',
  },
  place: {
    fontFamily: 'Nunito-Regular',
    color: '#4f4f4f',
    fontSize: 12,
  },
});
