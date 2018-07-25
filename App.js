import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import List from './src/scene/List';
import Login from './src/scene/Login';
import Item from './src/scene/Item';
export default class App extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="List" component={List} hideNavBar />
          <Scene key="Login" component={Login} hideNavBar />
          <Scene key="Item" component={Item} hideNavBar />
        </Stack>
      </Router>
    );
  }
}