import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

//Component
import ListItem from '../components/listItems/addPeople';
import Loading from '../components/bottomSheet/loading';
import Error from '../components/bottomSheet/error';

//Contexts
import {peopleContext} from '../contexts/peopleContext';

//Firestore
import firestore from '@react-native-firebase/firestore';

//Desh Pargana
const deshPargana = require('../data/deshPargana/deshPargana.json');

//Torof Pargana
const dhadDisom = require('../data/torofPargana/dhadDisom.json');
const kuchungDisom = require('../data/torofPargana/kuchungDisom.json');
const sinjDisom = require('../data/torofPargana/sinjDisom.json');

//Not added
// const patkomDisom = require('../data/torofPargana/patkomDisom.json');
// const barhaDisom = require('../data/torofPargana/barhaDisom.json');

//Ghat Pargana
const ghatPargana = require('../data/ghatPargana/ghatPargana.json');

//Parnik
const parnik = require('../data/parnik/parnik.json');

const data = [
  ...deshPargana,
  ...dhadDisom,
  ...kuchungDisom,
  ...sinjDisom,
  ...ghatPargana,
  ...parnik,
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddParticipants({route, navigation}) {
  const {title, description, street, city, state, date} = route.params;
  const {people, setPeopleReset} = React.useContext(peopleContext);

  const [loadingMsg, setLoadingMsg] = React.useState('');
  const [err, setErr] = React.useState('');

  const refLoading = React.useRef();
  const refError = React.useRef();

  const newMeet = async () => {
    setLoadingMsg('creating meeting');
    refLoading.current.open();
    if (!people.length) {
      refLoading.current.close();
      setErr('Choose atleast one participant');
      refError.current.open();
    } else {
      try {
        await firestore().collection('meetings').add({
          title,
          description,
          street,
          city,
          state,
          date,
          people,
        });
        navigation.navigate('Meetings');
      } catch (e) {
        refLoading.current.close();
        console.log('error: ', e);
        setErr(e);
        refError.current.open();
      }
    }
  };

  return (
    <SafeAreaView>
      <Loading ref={refLoading} msg={loadingMsg} />
      <Error ref={refError} msg={err} />
      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={({item, index}) => <ListItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flexGrow: 1}}
        ListFooterComponent={
          <TouchableOpacity onPress={() => newMeet()}>
            <View style={styles.button}>
              <Text style={styles.button_text}>create meeting</Text>
            </View>
          </TouchableOpacity>
        }
        ListFooterComponentStyle={{
          paddingLeft: windowWidth / 10,
          paddingRight: windowWidth / 10,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d0312d',
  },
  button_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#d0312d',
  },
});
