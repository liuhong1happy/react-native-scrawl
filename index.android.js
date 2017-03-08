import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
  StatusBar
} from 'react-native';
import Scrawl from './react-native-scrawl'

const {height, width} = Dimensions.get('window');
const buttonHeight = 60;

export default class scrawl extends Component {
  handleClear() {
    this.refs.scrawl.clear();
  }
  handleSave() {
    Alert.alert('info', 'Save Successfully!');
    // this.refs.scrawl.toDataURL((base64)=>{
      
    // })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scrawl}>
          <Scrawl ref="scrawl" height={height - buttonHeight} width={width}/>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>this.handleClear()} style={styles.button}>
            <Text style={styles.text}>Clear</Text>
          </TouchableOpacity>
          <View style={styles.splitter}/>
          <TouchableOpacity onPress={()=>this.handleSave()} style={styles.button}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: '#ddd',
    height: height - StatusBar.currentHeight,
    width
  },
  scrawl: {
    height: height - buttonHeight - StatusBar.currentHeight,
    width,
  },
  buttonContainer: {
    height: buttonHeight,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: 'white'
  },
  splitter: {
    height: buttonHeight,
    width: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('scrawl', () => scrawl);
