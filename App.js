import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import List from './src/scene/List';
import Login from './src/scene/Login';
import Item from './src/scene/Item';
import Item2 from './src/scene/Item2';
import Register from './src/scene/Register';
import Tabs from './src/scene/Tabs';
import {MenuProvider} from "react-native-popup-menu"
export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <Router>
          <Stack key="root">
            <Scene key="Login" component={Login} hideNavBar/>
            <Scene key="List" component={List} hideNavBar/>
            <Scene key="Item" component={Item} hideNavBar/>
            <Scene key="Item2" component={Item2} hideNavBar/>
            <Scene key="Register" component={Register} hideNavBar/>
            <Scene key="Tabs" component={Tabs} hideNavBar initial/>
          </Stack>
        </Router>
      </MenuProvider>
    );
  }
}