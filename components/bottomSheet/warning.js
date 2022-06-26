import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Ionicons from 'react-native-vector-icons/Ionicons';

const Warning = React.forwardRef((props, ref) => (
  <View>
    <RBSheet
      ref={ref}
      height={150}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(12,12,12,0.4)',
        },
      }}
      onOpen={props.onOpen}
      onClose={props.onClose}>
      <View style={styles.bottom_sheet}>
        <View
          style={{padding: 15, alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons name="warning-outline" size={20} color="#d0312d" />
          <Text style={styles.bottom_sheet_text}>{props.msg}</Text>
          <TouchableOpacity onPress={props.onYes}>
            <View style={styles.button_sm}>
              <Text style={styles.button_sm_text}>yes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  </View>
));

const styles = StyleSheet.create({
  bottom_sheet_text: {
    fontFamily: 'Nunito-SemiBold',
    color: '#282c40',
    fontSize: 11,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

  button_sm: {
    width: windowWidth / 4,
    marginBottom: 20,
    padding: 8,
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

export default Warning;
