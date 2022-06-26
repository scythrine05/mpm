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
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

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
import Skeleton from '../components/skeleton/profile';
import Loading from '../components/bottomSheet/loading';
import Error from '../components/bottomSheet/error';
import Dp from '../components/bottomSheet/dp';

//Icons
import Feather from 'react-native-vector-icons/dist/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const defaultImg =
  'https://secondchancetinyhomes.org/wp-content/uploads/2016/09/empty-profile.png';

export default function Account() {
  const {authUser, setAuthUserData} = React.useContext(authUserContext);
  const {user} = React.useContext(userContext);

  const [image, setImage] = React.useState('');
  const [newImage, setNewImage] = React.useState('');
  const [name, setName] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [loadingMsg, setLoadingMsg] = React.useState('');
  const [err, setErr] = React.useState('');

  const navigation = useNavigation();

  const refLoading = React.useRef();
  const refDp = React.useRef();
  const refError = React.useRef();

  React.useEffect(() => {
    setName(user.name);
    setStreet(user.street);
    setCity(user.city);
    setState(user.state);
    setImage(user.dp);
  }, [user]);

  const updatePhoto = newImage => {
    //if image changed
    const uploadUri = newImage;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = fileName.split('.').pop();
    const newName = fileName.split('.').slice(0, -1).join('.');

    fileName = newName + Date.now() + '.' + extension;
    const task = storage().ref(`dp/${fileName}`).putFile(uploadUri);
    task.on(
      'state_changed',
      snapshot => {
        setLoadingMsg('updating display picture');
        refLoading.current.open();
      },
      error => {
        console.log(error);
      },
      async () => {
        const url = await storage().ref(`dp/${fileName}`).getDownloadURL();
        await auth().currentUser.updateProfile({
          PhotoUrl: url,
        });
        await firestore().collection('users').doc(authUser.uid).update({
          dp: url,
        });
        refLoading.current.close();
      },
    );
  };

  const update = async (name, street, state, city) => {
    setLoadingMsg('updating profile');
    refLoading.current.open();

    if (!name || !street || !city || !state) {
      refLoading.current.close();
      setErr('Fields should not be empty');
      refError.current.open();
    } else {
      try {
        await auth().currentUser.updateProfile({
          displayName: name,
        });
        await setAuthUserData({displayName: name});
        await firestore().collection('users').doc(authUser.uid).update({
          name,
          street,
          city,
          state,
        });
        navigation.goBack();
      } catch (e) {
        refLoading.current.close();
        console.log('error: ', e);
        setErr(e);
        refError.current.open();
      }
    }
  };

  const takeFromCamera = () => {
    ImagePicker.openCamera({
      idth: 150,
      height: 150,
      cropperCircleOverlay: true,
      cropping: true,
      hideBottomControls: true,
      enableRotationGesture: true,
      cropperToolbarTitle: '',
    })
      .then(image => {
        setNewImage(image.path);
        refDp.current.close();
      })
      .catch(e => console.log(e));
  };

  const takeFromDevice = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropperCircleOverlay: true,
      cropping: true,
      hideBottomControls: true,
      enableRotationGesture: true,
      cropperToolbarTitle: '',
    })
      .then(image => {
        setNewImage(image.path);
        refDp.current.close();
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView>
      <Loading ref={refLoading} msg={loadingMsg} />
      <Error ref={refError} msg={err} />
      <Dp
        ref={refDp}
        takeFromCamera={takeFromCamera}
        takeFromDevice={takeFromDevice}
      />
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => refDp.current.open()}>
            <View style={styles.image}>
              <Image
                style={styles.img}
                source={{
                  uri: newImage ? newImage : image ? image : defaultImg,
                }}
              />
              <Feather
                name="edit"
                size={25}
                color="#282c40"
                style={styles.edit}
              />
            </View>
          </TouchableOpacity>
          {newImage ? (
            <TouchableOpacity onPress={() => updatePhoto(newImage)}>
              <View style={styles.button}>
                <Text style={styles.button_text}>change photo</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <View style={styles.options}>
            <Text style={styles.each_sub}>Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder="Full Name"
              placeholderTextColor={'#7f7f7f'}
            />
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>Phone</Text>
            <TextInput
              style={styles.input}
              value={authUser.phoneNumber}
              editable={false}
            />
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>Street/Village/Town</Text>
            <TextInput
              style={styles.input}
              onChangeText={setStreet}
              value={street}
              placeholder="Street/Village/Town"
              placeholderTextColor={'#7f7f7f'}
            />
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>City</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCity}
              value={city}
              placeholder="City"
              placeholderTextColor={'#7f7f7f'}
            />
          </View>
          <View style={styles.options}>
            <Text style={styles.each_sub}>State</Text>
            <TextInput
              style={styles.input}
              onChangeText={setState}
              value={state}
              placeholder="State"
              placeholderTextColor={'#7f7f7f'}
            />
          </View>
          <TouchableOpacity onPress={() => update(name, street, state, city)}>
            <View style={styles.button}>
              <Text style={styles.button_text}>update profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    justifyContent: 'center',
    paddingRight: windowWidth / 10,
    paddingLeft: windowWidth / 10,
  },
  image: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  options: {
    marginRight: 30,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d8d8d8',
  },

  each_sub: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    marginTop: 20,
    color: '#4f4f4f',
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
  edit: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#008250',
  },
  button_text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#008250',
  },
});
