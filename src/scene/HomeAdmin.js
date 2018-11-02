import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { Switch } from 'native-base';
import { Container, Fab } from '../components';
import { Actions } from 'react-native-router-flux';
import { Card } from 'native-base';
import _ from 'lodash';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Api from '../api';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import selection from '../../icons/selection.json';
const Icon = createIconSetFromIcoMoon(selection);
import { observer, inject } from 'mobx-react';

@inject('authStore')
@observer
export default class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRoles: []
    };
  }

  componentDidMount = () => {
    Api.getUserRole()
      .then(response => {
        if (response.status === 200) {
          this.setState({ userRoles: response.data });
          console.log(response.data);
        } else {
          alert(JSON.stringify(response.message.detail));
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <Container back>
        <View>
          <FlatList
            keyExtractor={(item, index) => String(index)}
            ListFooterComponent={() => <View style={{ height: 70 }} />}
            data={this.state.userRoles.sort((a, b) => {
              return a.Id - b.Id;
            })}
            renderItem={item => this.renderItem(item)}
          />
          <Fab icon onPress={() => Actions.AddUserRole()} />
        </View>
      </Container>
    );
  }

  renderItem(value) {
    let item = value.item;
    let index = value.index;
    return (
      <TouchableWithoutFeedback>
        <Card
          style={{
            width: '90%',
            alignSelf: 'center',
            padding: 10,
            borderRadius: 20
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  height: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                <Text
                  style={{
                    fontSize: 10
                  }}>
                  Typ użytkownika
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold'
                  }}>
                  {item.name}
                </Text>
                <Icon name={this.getIcon(item.id)} size={24} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}>
              <TouchableOpacity onPress={() => this.onDelete(item, index)}>
                <MIcon
                  name={'delete'}
                  size={30}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1
            }}>
            <View
              style={{
                height: 35,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                {'Rejestracja'}
              </Text>
              <Switch
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                value={item.register}
                onValueChange={value => this.onChange(item, index, value, 1)}
              />
            </View>
            <View
              style={{
                height: 35,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                {'Logowanie'}
              </Text>
              <Switch
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                value={item.login}
                onValueChange={value => this.onChange(item, index, value, 2)}
              />
            </View>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  }

  onDelete = (item, index) => {
    Alert.alert(
      'Usuwanie',
      `Czy chcesz usunąć rolę ${item.name}?`,
      [
        {
          text: 'Nie',
          style: 'cancel'
        },
        {
          text: 'Tak',
          onPress: () => this.deleteUserRole(item.id, index)
        }
      ],
      { cancelable: true }
    );
  };

  deleteUserRole = (id, index) => {
    try {
      Api.removeUserRole(id, this.props.authStore.getToken())
        .then(response => {
          if (response.status === 200) {
            alert('Rola została usunięta.');
            this.setState({
              userRoles: this.state.userRoles.filter((_, i) => i !== index)
            });
          } else {
            alert(JSON.stringify(response.message));
          }
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  changeRole(item, index, value, type) {
    try {
      let { token } = this.props.authStore;
      let { name, login, id, register } = item;
      if (type === 1) {
        register = value;
      }
      if (type === 2) {
        login = value;
      }
      Api.editUserRole(this.props.authStore.token, name, login, register, id)
        .then(response => {
          if (response.status === 200) {
            alert('Rola została zmieniona.');
            let array = this.state.userRoles;
            array[index] = {id, name, login, register};
            this.setState({userRoles: array});
          } else {
            alert(JSON.stringify(response.message));
          }
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  onChange = (item, index, value, type) => {
    Alert.alert(
      'Zmiana',
      `Czy chcesz zmienić rolę ${item.name}?`,
      [
        {
          text: 'Nie',
          style: 'cancel'
        },
        {
          text: 'Tak',
          onPress: () => this.changeRole(item, index, value, type)
        }
      ],
      { cancelable: true }
    );
  };
  getIcon(id) {
    switch (id) {
      case 1:
        return 'learning';
      case 2:
        return 'classroom';
      default:
        return 'parents';
    }
  }
}

const styles = StyleSheet.create({});
