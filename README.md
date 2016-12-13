# react-native-scrawl

[![Version](https://img.shields.io/npm/v/react-native-scrawl.svg)](https://www.npmjs.com/package/react-native-scrawl)
[![Downloads](https://img.shields.io/npm/dt/react-native-scrawl.svg)](https://www.npmjs.com/package/react-native-scrawl)

create scrawl with react-native-svg

## Install

	# react-native-svg 
	npm install --save react-native-svg
	react-native link react-native-svg
	# install react-raphael-scrawl in your react-raphael-scrawl project
    npm install --save react-native-scrawl
    
## Quickly Start

``` js
import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import Scrawl from 'react-native-scrawl'

export default class ScrawlApp extends Component {
  render() {
    return (
      <View>
        <Scrawl ref="scrawl" />
      </View>
    );
  }
}

AppRegistry.registerComponent('scrawl', () => ScrawlApp);
```

## API

#### All Scrawl Props

- width `number` width of the canvas
- height `number` height of the canvas
- attr `object` attr of the scrawl path, you can see [https://github.com/react-native-community/react-native-svg#common-props](https://github.com/react-native-community/react-native-svg#common-props)

#### All Scrawl Ref

- clear `function` clear all scrawl path

## Contact

Email: [liuhong1.happy@163.com](mailto:liuhong1.happy@163.com)
