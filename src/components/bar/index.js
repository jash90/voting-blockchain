import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import PropTypes from "prop-types";

export default class Bar extends Component {
  render() {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: this.props.background,
              borderColor: this.props.fill,
              borderWidth: 4,
              width: Dimensions.get("window").width * 0.55,
              height: this.props.height
            }}
          />
          <View
            style={{
              backgroundColor: this.props.fill,
              position: "absolute",
              top: 0,
              left: 0,
              width:
                (Dimensions.get("window").width *
                  0.55 *
                  this.props.procentage) /
                100,
              height: this.props.height
            }}
          />
          <View style={{ justifyContent: "center", marginLeft: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: this.props.fontSize,
                color: this.props.fill
              }}
            >
              {this.props.procentage + "%"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

Bar.propTypes = {
  procentage: PropTypes.number.isRequired
};

Bar.defaultProps = {
  procentage: 56,
  fill: "black",
  background: "white",
  fontSize: 22,
  height: 50
};
