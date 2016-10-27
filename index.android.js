/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import Home from './app/components/home';
import ProjectEulerView from './app/components/projecteuler';


export default class dispel2coder extends Component {
  render() {
    return (
      <Navigator initialRoute={{name: 'home'}}
        renderScene={this.renderScene.bind(this)}></Navigator>
    );
  }
  renderScene(route, navigator) {
    switch(route.name) {
      case 'projecteuler':
        return <ProjectEulerView navigator={navigator} />;
      default:
        return <Home navigator={navigator} />; 
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('dispel2coder', () => dispel2coder);
