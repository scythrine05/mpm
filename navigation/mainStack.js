import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Firebase Auth
import auth from '@react-native-firebase/auth';

//Screens - auth(false)
import Landing from '../screens/landing';
import OTP from '../screens/otp';

//Components
import Header from '../components/headers/common';
import Header2 from '../components/headers/common2';
import Header3 from '../components/headers/commonName';

//Screens - auth(true)

import Signup from '../screens/signup';
import MainTab from './mainTab';
import Post from '../screens/fullPost';
import Meeting from '../screens/fullMeeting';
import Donors from '../screens/donors';
import Donation from '../screens/donation';
import Likes from '../screens/likes';
import Participants from '../screens/participants';
import Comments from '../screens/comments';
import Mentors from '../screens/mentors';
import About from '../screens/about';
import SavedPosts from '../screens/savedPosts';
import Account from '../screens/account';

//Screens - auth(true) && admin(true)

import NewPost from '../screens/newPost';
import NewPost2 from '../screens/newPost2';
import NewMeeting from '../screens/newMeet';
import AddParticipants from '../screens/addParticipants';

//Contexts
import {authUserContext} from '../contexts/authUserContext';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const {authUser} = React.useContext(authUserContext);

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const unlisten = auth().onAuthStateChanged(user =>
      user ? setLoggedIn(true) : setLoggedIn(false),
    );
    return () => unlisten();
  }, []);

  return (
    <>
      <Stack.Navigator
        initialRouteName={
          loggedIn ? (authUser.displayName ? 'MainTab' : 'Signup') : 'Landing'
        }
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        {loggedIn ? (
          !authUser.displayName ? (
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name="MainTab"
                component={MainTab}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Post"
                component={Post}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="Meeting"
                component={Meeting}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="Likes"
                component={Likes}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="Comments"
                component={Comments}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="Participants"
                component={Participants}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="Mentors"
                component={Mentors}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="Donors"
                component={Donors}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="About"
                component={About}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="SavedPosts"
                component={SavedPosts}
                options={{
                  header: props => <Header3 {...props} name="Saved Posts" />,
                }}
              />
              <Stack.Screen
                name="Account"
                component={Account}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="Donation"
                component={Donation}
                options={{header: props => <Header {...props} />}}
              />
              <Stack.Screen
                name="NewPost"
                component={NewPost}
                options={{
                  header: props => <Header3 {...props} name="Choose Images" />,
                }}
              />
              <Stack.Screen
                name="NewPost2"
                component={NewPost2}
                options={{
                  header: props => <Header3 {...props} name="New Post" />,
                }}
              />
              <Stack.Screen
                name="NewMeeting"
                component={NewMeeting}
                options={{
                  header: props => <Header3 {...props} name="New Meeting" />,
                }}
              />
              <Stack.Screen
                name="AddParticipants"
                component={AddParticipants}
                options={{
                  header: props => <Header3 {...props} name="Add People" />,
                }}
              />
            </>
          )
        ) : (
          <>
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="OTP"
              component={OTP}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
