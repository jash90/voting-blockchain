import React, {Component} from "react";

import {TextInput, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
export default class Input extends Component {
  render() {
    return (<TextInput
      autoCapitalize={this.props.autoCapitalize}
      onLayout={this.props.onLayout}
      underlineColorAndroid={"transparent"}
      placeholder={this.props.placeholder}
      secureTextEntry={this.props.secureTextEntry}
      onChangeText={text => this.props.onChangeText(text)}
      value={this.props.value}
      style={styles.textInputStyle}/>);
  }
}
Input.propTypes = {
  autoCapitalize: PropTypes.string,
  onLayout: PropTypes.func,
  underlineColorAndroid: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

Input.defaultProps = {
  autoCapitalize: "none",
  onLayout: ()=>{},
  underlineColorAndroid: "transparent",
  placeholder: "placeholder",
  secureTextEntry: false,
  onChangeText: ()=>{},
  value: "text"
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 20,
    width: "90%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
    alignSelf: "center",
    margin: 10
  }
});
