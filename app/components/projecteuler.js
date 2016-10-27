/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * Sample: 
    var problem001 = "<p>If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.</p><p>Find the sum of all the multiples of 3 or 5 below 1000.</p>";
    
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

var SQLite = require('react-native-sqlite-storage');
var db;
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const sample_problem_src = "<p>Construct triangle ABC such that:</p><ul><li>Vertices A, B and C are lattice points inside or on the circle of radius <var>r</var> centered at the origin;</li>\n<li>the triangle contains no other lattice point inside or on its edges;</li>\n<li>the perimeter is maximum.</li></ul><p>Let <var>R</var> be the circumradius of triangle ABC and T(<var>r</var>) = <var>R</var>/<var>r</var>.<br>\nFor <var>r</var> = 5, one possible triangle has vertices (-4,-3), (4,2)  and (1,0) with perimeter $\\sqrt{13}+\\sqrt{34}+\\sqrt{89}$ and circumradius <var>R</var> = $\\sqrt {\\frac {19669} 2 }$, so T(5) =$\\sqrt {\\frac {19669} {50} }$.<br>\nYou are given T(10) ~ 97.26729 and T(100) ~ 9157.64707.</p><p>Find T(10<sup>7</sup>). Give your answer rounded to the nearest integer.</p>";
const sample_problem =
  "<p>Construct triangle ABC such that:</p><ul><li>Vertices A, B and C are lattice points inside or on the circle of radius <var>r</var> centered at the origin;</li>\n<li>the triangle contains no other lattice point inside or on its edges;</li>\n<li>the perimeter is maximum.</li></ul><p>Let <var>R</var> be the circumradius of triangle ABC and T(<var>r</var>) = <var>R</var>/<var>r</var>.<br>\nFor <var>r</var> = 5, one possible triangle has vertices (-4,-3), (4,2)  and (1,0) with perimeter \(\\sqrt{13}+\\sqrt{34}+\\sqrt{89}\) and circumradius <var>R</var> = \(\\sqrt {\\frac {19669} 2 }\), so T(5) =\(\\sqrt {\\frac {19669} {50} }\).<br>\nYou are given T(10) ~ 97.26729 and T(100) ~ 9157.64707.</p><p>Find T(10<sup>7</sup>). Give your answer rounded to the nearest integer.</p>";


export default class ProjectEulerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbStatus: '',
      userInput: '',
      question: {
        id: 1,
        content: '',
        answer: ''
      }
    };
  }
  componentWillMount() {
    var that = this;
    // put database file at android/app/src/main/assets/www/ with name 'testdb'
    SQLite.openDatabase({ name: 'testdb', createFromLocation: 1 }).then(
      (DB) => {
        db = DB;
        that.setState({ dbStatus: 'database test.db is opened.' });
        that.setState({
          question: {
            id: 2,
            content: 'WebView Sample with MathJax</h1><p>A inline \(C_n^2\) equation.</p><p>A display $$\\frac{x}{y}+\\sqrt{2}$$</p>'
          }
        });
      }
    ).catch(
      error => {
        that.setState({ dbStatus: error });
      }
      )
  }
  componentWillUnmount() {
    this.closeDatabase();
  }
  closeDatabase() {
    var that = this;
    if (db) {
      console.log("Closing database ...");
      // that.setState({dbStatus: 'Closing DB'});      
      db.close().then((status) => {
        // that.setState({dbStatus: 'Database CLOSED'});  
        console.log('Database CLOSED');
      }).catch((error) => {
        console.log(error);
      });
    } else {
      // that.setState({dbStatus: 'Database was not OPENED'});  
      console.log('Database was not OPENED');
    }
  }

  onNext() {
    var that = this;
    
    if (db) {
      db.executeSql('select * from users order by random() limit 1;').then((results) => {
        var len = results[0].rows.length;
        for (let i = 0; i < len; i++) {
          let row = results[0].rows.item(i);
          console.log(`firstname: ${row.firstname}, lastname: ${row.lastname}`);

          that.setState({
            dbStatus: `fetching: ${row.firstname} ${row.lastname}`,
            question: {
              content: sample_problem_src,
              id: 10
            }
          });
        }
      });
    }
  }

  onVefify() {
    var that = this;
    if (db) {
      db.transaction((tx) => {
        // tx.executeSql();   
        console.log(tx);
      }).then((result) => {
        that.setState({ dbStatus: 'A transaction is completed.' });
      }).catch(error => {
        that.setState({ dbStatus: 'transaction failure!' });
      });
    }
  }

  render() {
    const html = {
      html: `<script type="text/x-mathjax-config">MathJax.Hub.Config({tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}});</script><script src="https://cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML"></script><b>No. ${this.state.question.id}</b> ${this.state.question.content}<script>MathJax.Hub.Queue(["Typeset", MathJax.Hub]);</script>`,
      baseUrl: ''
    };
    // MathJax 默认使用\(xxxx\)作为内联的公式分割，使用$xxxx$的话需要显示声明


    return (
      <View style={styles.container}>
          <WebView style={{ flex: 1 }} source={html}  javaScriptEnabled={true}></WebView>
          <View style={{ backgroundColor: 'silver', padding: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput onChangeText={(text) => { this.setState({ userInput: text }); } } value={this.state.userInput} style={{ flex: 1 }} placeholder="Give your answer here." />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.onVefify.bind(this) } style={styles.button}><Text>Verify It</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.onNext.bind(this) } style={styles.button}><Text>Next Question</Text></TouchableOpacity>
            </View>
          </View>
          <View>
            
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', backgroundColor: '#2f3e55', padding: 5, paddingBottom: 20, paddingTop: 8
  },
  main: { backgroundColor: 'white', flex: 1, padding: 5, alignItems: 'center' },
  button: {
    backgroundColor: '#a6c5e4',
    height: 35,
    margin: 5,
    borderRadius: 6,
    borderColor: '#808080',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    //borderTopColor: '#808080',
    //borderBottomColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1    
  }
});