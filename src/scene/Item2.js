import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Fab, Icon as NIcon } from "native-base";
import Container from "@components/container";
import { Actions } from "react-native-router-flux";
import Accordion from "react-native-collapsible/Accordion";
import { Icon } from "native-base";
import _ from "lodash";
import CheckBoxButton from "@components/check-box-button";
import Button from "@components/button";
import Moment from "moment";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from "react-native-chart-kit";
import Color from "../Color";
import "babel-polyfill";
import Language from "../Language";
import Bar from "@components/bar";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      procentage: 67
    };
  }

  componentWillMount() {}

  render() {
    return(<FlatList
    data={[42,34,56,79].sort()}
    renderItem={({item})=><Bar procentage={item}/>}
    />);
  }
}

const styles = StyleSheet.create({});
