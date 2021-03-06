import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import { Container, Fab } from "../components";
import { Actions } from "react-native-router-flux";
import { Icon, Card } from "native-base";
import _ from "lodash";
import { DateTimeFormatter, LocalDate } from "js-joda";
import Api from "../api";
import { observer, inject } from "mobx-react";

@inject("authStore")
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
        <View
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <FlatList
            keyExtractor={(item, index) => String(index)}
            data={this.state.questions}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => this.selectQuestion(item)}
              >
                <Card
                  style={{
                    flex: 1,
                    width: "90%",
                    alignSelf: "center",
                    padding: 10,
                    borderRadius: 20
                  }}
                >
                  <View
                    style={{
                      height: 20,
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text>Pytanie</Text>
                  </View>
                  <View
                    style={{
                      height: 60,
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 24,
                        fontWeight: "bold"
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 10
                    }}
                  >
                    {`Wiele odpowiedzi: ${item.multiAnswer ? "Tak" : "Nie"}`}
                  </Text>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10
                        }}
                      >
                        {"Data rozpoczęcia"}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row"
                        }}
                      >
                        <Icon
                          name="calendar"
                          style={{
                            fontSize: 10,
                            marginRight: 5
                          }}
                        />
                        <Text
                          style={{
                            width: 55,
                            fontSize: 10,
                            textAlign: "center"
                          }}
                        >
                          {this.getDate(item.publicatedDate)}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10
                        }}
                      >
                        {"Data zakończenia"}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row"
                        }}
                      >
                        <Icon
                          name="calendar"
                          style={{
                            fontSize: 10,
                            marginRight: 5
                          }}
                        />
                        <Text
                          style={{
                            width: 55,
                            fontSize: 10,
                            textAlign: "center"
                          }}
                        >
                          {this.getDate(item.publicatedDateEnd)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableWithoutFeedback>
            )}
          />
          <Fab icon />
        </View>
      </Container>
    );
  }
  getDate(date) {
    if (date) {
      return new Date(date).toLocaleDateString();
    } else {
      return "brak";
    }
  }
  getEnochDay(date) {
    return LocalDate.parse(
      new Date(date).toLocaleDateString(),
      DateTimeFormatter.ofPattern("dd.MM.yyyy")
    ).toEpochDay();
  }
  selectQuestion(item) {
    Actions.QuestionItem({ question: item });
  }
}

const styles = StyleSheet.create({});
