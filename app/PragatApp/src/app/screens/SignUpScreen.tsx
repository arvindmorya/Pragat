import * as React from "react";

import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet
} from "react-native";

import ProfilePic from "../components/auth/signup/ProfilePic";
import BasicDetails from "../components/auth/signup/BasicDetails";
import SchoolDetails from "../components/auth/signup/SchoolDetails";
import AuthDetails from "../components/auth/signup/AuthDetails";
import ClusterDetails from "../components/auth/signup/ClusterDetails";

import { signUp } from "../utils/NetworkManager";

interface state {
  name: string;
  nameValidated: boolean;
  role: string;
  phone_number: string;
  phoneValidated: boolean;
  email: string;
  emailValidated: boolean;
  schoolorClusterDetails: any;
  schoolorClusterDetailsValidated: boolean;
  udiseId: string;
  udiseIdValidated: boolean;
  password: string;
  passwordValidated: boolean;
  isAllDeailsFilled: boolean;
  signUpBtnColor: string;
}

interface props {
  navigation: any;
}
export default class SignUpScreen extends React.Component<props,state> {
  constructor(props:any ) {
    super(props);
    this.state = {
      name: "",
      nameValidated: false,
      role: "",
      phone_number: "",
      phoneValidated: false,
      email: "",
      emailValidated: false,
      schoolorClusterDetails: { clusterId: "", schoolId: "", kpId: "" },
      schoolorClusterDetailsValidated: false,
      udiseId: "",
      udiseIdValidated: false,
      password: "",
      passwordValidated: false,
      isAllDeailsFilled: false,
      signUpBtnColor: "#d9d9d9"
    };
  }

  static navigationOptions = ({navigation}:any) => {
    const { params } = navigation.state;
    var roleP = params ? params.role : "";
    var signupTitle = "SignUp - ".concat(roleP);
    return {
      title: signupTitle,
      headerBackTitle: null
    };
  };

  setName = (nameFromChild: string, isValid: boolean) => {
    //alert(String(nameFromChild).concat(" : name"));
    this.setState({ name: nameFromChild, nameValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setPhoneNumber = (phoneNumber: string, isValid: boolean) => {
    this.setState({ phone_number: phoneNumber, phoneValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setEmailId = (emailId: string, isValid: boolean) => {
    //alert(String(emailId).concat(" : email"));
    this.setState({ email: emailId, emailValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setSchoolOrClusterDetails = (details:object, isValid:boolean) => {
  //  alert(JSON.stringify(details));
    this.setState({ schoolorClusterDetails: details, schoolorClusterDetailsValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setUdiseId = (udiseId:string, isValid:boolean) => {
    this.setState({ udiseId: udiseId, udiseIdValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  setPassword = (password:string, isValid:boolean) => {
    this.setState({ password: password, passwordValidated: isValid }, () =>
      this.validateIfAllDetailsFiled()
    );
  };

  validateIfAllDetailsFiled = () => {
    let isNameValidated:boolean = this.state.nameValidated;
    let isPhoneValidated:boolean = this.state.phoneValidated;
    let isEmailValidated:boolean = this.state.emailValidated;
    let isSchoolorClusterValidated:boolean = this.state.schoolorClusterDetailsValidated;
    let isUdiseIdValidated:boolean = this.state.udiseIdValidated;
    let isPasswordValidated:boolean = this.state.passwordValidated;
    let valid:boolean =
      isNameValidated &&
      isPhoneValidated &&
      isEmailValidated &&
      isUdiseIdValidated &&
      isSchoolorClusterValidated &&
      isPasswordValidated;
    this.setState({
      isAllDeailsFilled: valid,
      signUpBtnColor: valid ? "#00cc66" : "#d9d9d9"
    });
  };

  onPressSignUp = () => {
    if (this.state.isAllDeailsFilled) {
      let signUpDetails: any = {
        name: this.state.name,
        role: this.props.navigation.state.params.role,
        email: this.state.email,
        phone_number: this.state.phone_number,
        udise_id: this.state.udiseId,
        password: this.state.password
      };

      for (var info in this.state.schoolorClusterDetails) {
        if (this.state.schoolorClusterDetails.hasOwnProperty(info)) {
          signUpDetails[info] = this.state.schoolorClusterDetails[info];
        }
      }
      signUp(signUpDetails).then(responseJson => {
        if (responseJson.error) {
          let errorObj = responseJson.error;
          if (errorObj.message) {
            alert("Sign Up Failed.\n Reason".concat(errorObj.message));
          } else {
            alert("Sign Up Failed.");
          }
        } else {
          alert("Successfully Signed Up.");
        }
      });
    } else {
      var str =
        "name ".concat(String(this.state.nameValidated)) +
        "\nphone ".concat(String(this.state.phoneValidated)) +
        "\nemail ".concat(String(this.state.emailValidated)) +
        "\nschool ".concat(String(this.state.schoolorClusterDetailsValidated)) +
        "\nudisee ".concat(String(this.state.udiseIdValidated)) +
        "\npassword ".concat(String(this.state.passwordValidated));
      alert("Some details are not complete\n".concat(str));
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <ProfilePic />
          
          <BasicDetails
            setName={this.setName}
            setPhoneNumber={this.setPhoneNumber}
            setEmailId={this.setEmailId}
          />

          {this.props.navigation.state.params.role === "Teacher" && (
            <SchoolDetails
              style={{ marginTop: 60 }}
              setSchoolDetails={this.setSchoolOrClusterDetails}
            />
          )}

          {this.props.navigation.state.params.role === "Kendra Pramukh" && (
            <ClusterDetails
              style={{ marginTop: 60 }}
              setClusterDetails={this.setSchoolOrClusterDetails}
            />
          )}

          <AuthDetails
            setUdiseId={this.setUdiseId}
            setPassword={this.setPassword}
          />

          <TouchableHighlight
            onPress={this.onPressSignUp}
            style={[
              styles.button,
              { marginTop: 30, backgroundColor: this.state.signUpBtnColor }
            ]}
          >
            <Text style={styles.buttonText}> Sign Up </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6e6"
  },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 30
  },
  buttonText: {
    color: "#595959",
    fontSize: 20,
    fontWeight: "600"
  }
});
