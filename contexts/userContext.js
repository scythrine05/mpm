import React from 'react';

//Firestore
import firestore from '@react-native-firebase/firestore';

//Contexts
import {authUserContext} from './authUserContext';

export const userContext = React.createContext();

const UserProvider = ({children}) => {
  const {authUser} = React.useContext(authUserContext);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(authUser.uid)
      .onSnapshot(documentSnapshot => setUser(documentSnapshot.data()));

    return () => {
      subscriber();
    };
  }, [authUser.uid]);

  const setUserData = async value => {
    setUser({
      ...user,
      name: value.name,
      street: value.street,
      city: value.city,
      state: value.state,
    });
  };

  const setUserReset = () => {
    setUser(null);
  };

  return (
    <userContext.Provider value={{user, setUserData, setUserReset}}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
