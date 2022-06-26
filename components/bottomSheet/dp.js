import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

//Icons
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BottomSheet = React.forwardRef((props, ref) => (
  <View>
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      height={200}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(12,12,12,0.4)',
        },
        draggableIcon: {
          backgroundColor: '#afafaf',
        },
      }}>
      <View style={styles.bottom_sheet}>
        <TouchableNativeFeedback onPress={props.takeFromCamera}>
          <View style={styles.options}>
            <Ionicons name="camera-outline" size={20} color="#282c40" />
            <Text style={styles.bottom_sheet_text}>Camera</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={props.takeFromDevice}>
          <View style={styles.options}>
            <Ionicons name="md-file-tray-outline" size={20} color="#282c40" />
            <Text style={styles.bottom_sheet_text}>Device</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </RBSheet>
  </View>
));

const styles = StyleSheet.create({
  options: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom_sheet_text: {
    fontFamily: 'Nunito-SemiBold',
    color: '#282c40',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default BottomSheet;
