import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import List from './src/scene/List';
import Login from './src/scene/Login';
import Item from './src/scene/Item';
import Item2 from './src/scene/Item2';
import Register from './src/scene/Register';
import AutocompleteScene from "./src/scene/AutocompleteScene";
export default class App extends Component {
  componentWillMount() {}
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="Login" component={Login} hideNavBar/>
          <Scene key="List" component={List} hideNavBar/>
          <Scene key="Item" component={Item} hideNavBar/>
          <Scene key="Item2" component={Item2} hideNavBar/>
          <Scene key="Register" component={Register} hideNavBar initial/>
          <Scene key="AutocompleteScene" component={AutocompleteScene} hideNavBar/>
        </Stack>
      </Router>
    );
  }
}