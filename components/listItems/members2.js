import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ListItem} from 'react-native-elements';

//Component
import ListItem2 from './members';

//Data
const dhadDisom = require('../../data/torofPargana/dhadDisom.json');
const kuchungDisom = require('../../data/torofPargana/kuchungDisom.json');
const sinjDisom = require('../../data/torofPargana/sinjDisom.json');
const patkomDisom = require('../../data/torofPargana/patkomDisom.json');
const barhaDisom = require('../../data/torofPargana/barhaDisom.json');

export default function Members2(props) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{props.title}</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(prev => !prev);
      }}>
      <ListItem2 title="Dhad Disom Torof Pargana" data={dhadDisom} />
      <ListItem2 title="Kuchung Disom Torof Pargana" data={kuchungDisom} />
      <ListItem2 title="Sinj Disom Torof Pargana" data={sinjDisom} />
      <ListItem2 title="Patkom Disom Torof Pargana" data={patkomDisom} />
      <ListItem2 title="Barha Disom Torof Pargana" data={barhaDisom} />
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 16,
  },
});
