import 'react-native-gesture-handler';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

//Navigations
import MainStack from './navigation/mainStack';

//Contexts
import ConfirmProvider from './contexts/confirmContext';
import AuthUserProvider from './contexts/authUserContext';
import UserProvider from './contexts/userContext';
import PeopleProvider from './contexts/peopleContext';
import PostProvider from './contexts/postContext';
import MeetingProvider from './contexts/meetingContext';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#fff',
  },
};

const App: () => Node = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <ConfirmProvider>
      <AuthUserProvider>
        <UserProvider>
          <PostProvider>
            <MeetingProvider>
              <PeopleProvider>
                <NavigationContainer theme={MyTheme}>
                  <MainStack />
                </NavigationContainer>
              </PeopleProvider>
            </MeetingProvider>
          </PostProvider>
        </UserProvider>
      </AuthUserProvider>
    </ConfirmProvider>
  );
};

export default App;
