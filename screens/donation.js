import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SocialIcon} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Donation() {
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Image
            style={styles.logo}
            source={require('../assets/payment/QR.jpeg')}
          />
        </View>
        <View style={styles.main}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.each_sub}>
              A small amount can bring a large change
            </Text>
            <Text style={styles.each_sub2}>
              Just open up the camera of your smart phone and point it at this
              screen with your payment app and complete the payment
            </Text>
            <Text style={styles.each_sub}>UPI ID: rohangeniusity@okaxis</Text>
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
    height: 200,
    width: 200,
  },
  each_sub: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    marginTop: 20,
    color: '#4f4f4f',
  },
  each_sub2: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    marginTop: 20,
    color: '#4f4f4f',
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
