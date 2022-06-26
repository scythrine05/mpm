//Modules
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

//Firebase Auth
import auth from '@react-native-firebase/auth';

//Firebase Storage
import storage from '@react-native-firebase/storage';

//Firestore
import firestore from '@react-native-firebase/firestore';

//Components
import Skeleton from '../components/skeleton/profile';
import Loading from '../components/bottomSheet/loading';
import Error from '../components/bottomSheet/error';
import Warning from '../components/bottomSheet/warning';

//Icons
import Feather from 'react-native-vector-icons/dist/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export default function NewMeet({navigation}) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [date, setDate] = React.useState(new Date());

  const [loadingMsg, setLoadingMsg] = React.useState('');
  const [err, setErr] = React.useState('');

  const refLoading = React.useRef();
  const refError = React.useRef();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDateMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showDateMode('date');
  };

  const showTimepicker = () => {
    showDateMode('time');
  };

  const next = (title, description, street, city, state, date) => {
    console.log();
    if (!title || !street || !city || !state || !date) {
      refLoading.current.close();
      setErr('Fields should not be empty');
      refError.current.open();
    } else {
      navigation.navigate('AddParticipants', {
        title,
        description,
        street,
        city,
        state,
        date: date.toString(),
      });
    }
  };

  return (
    <SafeAreaView>
      <Loading ref={refLoading} msg={loadingMsg} />
      <Error ref={refError} msg={err} />

      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <View style={styles.options_heading}>
            <Text style={styles.each_heading}>About</Text>
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholder="Title"
            />
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={setDescription}
              value={description}
              placeholder="Description (Optional)"
              multiline={true}
              numberOfLines={5}
            />
          </View>
          <View style={styles.options_heading}>
            <Text style={styles.each_heading}>Location</Text>
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>Street</Text>
            <TextInput
              style={styles.input}
              onChangeText={setStreet}
              value={street}
              placeholder="Street"
            />
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>City</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCity}
              value={city}
              placeholder="City"
            />
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>State</Text>
            <TextInput
              style={styles.input}
              onChangeText={setState}
              value={state}
              placeholder="State"
            />
          </View>
          <View style={styles.options_heading}>
            <Text style={styles.each_heading}>Schedule</Text>
          </View>
          <TouchableOpacity onPress={showDatepicker}>
            <View style={styles.button_sm}>
              <Text style={styles.button_sm_text}>choose date</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimepicker}>
            <View style={styles.button_sm}>
              <Text style={styles.button_sm_text}>choose time</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.options}>
            <Text style={styles.each_sub}>Date and Time</Text>

            {/* Date and Time Format */}
            <Text style={{...styles.each_sub, paddingBottom: 10}}>
              {`${date.getHours() % 12 ? date.getHours() % 12 : 12}:${
                date.getMinutes() < 10
                  ? `0${date.getMinutes()}`
                  : date.getMinutes()
              } ${date.getHours() < 12 ? 'AM' : 'PM'}, ${date.getDate()} ${
                monthNames[date.getMonth()]
              } ${date.getFullYear()}`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => next(title, description, street, city, state, date)}>
            <View style={styles.button}>
              <Text style={styles.button_text}>next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    justifyContent: 'center',
    paddingRight: windowWidth / 10,
    paddingLeft: windowWidth / 10,
  },
  image: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  options: {
    marginRight: 30,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d8d8d8',
  },
  options_heading: {
    marginRight: 30,
    paddingLeft: 20,
  },
  each_sub: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    marginTop: 20,
    color: '#4f4f4f',
  },
  each_heading: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginTop: 20,
    color: '#282c40',
  },
  input: {
    fontSize: 14,
    padding: 0,
    width: windowWidth / 2,
    fontFamily: 'Nunito-Medium',
    marginTop: 10,
    paddingBottom: 20,
    color: '#282c40',
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
  },
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
  button_sm: {
    width: windowWidth / 4,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d0312d',
  },
  button_sm_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 11,
    color: '#d0312d',
  },
});
