import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SocialIcon} from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Community() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/background/explore.jpg')}
        resizeMode="cover"
        style={styles.bgimage}>
        <View style={styles.overlay} />
        <View style={styles.count}>
          <View style={styles.each_count}>
            <View>
              <Text style={styles.num_text}>3</Text>
            </View>
            <View style={styles.each_name}>
              <FontAwesome name="home" size={20} color="#fff" />
              <Text style={styles.num_text2}>villages</Text>
            </View>
          </View>
          <View style={styles.each_count}>
            <View>
              <Text style={styles.num_text}>200+</Text>
            </View>
            <View style={styles.each_name}>
              <FontAwesome name="child" size={20} color="#fff" />
              <Text style={styles.num_text2}>children</Text>
            </View>
          </View>
        </View>
        <View style={styles.slogan}>
          <Text style={styles.slogan_text1}>Together We Believe</Text>
          <Text style={styles.slogan_text2}>Together We Rise</Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => navigation.navigate('Donors')}>
            <View style={styles.each_options}>
              <FontAwesome5
                style={styles.each_options_icon}
                name="hand-holding-heart"
                size={20}
                color="#fff"
              />
              <Text style={styles.each_options_text}>Our Donors</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Mentors')}>
            <View style={styles.each_options}>
              <FontAwesome5
                style={styles.each_options_icon}
                name="user-friends"
                size={20}
                color="#fff"
              />
              <Text style={styles.each_options_text}>Our Mentors</Text>
            </View>
          </TouchableOpacity>
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
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgimage: {
    height: windowHeight,
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: windowHeight,
    width: windowWidth,
  },
  count: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 50,
  },
  each_count: {
    alignItems: 'center',
  },
  each_name: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  num_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 30,
    color: '#ffffff',
  },
  num_text2: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 10,
  },

  slogan: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 60,
  },
  slogan_text1: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: '#ffffff',
    marginLeft: 10,
  },

  slogan_text2: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 25,
    color: '#ffffff',
    marginLeft: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  each_options: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 100,
  },
  each_options_icon: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
    borderRadius: 100,
  },
  each_options_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: '#ffffff',
    marginTop: 10,
  },
  social: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  footer_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 10,
    color: '#ffffff',
  },
});
