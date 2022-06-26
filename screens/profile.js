import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
//import {SpeedDial} from 'react-native-elements';

import Ionicons from 'react-native-vector-icons/Ionicons';

//Firebase Auth
import auth from '@react-native-firebase/auth';

//Contexts
import {userContext} from '../contexts/userContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const defaultImg =
  'https://secondchancetinyhomes.org/wp-content/uploads/2016/09/empty-profile.png';

//Components
import Skeleton from '../components/skeleton/profile';
import Loading from '../components/bottomSheet/loading';

export default function Profile({navigation}) {
  const {user, setUserReset} = React.useContext(userContext);

  const [dialOpen, setDialOpen] = React.useState(false);

  const refLoading = React.useRef();

  return (
    <>
      {!user ? (
        <Skeleton />
      ) : (
        <>
          <ScrollView>
            <Loading ref={refLoading} msg="logging out" />
            <View style={styles.container}>
              <View style={styles.profile}>
                <View style={{alignItems: 'center'}}>
                  <View>
                    <Image
                      style={styles.dp}
                      source={{uri: user.dp ? user.dp : defaultImg}}
                    />
                  </View>
                  <View>
                    <Text style={styles.title_text}>{user.name}</Text>
                  </View>
                  <View style={styles.location}>
                    <View>
                      <Text style={styles.location_text}>
                        {user.street}, {user.city}
                      </Text>
                      <Text style={styles.location_text}>{user.state}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.options}>
                <TouchableNativeFeedback
                  onPress={() => navigation.navigate('Account')}
                  background={TouchableNativeFeedback.Ripple('#a9a9a9', false)}>
                  <View style={styles.each}>
                    <Text style={styles.each_text}>Account Setting</Text>
                    <Ionicons
                      name="settings-outline"
                      size={22}
                      color="#282c40"
                      style={{marginRight: 26}}
                    />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => navigation.navigate('About')}
                  background={TouchableNativeFeedback.Ripple('#a9a9a9', false)}>
                  <View style={styles.each}>
                    <Text style={styles.each_text}>About</Text>
                    <Ionicons
                      name="ios-information-circle-outline"
                      size={25}
                      color="#282c40"
                      style={{marginRight: 26}}
                    />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => navigation.navigate('Donation')}
                  background={TouchableNativeFeedback.Ripple('#a9a9a9', false)}>
                  <View style={styles.each}>
                    <Text style={styles.each_text}>Donate</Text>
                    <Ionicons
                      name="heart-outline"
                      size={22}
                      color="#282c40"
                      style={{marginRight: 26}}
                    />
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={async () => {
                    refLoading.current.open();
                    await auth().signOut();
                    setUserReset();
                  }}
                  background={TouchableNativeFeedback.Ripple('#a9a9a9', false)}>
                  <View style={styles.each}>
                    <Text style={styles.each_text}>Log Out</Text>
                    <Ionicons
                      name="exit-outline"
                      size={22}
                      color="#282c40"
                      style={{marginRight: 26}}
                    />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </ScrollView>
          {/* <SpeedDial
            transitionDuration={100}
            isOpen={dialOpen}
            icon={{name: 'add', color: '#fff'}}
            openIcon={{name: 'close', color: '#fff'}}
            onOpen={() => setDialOpen(prev => !prev)}
            onClose={() => setDialOpen(prev => !prev)}
            color="#d0312d">
            <SpeedDial.Action
              icon={{name: 'event-note', color: '#fff'}}
              title={<Text style={styles.speedText}>Post</Text>}
              color="#d0312d"
              onPress={() => {
                setDialOpen(false);
                navigation.navigate('NewPost');
              }}
            />
            <SpeedDial.Action
              icon={{name: 'people', color: '#fff'}}
              title={<Text style={styles.speedText}>Meeting</Text>}
              color="#d0312d"
              onPress={() => {
                setDialOpen(false);
                navigation.navigate('NewMeeting');
              }}
            />
          </SpeedDial> */}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 30,
    justifyContent: 'center',
    paddingTop: 30,
  },
  profile: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dp: {
    marginBottom: 10,
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  title_text: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: '#282c40',
  },
  location: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  location_text: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    marginLeft: 2,
    color: '#4f4f4f',
    textAlign: 'center',
  },
  options: {
    justifyContent: 'center',
    paddingTop: 50,
    padding: 20,
  },
  each: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 30,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d8d8d8',
  },
  each_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#282c40',
    marginTop: 20,
    paddingBottom: 20,
  },
  speedText: {
    fontFamily: 'Nunito-SemiBold',
    color: '#282c40',
  },
});
