import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View, Text} from 'react-native';

//Component
import ListItem from '../components/listItems/participant';

export default function Participants({route}) {
  const item = route.params;

  return (
    <SafeAreaView>
      <FlatList
        data={item.people}
        renderItem={({item, index}) => <ListItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
