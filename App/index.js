import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Auth from './Auth'
export default class App extends Component {
  render(){
    return (
      <View>
         <View  style={styles.navbar}>
            <Text style={styles.text}>Расписание занятий</Text>
        </View>
        <Auth />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar:{
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#0494DD',
    paddingBottom: 10
},
text:{
    color: 'white',
    fontSize: 20
}
});
