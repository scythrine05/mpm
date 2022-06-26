import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

//Firestore
import firestore from '@react-native-firebase/firestore';

//Firebase Auth
import auth from '@react-native-firebase/auth';

//Components
import Loading from '../components/bottomSheet/loading';
import Error from '../components/bottomSheet/error';

//Contexts
import {authUserContext} from '../contexts/authUserContext';
import {userContext} from '../contexts/userContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Signup() {
  const {authUser, setAuthUserData} = React.useContext(authUserContext);
  const {setUserData} = React.useContext(userContext);

  const [name, setName] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [err, setErr] = React.useState('');

  const navigation = useNavigation();

  const refLoading = React.useRef();
  const refError = React.useRef();

  const update = async (name, street, city, state) => {
    refLoading.current.open();
    if (!name || !street || !city || !state) {
      refLoading.current.close();
      setErr('Fields should not be empty');
      refError.current.open();
    } else {
      try {
        await auth().currentUser.updateProfile({
          displayName: name,
        });
        await firestore().collection('users').doc(authUser.uid).set({
          name,
          street,
          city,
          state,
        });
        await setAuthUserData({displayName: name});
        await setUserData({
          name,
          street,
          city,
          state,
        });
      } catch (e) {
        refLoading.current.close();
        setErr(e);
        refError.current.open();
        setName('');
        setAddress('');
      }
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Loading ref={refLoading} msg="updating profile" />
      <Error ref={refError} msg={err} />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.heading_text}>Welcome ,</Text>
        </View>
        <View style={styles.main}>
          <View>
            <View style={styles.options}>
              <Text style={styles.each_sub}>Full Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Full Name"
                placeholderTextColor={'#7f7f7f'}
              />
            </View>
            <View style={styles.options}>
              <Text style={styles.each_sub}>Street/Village/Town</Text>
              <TextInput
                style={styles.input}
                onChangeText={setStreet}
                value={street}
                placeholder="Street/Village/Town"
                placeholderTextColor={'#7f7f7f'}
              />
            </View>
            <View style={styles.options}>
              <Text style={styles.each_sub}>City</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCity}
                value={city}
                placeholder="City"
                placeholderTextColor={'#7f7f7f'}
              />
            </View>
            <View style={styles.options}>
              <Text style={styles.each_sub}>State</Text>
              <TextInput
                style={styles.input}
                onChangeText={setState}
                value={state}
                placeholder="State"
                placeholderTextColor={'#7f7f7f'}
              />
            </View>
            <TouchableOpacity onPress={() => update(name, street, city, state)}>
              <View style={styles.button}>
                <Text style={styles.button_text}>create new account</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    alignSelf: 'center',
    marginBottom: 50,
  },
  heading_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: '#282c40',
  },
  options: {},
  each_sub: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    marginTop: 20,
    color: '#4f4f4f',
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
  button: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#008250',
  },
  button_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#008250',
  },
});
