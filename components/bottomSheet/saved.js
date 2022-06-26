import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BottomSheet = React.forwardRef((props, ref) => (
  <View>
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      height={150}
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
        {/* Wait until website feeds functionality */}
        {/* <View style={{padding: 15}}>
            <Text style={styles.bottom_sheet_text}>Share</Text>
            <View style={styles.social}>
              <SocialIcon type="whatsapp" />
              <SocialIcon type="instagram" />
              <SocialIcon type="facebook" />
              <SocialIcon type="twitter" />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#d8d8d8',
              borderBottomWidth: 1,
              marginTop: 20,
            }}
          /> */}
        <TouchableNativeFeedback>
          <View style={{padding: 15}}>
            <Text style={styles.bottom_sheet_text}>Remove ...</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </RBSheet>
  </View>
));

const styles = StyleSheet.create({
  bottom_sheet_text: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default BottomSheet;
