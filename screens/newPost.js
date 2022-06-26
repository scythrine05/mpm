//Modules
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

//Firebase Auth
import auth from '@react-native-firebase/auth';

//Firebase Storage
import storage from '@react-native-firebase/storage';

//Firestore
import firestore from '@react-native-firebase/firestore';

//Contexts
import {authUserContext} from '../contexts/authUserContext';
import {userContext} from '../contexts/userContext';

//Components
import Loading from '../components/bottomSheet/loading';
import Error from '../components/bottomSheet/error';
import Warning from '../components/bottomSheet/warning';

//Icons
import Feather from 'react-native-vector-icons/dist/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function NewPost({navigation}) {
  const {user} = React.useContext(userContext);

  const [images, setImages] = React.useState(null);

  const [loadingMsg, setLoadingMsg] = React.useState('');
  const [err, setErr] = React.useState('');

  const refLoading = React.useRef();
  const refError = React.useRef();
  const refWarning = React.useRef();

  const uploadImages = () => {
    setLoadingMsg('uploading images');
    refLoading.current.open();
    if (!images) {
      refLoading.current.close();
      setErr('Fields should not be empty');
      refError.current.open();
    } else {
      try {
        const doc = firestore().collection('posts').doc();
        const imagePromises = [];
        const imageUrls = [];
        images.forEach((image, index) => {
          const uploadUri = image;
          let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
          const extension = fileName.split('.').pop();
          const newName = fileName.split('.').slice(0, -1).join('.');
          fileName = newName + Date.now() + '.' + extension;
          const task = storage()
            .ref(`posts/${doc.id}/${fileName}`)
            .putFile(uploadUri);
          imagePromises.push(task);
          task.on(
            'state_changed',
            snapshot => {},
            error => {
              console.log(error);
            },
            () => {
              storage()
                .ref(`posts/${doc.id}/${fileName}`)
                .getDownloadURL()
                .then(url => imageUrls.push(url));
            },
          );
        });
        Promise.all(imagePromises)
          .then(() => {
            navigation.navigate('NewPost2', {imageUrls, id: doc.id});
          })
          .catch(error => console.log(error));
      } catch (e) {
        refLoading.current.close();
        console.log('error: ', e);
        setErr(e);
        refError.current.open();
      }
    }
  };

  const takeFromDevice = () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(image => {
        if (image.length > 10) {
          setErr('maximum 10 images');
          refError.current.open();
        } else {
          const data = [];
          image.map(i => data.push(i.path));
          setImages(data);
        }
      })
      .catch(e => console.log(e));
  };

  const _renderItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.num}>
          <Text style={styles.num_text}>
            {index + 1} / {images.length}
          </Text>
        </View>
        <Image style={styles.sub_main} source={{uri: item}} />
      </View>
    );
  };

  return (
    <>
      <Loading ref={refLoading} msg={loadingMsg} />
      <Error ref={refError} msg={err} />

      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          {images ? (
            <FlatList
              data={images}
              decelerationRate="fast"
              renderItem={_renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              disableintervalmomentum={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              legacyImplementation={false}
            />
          ) : (
            <TouchableOpacity onPress={takeFromDevice}>
              <View style={styles.image_main}>
                <View style={styles.button_sm}>
                  <Text style={styles.button_sm_text}>add images</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          <View
            style={{
              paddingRight: windowWidth / 10,
              paddingLeft: windowWidth / 10,
            }}>
            <TouchableOpacity onPress={() => uploadImages()}>
              <View style={styles.button}>
                <Text style={styles.button_text}>next</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setImages(null)}>
              <View style={styles.button}>
                <Text style={styles.button_text}>reset</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    justifyContent: 'center',
  },
  image_main: {
    height: windowHeight / 2,
    width: windowWidth / 1.05,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#d0312d',
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  num: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 6,
    borderRadius: 10,
  },
  num_text: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Nunito-SemiBold',
  },
  sub_main: {
    height: windowHeight / 2,
    width: windowWidth,
  },
  options: {
    marginRight: 30,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d8d8d8',
  },
  options_heading: {
    marginRight: 30,
    paddingLeft: 20,
  },
  each_sub: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    marginTop: 20,
    color: '#4f4f4f',
  },
  each_heading: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginTop: 20,
    color: '#282c40',
  },
  input: {
    fontSize: 14,
    padding: 0,
    width: windowWidth / 2,
    fontFamily: 'Nunito-Medium',
    marginTop: 10,
    paddingBottom: 20,
    color: '#282c40',
  },

  button: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d0312d',
  },
  button_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#d0312d',
  },
  button_sm: {
    width: windowWidth / 4,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d0312d',
  },
  button_sm_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 11,
    color: '#d0312d',
  },
});
