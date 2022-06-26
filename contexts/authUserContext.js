import React from 'react';

//Firebase Auth
import auth from '@react-native-firebase/auth';

export const authUserContext = React.createContext();

const AuthUserProvider = ({children}) => {
  const [authUser, setAuthUser] = React.useState({
    displayName: null,
    uid: null,
    phoneNumber: null,
  });

  React.useEffect(() => {
    const unlisten = auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser({
          displayName: user.displayName,
          uid: user.uid,
          phoneNumber: user.phoneNumber,
        });
      } else setAuthUserReset();
    });
    return () => unlisten();
  }, []);

  const setAuthUserData = async value => {
    setAuthUser({...authUser, displayName: value.displayName});
  };

  const setAuthUserReset = () => {
    setAuthUser({
      displayName: null,
      uid: null,
      phoneNumber: null,
    });
  };

  return (
    <authUserContext.Provider value={{authUser, setAuthUserData}}>
      {children}
    </authUserContext.Provider>
  );
};

export default AuthUserProvider;
