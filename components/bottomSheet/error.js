import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Error = React.forwardRef((props, ref) => (
  <View>
    <RBSheet
      ref={ref}
      height={100}
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
          <MaterialIcons name="error-outline" size={20} color="#d0312d" />
          <Text style={styles.bottom_sheet_text}>{props.msg}</Text>
        </View>
      </View>
    </RBSheet>
  </View>
));

const styles = StyleSheet.create({
  bottom_sheet_text: {
    fontFamily: 'Nunito-SemiBold',
    color: '#d0312d',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Error;
