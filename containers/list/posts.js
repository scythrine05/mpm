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
import Card from '../../components/cards/post';

//Contexts
import {postContext} from '../../contexts/postContext';

export default function Posts() {
  const {posts, getMorePost, lastPost} = React.useContext(postContext);

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        renderItem={({item, index}) => <Card item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          <View style={{padding: 10}}>
            {!lastPost ? <ActivityIndicator size="large" /> : <Text> </Text>}
          </View>
        }
        onEndReached={() => getMorePost()}
        onEndReachedThreshold={0.01}
      />
    </SafeAreaView>
  );
}
