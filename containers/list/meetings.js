import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

//Component
import Card from '../../components/cards/meeting';

//Contexts
import {meetingContext} from '../../contexts/meetingContext';

export default function Meetings() {
  const {meetings, getMoreMeets, lastMeet, setMeetMaxData} =
    React.useContext(meetingContext);
  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatlist}
        data={meetings}
        renderItem={({item, index}) => <Card item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <View style={{padding: 10}}>
            {!lastMeet ? <ActivityIndicator size="large" /> : <Text> </Text>}
          </View>
        }
        onEndReached={() => getMoreMeets()}
        onEndReachedThreshold={0.01}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    paddingTop: 15,
  },
});
