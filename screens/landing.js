import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SocialIcon} from 'react-native-elements';

//Firebase Auth
import auth from '@react-native-firebase/auth';

//Components
import Loading from '../components/bottomSheet/loading';
import Error from '../components/bottomSheet/error';

//Contexts
import {confirmContext} from '../contexts/confirmContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Landing() {
  const [phone, setPhone] = React.useState('');
  const [err, setErr] = React.useState('');

  const {setConfirmData, confirm} = React.useContext(confirmContext);

  const refLoading = React.useRef();
  const refError = React.useRef();

  const navigation = useNavigation();

  //Verifying Phone Number
  async function verifyPhone(phone) {
    refLoading.current.open();
    try {
      if (phone.length < 10) throw error;
      const confirmation = await auth().signInWithPhoneNumber(`$+91${phone}`);
      if (confirmation) {
        setConfirmData(confirmation);
        refLoading.current.close();
        navigation.navigate('OTP');
      }
    } catch (e) {
      refLoading.current.close();
      setErr('Invalid Phone Number');
      refError.current.open();
      setPhone('');
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Loading ref={refLoading} msg="Verifying Phone Number" />
      <Error ref={refError} msg={err} />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            style={styles.logo}
            source={require('../assets/logo/logo.png')}
          />
        </View>
        <View style={styles.main}>
          <View>
            <View style={styles.options}>
              <Text style={styles.each_sub}>Phone Number</Text>
              <TextInput
                style={styles.input_box}
                onChangeText={setPhone}
                value={phone}
                placeholder="Phone Number"
                keyboardType="numeric"
                maxLength={10}
                placeholderTextColor={'#7f7f7f'}
              />
            </View>
            <TouchableOpacity onPress={() => verifyPhone(phone)}>
              <View style={styles.button}>
                <Text style={styles.button_text}>log in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.social}>
          <SocialIcon
            iconSize={12}
            small
            style={{height: 22, width: 22}}
            type="facebook"
          />
          <SocialIcon
            iconSize={12}
            small
            style={{height: 22, width: 22}}
            type="instagram"
          />
          <SocialIcon
            iconSize={12}
            small
            style={{height: 22, width: 22}}
            type="twitter"
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>© 2022 Majhi Pargana Mahal</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    padding: 20,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  social: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  heading: {
    position: 'absolute',
    top: windowHeight / 15,
    alignSelf: 'center',
  },
  logo: {
    height: 180,
    width: 180,
  },
  options: {},
  each_sub: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    marginTop: 20,
    color: '#4f4f4f',
  },
  input_box: {
    fontSize: 14,
    padding: 0,
    width: windowWidth / 2,
    fontFamily: 'Nunito-Medium',
    marginTop: 10,
    paddingBottom: 20,
    color: '#282c40',
  },
  forgot: {
    marginTop: 10,
    marginBottom: 10,
  },
  forgot_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 10,
    marginTop: 20,
    color: '#4f4f4f',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  footer_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    color: '#282c40',
  },
});
