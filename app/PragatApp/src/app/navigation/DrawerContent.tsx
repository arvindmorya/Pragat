import * as React from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

import { DrawerItems } from "react-navigation";

export default class DrawerContent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

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
            <Text style={styles.textName}>Aakash Pandit</Text>

            <Text style={styles.textRole}>Profile Teacher</Text>
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
