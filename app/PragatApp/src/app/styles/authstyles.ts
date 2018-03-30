import { StyleSheet, Platform } from "react-native";

const authStyles = StyleSheet.create({
  textInput: {
    ...Platform.select({
      ios: {
        height: 30
      }
    })
  },
  lineH:{
    height: 1,
    marginTop: 2,
    marginBottom: 3,
    backgroundColor:"#a6a6a6"
  }
});

export default authStyles;