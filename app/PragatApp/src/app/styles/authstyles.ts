import {StyleSheet, Platform} from 'react-native';

const authStyles = StyleSheet.create({
    textInput: {
        marginTop: 10,
        ...Platform.select({
            ios: {
              height: 50,
            },
            android: {
                height: 100,
            }
          }),
      }
});

export default authStyles;