import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Main(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <View style={styles.options}>
          <View style={styles.each_option}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#a9a9a9', true)}
              onPress={() => navigation.goBack()}>
              <View style={{padding: 4}}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  color="#282c40"
                  size={20}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  sub_container: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight / 12,
  },
  each_option: {
    borderRadius: 50,
  },
});
