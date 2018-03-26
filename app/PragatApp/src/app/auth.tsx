import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-key";

//export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = async() => {
  try {
    const value = await AsyncStorage.getItem(USER_KEY);
    if (value !== null){
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
  // return new Promise((resolve, reject) => {
  //   AsyncStorage.setItem(USER_KEY)
  //   .then(res => {
  //     if(res !== null) {
  //       resolve(true);
  //     } else {
  //       resolve(false);
  //     }
  //   })
  //   .catch(err => reject(err));
  // });
};
