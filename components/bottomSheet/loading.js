import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Loading = React.forwardRef((props, ref) => (
  <View>
    <RBSheet
      ref={ref}
      closeOnPressMask={false}
      height={100}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(12,12,12,0.4)',
        },
        draggableIcon: {
          backgroundColor: '#afafaf',
        },
      }}
      onOpen={props.onOpen}
      onClose={props.onClose}>
      <View style={styles.bottom_sheet}>
        <View style={{padding: 15}}>
          <ActivityIndicator size="small" color="#008250" />
          <Text style={styles.bottom_sheet_text}>{props.msg}</Text>
        </View>
      </View>
    </RBSheet>
  </View>
));

const styles = StyleSheet.create({
  bottom_sheet_text: {
    fontFamily: 'Nunito-SemiBold',
    color: '#282c40',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Loading;
