import * as React from "react";

import { View, Text, Image, StyleSheet, TouchableHighlight } from "react-native";

interface props {}

interface state {}

export default class AuthSuccessScreen extends React.Component<any,any> {
  static navigationOptions = {
    header: null
  };

  onButtonClicked = () => {
    this.props.navigation.navigate("login");
  }
  render() {
    return (
      <View style= {styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.gpfText}>to the GPF Plannig App</Text>
          <View style = {styles.line}/>
        </View>

        <View style = {styles.textContainer}>
          <Text style={styles.normalText}>Plan your Day & Month</Text>
          <Text style={styles.normalText}>Manage Classes & Assesment</Text>
          <Text style={styles.normalText}>Track Sikshan Parishad Meetings</Text>
          <Text style={styles.normalText}>and</Text>
          <Text style={styles.normalText}>Collaborate With other teachers</Text>
        </View>

        <TouchableHighlight
          style={styles.button}
          onPress={this.onButtonClicked}>
          <Text style={styles.buttonText}> Lets get started </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: "#2a8bcc",
    flex:1,
    justifyContent:"center",
    alignItems: "center"

  },
  welcomeContainer: {
    justifyContent: 'center',
    alignItems:'center'
  
  },
  textContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems:'center'
  },

  button: {
    marginTop:70,
    height: 50,
    width:250,
    justifyContent: "center",
    alignItems: "center",
    paddingRight:30,
    paddingLeft: 30,
    backgroundColor: "#00cc66",
    borderRadius: 30
  },

  buttonText: {
    color: "#FAFAFA",
    fontSize: 20,
    fontWeight: "600"
  },

  welcomeText: {
    color: "#FAFAFA",
    fontSize: 50,
    fontWeight: "600"
  },
  gpfText: {
    color: "#FAFAFA",
    fontSize: 22,
  },

  normalText: {
    marginTop:10,
    color: "#FAFAFA",
    fontSize: 20,
  },

  line: {
    marginTop:30,
    width: 150,
    height:1,
    backgroundColor: "#FAFAFA"
  }
});
