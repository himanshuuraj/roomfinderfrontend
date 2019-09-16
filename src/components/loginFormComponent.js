import React, { Component } from "react";
import {
  Platform,
  Text,
  View,
  Picker,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard
} from "react-native";
import { Container, Content, Badge, Button, Icon } from "native-base";
import { getFont, Color, getHeight, Font } from "./../global/util";
import { CheckBox } from "react-native-elements";
import EnterOTP from "./enterOtp";

export default class LoginFormComponent extends Component {
  state = {
    selectPrivacyPolicy: false,
    loginType: "phone"
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { height, width } = Dimensions.get("window");
    this.setState({
      height: height,
      width: width
    });
  }

  login = () => {
    if (this.state.loginType === "phone") {
      let { phone } = this.state;
      if (!phone) {
        alert("Please enter a phone number");
        return;
      }
      if (phone.length != 10) {
        alert("Please enter a valid phone number");
        return;
      }
    }
  };

  updateOTP = otp => {
    this.props.updateData({otp});
  };

  render() {
    return (
      <React.Fragment>
        <View
          style={{
            height: getHeight(5),
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start"
          }}
        >
          <Text
            style={{
              fontSize: getFont(18),
              fontFamily: Font.themeFont,
              color: "white"
            }}
          >
            {this.props.screenType === "login" ? "LOGIN USING" : null}
            {this.props.screenType === "registeration" ? "REGISTER" : null}
          </Text>
        </View>
        
        {this.props.screenType === "registeration" && (
          <View
            style={{
              height: getHeight(10),
              marginBottom: getHeight(4),
              flexDirection: "row"
            }}
          >
            <View
              style={{
                width: "49%",
                marginRight: "1%"
              }}
            >
              <View
                style={{
                  height: "40%"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: getFont(12),
                    marginBottom: 5
                  }}
                >
                  FIRST NAME
                </Text>
              </View>
              <View
                style={{
                  height: "60%",
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "white",
                  paddingLeft: 10,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Icon
                  name="ios-person"
                  style={{
                    fontSize: getFont(30),
                    color: "white",
                    marginRight: 10
                  }}
                />
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor={"#bbb"}
                  style={{
                    width: '100%',
                    color: Color.themeFontColor
                  }}
                  onChangeText={firstName => {
                    this.props.updateData({firstName});
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: "49%",
                marginLeft: "1%"
              }}
            >
              <View
                style={{
                  height: "40%"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: getFont(12),
                    marginBottom: 5
                  }}
                >
                  LAST NAME
                </Text>
              </View>
              <View
                style={{
                  height: "60%",
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "white",
                  paddingLeft: 10,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor={"#bbb"}
                  style={{
                    width: '100%',
                    color: Color.themeFontColor
                  }}
                  onChangeText={lastName => {
                    this.props.updateData({lastName});
                  }}
                />
              </View>
            </View>
            <View />
          </View>
        )}

        {this.props.screenType === "registeration" && (
          <View
            style={{
              height: getHeight(6),
              marginBottom: getHeight(4),
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "white"
            }}
          >
            <Picker
              selectedValue={this.state.gender}
              style={{ height: "100%", width: "100%", color: "white" }}
              onValueChange={gender => {
                this.setState({ gender });
                this.props.updateData({gender});
              }}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        )}

        {this.props.screenType === "login" && (
          <View
            style={{
              flexDirection: "row",
              height: getHeight(6),
              marginBottom: getHeight(2)
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ loginType: "phone" });
                this.props.updateData({ "loginType" : 'phone' });
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: this.state.loginType === "phone" ? 2 : 1,
                borderColor: this.state.loginType === "phone" ? "#fff" : "#eee"
              }}
            >
              <Text
                style={{
                  fontSize: this.state.loginType === "phone" ? 14 : 12,
                  color: this.state.loginType === "phone" ? "#fff" : "#bbb",
                  fontWeight:
                    this.state.loginType === "phone" ? "bold" : undefined
                }}
              >
                PHONE NUMBER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ loginType: "email" });
                this.props.updateData({ "loginType" : 'email' });
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: this.state.loginType === "email" ? 2 : 1,
                borderColor: this.state.loginType === "email" ? "#fff" : "#eee"
              }}
            >
              <Text
                style={{
                  fontSize: this.state.loginType === "email" ? 14 : 12,
                  color: this.state.loginType === "email" ? "#fff" : "#bbb",
                  fontWeight:
                    this.state.loginType === "email" ? "bold" : undefined
                }}
              >
                EMAIL
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.loginType === "phone" && (
          <View>
            <View
              style={{
                height: getHeight(10),
                marginBottom: getHeight(4)
              }}
            >
              <View
                style={{
                  height: "40%"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: getFont(12),
                    marginBottom: 5
                  }}
                >
                  ENTER PHONE
                </Text>
              </View>
              <View
                style={{
                  height: "60%",
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: "white",
                  paddingLeft: 10,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Icon
                  name="ios-phone-portrait"
                  style={{
                    fontSize: getFont(30),
                    color: "white",
                    marginRight: 10
                  }}
                />
                <TextInput
                  placeholder="Enter Phone"
                  placeholderTextColor={"#bbb"}
                  onChangeText={phoneNumber => this.props.updateData({phoneNumber})}
                  keyboardType={"numeric"}
                  maxLength={10}
                  style={{
                    color: Color.themeFontColor,
                    width: "70%",
                    borderRadius: 4
                  }}
                />
                {
                  this.props.screenType === "login" && (
                    <TouchableOpacity
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Color.themeFontColor,
                    height: "100%",
                    width: "23%",
                    borderRadius: 4
                  }}
                  onPress={() => {
                    this.props.sendOTP();
                  }}
                >
                  <Text
                    style={{
                      color: Color.themeColor,
                      fontSize: 12
                    }}
                  >
                    {" "}
                    Send{" "}
                  </Text>
                  <Text
                    style={{
                      color: Color.themeColor,
                      fontSize: 12
                    }}
                  >
                    {" "}
                    OTP{" "}
                  </Text>
                </TouchableOpacity>)
                }
              </View>
            </View>
            { this.props.screenType === "login" && (
              <View
                style={{
                height: getHeight(10),
                marginBottom: getHeight(4)
              }}>
              <View
                style={{
                  height: "40%"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: getFont(12),
                    marginBottom: 5
                  }}
                >
                  OTP
                </Text>
              </View>
              <View
                style={{
                  height: "60%",
                  borderRadius: 5,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <EnterOTP updateOTP={this.updateOTP} />
              </View>
            </View>)
            }
          </View>
        )}

        {(this.state.loginType === "email" ||
          this.props.screenType === "registeration") && (
          <View>
            <View
              style={{
                height: getHeight(10),
                marginBottom: getHeight(4)
              }}
            >
              <View
                style={{
                  height: "40%"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: getFont(12),
                    marginBottom: 5
                  }}
                >
                  ENTER EMAIL
                </Text>
              </View>
              <View
                style={{
                  height: "60%",
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "white",
                  paddingLeft: 10,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Icon
                  name="ios-mail"
                  style={{
                    fontSize: getFont(30),
                    color: "white",
                    marginRight: 10
                  }}
                />
                <TextInput
                  placeholder="Enter Email"
                  placeholderTextColor={"#bbb"}
                  onChangeText={email => this.props.updateData({email})}
                  style={{
                    color: Color.themeFontColor,
                    width: "100%"
                  }}
                />
              </View>
            </View>
            <View
              style={{
                height: getHeight(10),
                marginBottom: getHeight(4)
              }}
            >
              <View
                style={{
                  height: "40%"
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: getFont(12),
                    marginBottom: 5
                  }}
                >
                  PASSWORD
                </Text>
              </View>
              <View
                style={{
                  height: "60%",
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "white",
                  paddingLeft: 10,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Icon
                  name="ios-lock"
                  style={{
                    fontSize: getFont(30),
                    color: "white",
                    marginRight: 10
                  }}
                />
                <TextInput
                  placeholder="Enter Password"
                  placeholderTextColor={"#bbb"}
                  secureTextEntry={true}
                  textContentType={"password"}
                  onChangeText={password => this.props.updateData({password})}
                  style={{
                    color: Color.themeFontColor,
                    width: "100%"
                  }}
                />
              </View>
            </View>
          </View>
        )}

        <View
          style={{
            width: "100%",
            flexDirection: "row"
          }}
        >
          <View
            style={{
              width: "10%"
            }}
          >
            <CheckBox
              color={Color.themeColor}
              center
              onPress={() => {
                this.props.updateData({selectPrivacyPolicy : !this.state.selectPrivacyPolicy});
                this.setState({
                  selectPrivacyPolicy: !this.state.selectPrivacyPolicy
                });
              }}
              checked={this.state.selectPrivacyPolicy}
              uncheckedColor={"white"}
              checkedColor={"white"}
              containerStyle={{}}
            />
          </View>
          <View
            style={{
              width: "90%",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: Color.themeFontColor
              }}
            >
              By registering you are agreeing to our
            </Text>
            <Text
              style={{
                color: Color.themeFontColor,
                textDecorationLine: "underline"
              }}
            >
              Privacy Policy and terms of use
            </Text>
          </View>
        </View>
        
        <View
          style={{
            height: getHeight(6),
            marginBottom: getHeight(2),
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              this.props.onSubmit();
            }}
            style={{
              backgroundColor: Color.themeFontColor,
              borderRadius: 4,
              width: "100%",
              height: "100%",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: getFont(16),
                color: Color.themeColor,
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              {this.props.screenType === "login" ? "LOG IN" : null}
              {this.props.screenType === "registeration" ? "REGISTER" : null}
            </Text>
          </TouchableOpacity>
        </View>
      
      </React.Fragment>
    );
  }
}
