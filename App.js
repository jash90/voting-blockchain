import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {
  Login,
  AnswerItem,
  Register,
  HomeAdmin,
  HomeMod,
  HomeUser,
  QuestionItem
} from "./src/scene"
import {MenuProvider} from "react-native-popup-menu"
export default class App extends Component {
  render() {
    return (
      <MenuProvider>
        <Router>
          <Stack key="root">
            <Scene key="Login" component={Login} hideNavBar/>
            <Scene key="Register" component={Register} hideNavBar/>
            <Scene key="QuestionItem" component={QuestionItem} hideNavBar/>
            <Scene key="AnswerItem" component={AnswerItem} hideNavBar/>
            <Scene key="HomeAdmin" component={HomeAdmin} hideNavBar/>
            <Scene key="HomeMod" component={HomeMod} hideNavBar/>
            <Scene key="HomeUser" component={HomeUser} hideNavBar/>
          </Stack>
        </Router>
      </MenuProvider>
    );
  }
}