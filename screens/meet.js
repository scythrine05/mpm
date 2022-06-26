import {View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Contexts
import {userContext} from '../contexts/userContext';
//Containers
import Meetings from '../containers/list/meetings';

export default function Meet() {
  return (
    <View>
      <View>
        <Meetings />
      </View>
    </View>
  );
}
