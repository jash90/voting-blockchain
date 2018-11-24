import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Container } from '../components';
import { Card, Icon } from 'native-base';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';
import Api from '../api';
import { Actions } from 'react-native-router-flux';
import { Functions } from '../utils';
@inject('authStore')
@observer
export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      multiAnswer: true,
      date: null,
      answers: ['odpowiedz 1', 'odpowiedz 2', 'odpowiedz 3'],
      publicated: false,
      publicatedDate: null,
      publicatedDateEnd: null,
      userRoleId: 3
    };
  }

  componentDidMount = () => {
    if (this.props.question) {
      let { question } = this.props;
      let {
        name,
        multiAnswer,
        date,
        publicated,
        publicatedDate,
        publicatedDateEnd,
        userRoleId
      } = question;
      this.setState({
        name,
        multiAnswer,
        date,
        publicated,
        publicatedDate,
        publicatedDateEnd,
        userRoleId
      });
      console.log(this.props.question);

      Api.getAnswers(this.props.authStore.getToken(), this.props.question.id)
        .then(response => {
          if (response.status === 200) {
            console.log(response);
            this.setState({ answers: response.data });
          } else if (response.message) {
            alert(response.message);
          } else {
            alert(response.message.detail);
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  render() {
    let { name, multiAnswer } = this.state;
    return (
      <Container back scroll right onPress={() => this.onSave()} icon="save">
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}>
          <Card
            style={{
              width: '90%',
              padding: 10,
              borderRadius: 20,
              alignSelf: 'center'
            }}>
            <View
              style={{
                alignItems:"center",
                height: 25,
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}>
              <Text style={{ fontSize: 14 }}>{'Data zakończenia'}</Text>
              <Text style={{ fontSize: 14 }}>
                {Functions.getDate(this.state.publicatedDate)}
              </Text>
            </View>
          </Card>
          <Card
            style={{
              width: '90%',
              padding: 10,
              borderRadius: 20,
              alignSelf: 'center'
            }}>
            <TextInput
              style={{ height: 40, fontSize: 20 }}
              placeholder={'Pytanie'}
              value={name}
              onChangeText={name => this.setState({ name })}
            />
          </Card>
          <Card
            style={{
              width: '90%',
              padding: 10,
              borderRadius: 20,
              alignSelf: 'center'
            }}>
            <View
              style={{
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                {multiAnswer ? 'Wiele odpowiedzi' : 'Jedna odpowiedź'}
              </Text>
              <Switch
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                value={multiAnswer}
                onValueChange={multiAnswer => this.setState({ multiAnswer })}
              />
            </View>
          </Card>
          <FlatList
            ListHeaderComponent={() => (
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center'
                }}>
                <TouchableOpacity onPress={() => this.addAnswer()}>
                  <Card
                    style={{
                      padding: 10,
                      borderRadius: 360,
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Text>+</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
                <Card
                  style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 360,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text>Odpowiedzi</Text>
                  </View>
                </Card>
              </View>
            )}
            data={this.state.answers}
            renderItem={item => this.renderItem(item.item, item.index)}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </Container>
    );
  }
  addAnswer = () => {
    let answers = this.state.answers;
    answers.push('');
    this.setState({ answers });
  };

  renderItem = (item, index) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center'
        }}>
        <Card
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TextInput
            value={item.name}
            style={{ width: '90%' }}
            placeholderTextColor="grey"
            placeholder="treść odpowiedzi"
          />
        </Card>
        <TouchableOpacity onPress={() => this.removeAnswer(index)}>
          <Card
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Icon name="close" style={{ paddingVertical: 5 }} />
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  removeAnswer = index => {
    console.log(index);
    this.setState({
      answers: this.state.answers.filter((_, i) => i !== index)
    });
  };

  onSave = () => {
    let { name, multiAnswer, register } = this.state;
    let { authStore } = this.props;
    Api.addUserRole(authStore.getToken(), name, multiAnswer, register)
      .then(response => {
        if (response.status === 200) {
          alert(`Rola ${name} została dodana.`);
          Actions.HomeAdmin();
        } else if (response.message) {
          alert(response.message);
        } else {
          alert(JSON.stringify(response.message.detail));
        }
      })
      .catch(error => {
        alert(error);
      });
  };
}
const styles = StyleSheet.create({});
