import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View, Text} from 'react-native';

//Component
import ListItem from '../components/listItems/likes';

const data = [
  {
    id: 0,
    name: 'Karan Hansdah',
  },
  {
    id: 1,
    name: 'Karan Hansdah',
  },
  {
    id: 2,
    name: 'Karan Hansdah',
  },
  {
    id: 3,
    name: 'Karan Hansdah',
  },
  {
    id: 4,
    name: 'Karan Hansdah',
  },
  {
    id: 5,
    name: 'Karan Hansdah',
  },
  {
    id: 6,
    name: 'Karan Hansdah',
  },
  {
    id: 7,
    name: 'Karan Hansdah',
  },
  {
    id: 8,
    name: 'Karan Hansdah',
  },
  {
    id: 9,
    name: 'Karan Hansdah',
  },
];

export default function Likes() {
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({item, index}) => <ListItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
