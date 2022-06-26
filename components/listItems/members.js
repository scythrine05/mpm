import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ListItem} from 'react-native-elements';

export default function Members(props) {
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
      {expanded ? (
        props.data.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <View>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        ))
      ) : (
        <></>
      )}
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nunito-Bold',
    color: '#282c40',
    fontSize: 16,
  },
  name: {
    fontFamily: 'Nunito-SemiBold',
    color: '#282c40',
    fontSize: 14,
  },
  about: {
    fontFamily: 'Nunito-Regular',
    color: '#282c40',
  },
  place: {
    fontFamily: 'Nunito-Regular',
    color: '#4f4f4f',
    fontSize: 12,
  },
});
