import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';

//Component

import ListItem from '../components/listItems/members';
import ListItem2 from '../components/listItems/members2';

//Data
const deshPargana = require('../data/deshPargana/deshPargana.json');
const ghatPargana = require('../data/ghatPargana/ghatPargana.json');
const parnik = require('../data/parnik/parnik.json');

export default function Members() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <ListItem title="Desh Pargana" data={deshPargana} />
          <ListItem2 title="Torof Pargana" />
          <ListItem title="Ghat Pargana" data={ghatPargana} />
          <ListItem title="Parnik" data={parnik} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
