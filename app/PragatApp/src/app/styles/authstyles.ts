import { StyleSheet, Platform } from "react-native";

const authStyles = StyleSheet.create({
  textInput: {
    ...Platform.select({
      ios: {
        height: 30
      }
    })
  }
});

export default authStyles;