import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import Scrawl from './react-native-scrawl'

export default class scrawl extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Scrawl ref="scrawl" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: '#ddd'
  }
});

AppRegistry.registerComponent('scrawl', () => scrawl);
