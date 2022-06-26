import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import Ionicons from 'react-native-vector-icons/Ionicons';

//Contexts
import {confirmContext} from '../contexts/confirmContext';
import {newUserContext} from '../contexts/newUserContext';

//Components
import Loading from '../components/bottomSheet/loading';
import Error from '../components/bottomSheet/error';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OTP({navigation}) {
  const [err, setErr] = React.useState('');

  const {setConfirmData, confirm} = React.useContext(confirmContext);

  const refLoading = React.useRef();
  const refError = React.useRef();

  async function confirmCode(code) {
    refLoading.current.open();
    try {
      const userCredentials = await confirm.confirm(code);
      setConfirmData(null);
    } catch (e) {
      setErr('Invalid OTP');
      refLoading.current.close();
      refError.current.open();
    }
  }
  return (
    <ScrollView>
      <Loading ref={refLoading} msg="Verifying OTP" />
      <Error ref={refError} msg={err} />
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.heading_text}>Verify your Phone Number</Text>
          <Text style={styles.paragraph_text}>Enter your OTP code here</Text>
        </View>
        <View style={styles.main}>
          <OTPInputView
            style={styles.otp}
            pinCount={6}
            autoFocusOnLoad={false}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => confirmCode(code)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    padding: 20,
  },
  main: {
    alignItems: 'center',
  },
  heading: {
    position: 'absolute',
    top: windowHeight / 15,
    alignSelf: 'center',
    alignItems: 'center',
  },
  heading_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: '#282c40',
  },
  paragraph_text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    marginTop: 10,
    color: '#4f4f4f',
  },
  otp: {
    width: '80%',
    height: 400,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#282c40',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#282c40',
    color: '#282c40',
  },

  underlineStyleHighLighted: {
    borderColor: '#282c40',
  },
  resend: {
    alignItems: 'center',
  },
  timer_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 10,
    color: '#4f4f4f',
  },
  resend_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 10,
    color: '#4f4f4f',
  },
});
