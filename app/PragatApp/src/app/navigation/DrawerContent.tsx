import * as React from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView, AsyncStorage
} from "react-native";

import { DrawerItems } from "react-navigation";
interface state {
  name: string;
  role: string;
  avatarUri: string;
}
export default class DrawerContent extends React.Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      role: "",
      avatarUri: "",
    }
    this.setUpProfileData();
  }

  setUpProfileData = async () => {
    let user: string = await AsyncStorage.getItem("user");
    let name:string = "";
    let role:string = "";
    let avatar;
    if (user) {
      try {
        let userJson: any = JSON.parse(user);
        if(userJson && userJson.name) {
          name  = userJson.name;
        } else {
          name = "";
        }
        if(userJson && userJson.role) {
          if(userJson.role === "kp"){
            role = "Kendra Pramukh"
          } else if (userJson.role === "teacher"){
            role = "Teacher"
          } else {
            role = ""
          }
        }
        this.setState({name: name, role: role});
      } catch (e) {
        console.log("Exception : " + e.message);
      }
    }
  };

  render() {
    return (
      <View>
        <View style={styles.avtarContainer}>
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={styles.image}
              source={require("../../../res/images/bg_image.png")}
            />
            <Text style={styles.textName}>{this.state.name}</Text>

            <Text style={styles.textRole}>Profile - {this.state.role}</Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent: "flex-end",
              flex: 1,
              marginTop: 10,
              marginBottom: 30
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("DrawerClose")}
            >
              <Image
                style={styles.icon}
                source={require("../../../res/images/ic_clear.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={styles.icon}
                source={require("../../../res/images/ic_create_white.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <ScrollView>
            <DrawerItems {...this.props} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avtarContainer: {
    flexDirection: "row",
    backgroundColor: "#2B8CD6",
    paddingTop: 30,
    paddingBottom: 10
  },

  textName: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 20
  },
  textRole: {
    color: "#ffffff",
    fontSize: 22,
    paddingTop: 10,
    paddingBottom: 10
  },
  icon: {
    width: 20,
    height: 20
  },
  image: {
    height: 120,
    borderRadius: 60,
    width: 120,
    marginTop: 30
  }
});
