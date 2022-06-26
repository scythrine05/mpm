import React from 'react';

export const confirmContext = React.createContext();

const ConfirmProvider = ({children}) => {
  const [confirm, setConfirm] = React.useState(null);

  const setConfirmData = async value => {
    setConfirm(value);
  };
  return (
    <confirmContext.Provider value={{confirm, setConfirmData}}>
      {children}
    </confirmContext.Provider>
  );
};

export default ConfirmProvider;
