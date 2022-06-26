import React from 'react';

//Firestore
import firestore from '@react-native-firebase/firestore';

//Contexts
import {authUserContext} from './authUserContext';

export const postContext = React.createContext();

const PostProvider = ({children}) => {
  const {authUser} = React.useContext(authUserContext);

  const [posts, setPosts] = React.useState([]);
  const [postMax] = React.useState(10);
  const [lastPost, setLastPost] = React.useState(false);
  const [startAfter, setStartAfter] = React.useState(Object);

  React.useEffect(() => {
    let mounted = true;
    if (mounted && authUser) {
      const fetchData = async () => {
        const querySnapshot = await firestore()
          .collection('posts')
          .limit(postMax)
          .orderBy('created', 'desc')
          .get();
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setStartAfter(lastVisible);
        const chartData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts([...posts, ...chartData]);
      };
      fetchData();
    }
    return () => (mounted = false);
  }, []);

  const setPostData = data => {
    setPosts([...posts, data]);
  };

  const getMorePost = async () => {
    if (!lastPost) {
      const querySnapshot = await firestore()
        .collection('posts')
        .limit(postMax)
        .orderBy('created', 'desc')
        .startAfter(startAfter)
        .get();
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setStartAfter(lastVisible);
      const chartData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts([...posts, ...chartData]);
      chartData.length == 0 ? setLastPost(true) : setLastPost(false);
    }
  };

  return (
    <postContext.Provider
      value={{
        posts,
        setPostData,
        lastPost,
        getMorePost,
      }}>
      {children}
    </postContext.Provider>
  );
};

export default PostProvider;
