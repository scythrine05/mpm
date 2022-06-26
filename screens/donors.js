import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';

//Component

import ListItem from '../components/listItems/members';
//Data
const feb_2022 = require('../data/donors/feb_2022.json');
const mar_2022 = require('../data/donors/mar_2022.json');
const apr_2022 = require('../data/donors/apr_2022.json');

export default function Donors() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <ListItem title="February 2022" data={feb_2022} />
          <ListItem title="March 2022" data={mar_2022} />
          <ListItem title="April 2022" data={apr_2022} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
