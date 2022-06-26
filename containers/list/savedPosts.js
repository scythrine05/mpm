import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

//Component
import Card from '../../components/cards/savedPost';

const Data = [
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
  {
    id: 10,
    name: 'Karan Hansdah',
  },
];

export default function Posts() {
  return (
    <SafeAreaView>
      <FlatList
        data={Data}
        renderItem={({item, index}) => <Card item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
