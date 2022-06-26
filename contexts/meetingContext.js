import React from 'react';

//Firestore
import firestore from '@react-native-firebase/firestore';

//Contexts
import {authUserContext} from './authUserContext';

export const meetingContext = React.createContext();

const MeetingProvider = ({children}) => {
  const {authUser} = React.useContext(authUserContext);

  const [meetings, setMeetings] = React.useState([]);
  const [meetMax] = React.useState(10);
  const [lastMeet, setLastMeet] = React.useState(false);
  const [startAfter, setStartAfter] = React.useState(Object);

  React.useEffect(() => {
    let mounted = true;
    if (mounted && authUser) {
      const fetchData = async () => {
        const querySnapshot = await firestore()
          .collection('meetings')
          .limit(meetMax)
          .orderBy('created', 'desc')
          .get();
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setStartAfter(lastVisible);
        const chartData = querySnapshot.docs.map(doc => doc.data());
        setMeetings([...meetings, ...chartData]);
      };
      fetchData();
    }
    return () => (mounted = false);
  }, []);

  const setMeetData = data => {
    setMeetings([...meetings, data]);
  };

  getMoreMeets = async () => {
    if (!lastMeet) {
      const querySnapshot = await firestore()
        .collection('meetings')
        .limit(meetMax)
        .orderBy('created', 'desc')
        .startAfter(startAfter)
        .get();
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setStartAfter(lastVisible);
      const chartData = querySnapshot.docs.map(doc => doc.data());
      setMeetings([...meetings, ...chartData]);
      chartData.length == 0 ? setLastMeet(true) : setLastMeet(false);
    }
  };

  return (
    <meetingContext.Provider
      value={{meetings, setMeetData, lastMeet, getMoreMeets}}>
      {children}
    </meetingContext.Provider>
  );
};

export default MeetingProvider;
