import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

//Containers
import SavedPosts from '../containers/list/savedPosts';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default () => {
  const [index, setIndex] = React.useState(0);

  return (
    <View>
      <View>
        <SavedPosts />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: 'red',
  },
  tabItem: {
    width: windowWidth,
  },
});
