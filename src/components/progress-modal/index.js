import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Card } from 'native-base';

class ProgressModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={this.props.visible}>
        <View style={styles.contener}>
          <Card style={styles.card}>
            <ActivityIndicator style={styles.activity} />
            <Text style={styles.text}>{this.props.text}</Text>
          </Card>
        </View>
      </Modal>
    );
  }
}

export default ProgressModal;

const styles = StyleSheet.create({
  activity: { paddingLeft: 20 },
  contener: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '90%',
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20
  },
  text: { flex: 1, fontSize: 22, textAlign: 'center' }
});
