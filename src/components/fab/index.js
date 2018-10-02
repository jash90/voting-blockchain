import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, PixelRatio } from "react-native";
import {Card} from "native-base"
import MIcon from "react-native-vector-icons/MaterialIcons";
class Fab extends Component {
  render() {
    return (
    <TouchableOpacity style={{flex:1}} onPress={this.props.onPress}>
    <Card style={[styles.fab, this.props.styleFab]}>
    {this.renderContent()}
    </Card>
    </TouchableOpacity>
    );
  }
  renderIcon() {
    return (
      <MIcon
        name={this.props.iconName ? this.props.iconName : "add"}
        style={[styles.icon, this.props.styleIcon]}
      />
    );
  }
  renderContent(){
    if (this.props.children){
      return this.props.children;
    }else{
      return this.renderIcon();
    }
  }
}

export default Fab;

const styles = StyleSheet.create({
  icon: {
    color: "#000",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 360,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  }
});
