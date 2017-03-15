/**
 * @author Holly Liu <liuhong1.happy@163.com>
 * @file android index file
 * @version 0.2.0
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
  CameraRoll,
} from 'react-native';
import Scrawl from './react-native-scrawl'

const {height, width} = Dimensions.get('window');
const buttonHeight = 60;

/**
 * This class requires the modules :
 * {@link https://github.com/facebook/react|react} & 
 * {@link https://github.com/facebook/react-native|react-native} & 
 * {@link Scrawl|react-native-scrawl} 
 * @namespace iOS-App
 * @class iOS-App
 * @extends {Component}
 */
export default class App extends Component {
  /**
   * call react-native-scrawl clear
   * @private
   * @memberOf iOS-App
   */
  handleClear() {
    this.refs.scrawl.clear();
  }
  /**
   * @description
   * 1. call react-native-scrawl toDataURL </br>
   * 2. call CameraRoll.saveToCameraRoll to save base64 data
   * @private
   * @memberOf iOS-App
   */
  handleSave() {
    this.refs.scrawl.toDataURL((base64)=>{
      CameraRoll.saveToCameraRoll('data:image/jpg;base64,'+base64,'photo').then(res=> {
        Alert.alert('info', 'Save Successfully!');
      }).catch(reason=> {
        Alert.alert('info', 'Save Failed!');
      })
    })
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
    height,
    width
  },
  scrawl: {
    height: height - buttonHeight,
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

AppRegistry.registerComponent('scrawl', () => App);
