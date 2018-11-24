import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { Container, Fab } from '../components';
import { Actions } from 'react-native-router-flux';
import { Card } from 'native-base';
import _ from 'lodash';
import { DateTimeFormatter, LocalDate } from 'js-joda';
import Api from '../api';
import { observer, inject } from 'mobx-react';
import { Functions } from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isStrictModeEnabled } from 'mobx';
@inject('authStore')
@observer
export default class HomeMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      activeSection: false,
      collapsed: true
    };
  }
  componentDidMount = () => {
    Api.getQuestionsMod(this.props.authStore.getToken())
      .then(response => {
        if (response.status === 200) {
          this.setState({ questions: response.data });
        } else if (response.message) {
          alert(response.message);
        } else {
          alert(response.message.detail);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <Container back>
        <FlatList
          keyExtractor={(item, index) => String(index)}
          data={this.state.questions.sort((a, b) => {
            return b.publicated - a.publicated;
          })}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => this.selectQuestion(item)}>
              <Card
                style={{
                  flex: 1,
                  width: '90%',
                  alignSelf: 'center',
                  padding: 10,
                  borderRadius: 20,
                  borderColor: 'grey',
                  borderWidth: 1
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 24,
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>
                    {item.name}
                  </Text>
                  <Icon
                    style={{ paddingLeft: 10, alignItems: 'center' }}
                    name={this.getIcon(item.publicatedDateEnd)}
                    size={27}
                    adjustsFontSizeToFit
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingTop: 15
                  }}>
                  <Text>{'Data zakończenia:'}</Text>
                  <Text>{Functions.getDate(item.publicatedDateEnd)}</Text>
                </View>
                {this.renderResult(item)}
              </Card>
            </TouchableWithoutFeedback>
          )}
        />
        <Fab icon onPress={() => this.addQuestion()} />
      </Container>
    );
  }

  renderResult(item) {
    if (item.publicatedDateEnd) {
      return (
        <TouchableOpacity onPress={() => this.visibleResult(item)}>
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              padding: 10,
              borderRadius: 20,
              backgroundColor: 'grey',
              borderColor: 'black',
              borderWidth: 1,
              paddingHorizontal: 60,
              marginTop: 20,
              marginBottom: 5
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold'
              }}>
              Wyniki
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  getIcon(date) {
    if (date) {
      return 'lock';
    }
    return 'edit';
  }

  selectQuestion(item) {
    if (!item.publicated) {
      Actions.AddQuestion({ question: item });
    }
  }

  addQuestion() {
    Actions.AddQuestion();
  }

  visibleResult(item) {
    Actions.ResultQuestion({ question: item });
  }
}

const styles = StyleSheet.create({});
