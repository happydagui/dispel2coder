/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text, TextInput,
  View, WebView,
  Image,
  TouchableOpacity
} from 'react-native';

// 首页
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Image style={{ width: 100, height: 75, margin: 10 }} source={require('../../img/Koala.png') } />
          <TouchableOpacity onPress={() => { this.props.navigator.push({ name: 'projecteuler' }); } } style={styles.button}>
            <Text>ProjectEuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>CodeSite</Text>
          </TouchableOpacity>
          <Text style={{alignSelf: 'flex-start', margin: 5}}>
          Introduction:
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,justifyContent: 'center', backgroundColor: '#2f3e55', padding: 5, paddingBottom: 20, paddingTop: 8
  },
  main: { backgroundColor: 'white', flex: 1, padding: 5, alignItems:'center' },
  button: {
    backgroundColor: '#a6c5e4', 
    height: 35,
    margin: 5,
    //borderRadius: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#808080',
    borderBottomColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
});