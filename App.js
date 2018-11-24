import React, { Component } from "react";
import { Router, Stack, Scene } from "react-native-router-flux";
import {
  Login,
  AnswerItem,
  Register,
  HomeAdmin,
  HomeMod,
  HomeUser,
  QuestionItem,
  AddUserRole,
  AddQuestion,
  ResultQuestion
} from "./src/scene";
import { MenuProvider } from "react-native-popup-menu";
import store from "./src/store";
import { Provider } from "mobx-react";
export default class App extends Component {
  render() {
    return (
      <MenuProvider>
      <Provider {...store}>
        <Router>
          <Stack key="root">
            <Scene key="Login" component={Login} hideNavBar />
            <Scene key="Register" component={Register} hideNavBar />
            <Scene key="QuestionItem" component={QuestionItem} hideNavBar />
            <Scene key="AnswerItem" component={AnswerItem} hideNavBar />
            <Scene key="HomeAdmin" component={HomeAdmin} hideNavBar />
            <Scene key="HomeMod" component={HomeMod} hideNavBar />
            <Scene key="HomeUser" component={HomeUser} hideNavBar />
            <Scene key="AddUserRole" component={AddUserRole} hideNavBar />
            <Scene key="AddQuestion" component={AddQuestion} hideNavBar />
            <Scene key="ResultQuestion" component={ResultQuestion} hideNavBar />
          </Stack>
        </Router>
        </Provider>
      </MenuProvider>
    );
  }
}
