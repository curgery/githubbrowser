import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './Login';

export default class App extends React.Component {
  render() {
    return (
      <Login onLogin={this.onLogin}/>
    );
  }
}
function onLogin() {
  console.log('successfully logged in, can show different view');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
