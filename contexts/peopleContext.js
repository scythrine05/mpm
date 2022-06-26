import React from 'react';

export const peopleContext = React.createContext();

const PeopleProvider = ({children}) => {
  const [people, setPeople] = React.useState([]);

  const setPeopleData = value => {
    setPeople([...people, value]);
  };

  const removePeopleData = value => {
    setPeople(prev => prev.filter(i => i.name !== value));
  };

  const setPeopleReset = () => {
    setPeople([]);
  };

  return (
    <peopleContext.Provider
      value={{people, setPeopleData, setPeopleReset, removePeopleData}}>
      {children}
    </peopleContext.Provider>
  );
};

export default PeopleProvider;
