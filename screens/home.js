import {View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Containers
import Posts from '../containers/list/posts';

export default function Home() {
  return (
    <View>
      <View>
        <Posts />
      </View>
    </View>
  );
}
