import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
 } from 'react-native';
 import buffer from 'buffer';


export class Login extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showProgress: false  
      }
    }

    
  render() {
    var errorCtrl = <View />;

    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>
          That username and password combination did not work
      </Text>;
    }

    if(!this.state.success && this.state.unknownError){
      errorCtrl = <Text style={styles.error}>
          We experienced an unexpected issue
      </Text>;
    }

    return (
      <View style={styles.container}>
            <Image style={styles.logo} source={require('./img/rlgava.jpg')} />
            <Text style={styles.heading}>
                Github browse
            </Text>
            <TextInput
                onChangeText={(text) => this.setState({ username: text})}
                style={styles.loginInput}
                placeholder="Github username">
             </TextInput>
            <TextInput
                onPress={(text) => this.setState({ password: text})}
                style={styles.loginInput}
                placeholder="Github password"
                >
            </TextInput>
            <TouchableHighlight
                onPress={this.onLoginPressed.bind(this)}
                style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableHighlight>

            {errorCtrl}

            <ActivityIndicator
                animating={this.state.showProgress}
                size="large"
                color="#0000ff"
                style={styles.loader}
                 />       
      </View>
    );
  }

  onLoginPressed(){
      console.log('Attempting to log in with username ' + this.state.username);
      this.setState({showProgress: true});

      var authService = require('./AuthService');
      authService.login({
          username: this.state.username,
          password: this.state.password
      }, (results) => {
        this.setState(Object.assign({
          showProgress: false
        }, results));

        if(results.success && this.props.onLogin){
          this.props.onLogin()
        }
      });
    }
  }

      // var b = new buffer.Buffer(this.state.username + ':' + this.state.password);
      // var encodedAuth = b.toString('base64');

      // fetch('https://api.github.com/user', {
      //   headers: {
      //     'Authorization' : 'Basic' + encodedAuth
      //   }
      // })
      // .then((response) => {
      //   if(response.status >= 200 && response.status < 300){
      //     return repsonse;
      //   }
      //   throw {
      //     badCredentials: response.status == 401,
      //     unknownError: response.status != 401
      //   }
      // })
      // .then((response) => {
      //     return response.json();
      // })
      // .then((results) => {
      //   console.log(results);
      //   this.setState({success: true});
      // })
      // .catch((err) => {
      //   this.setState(err);
      // })
      // .finally(() => {
      //   this.setState({showProgress: false});
      // });
  


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
      width: 76,
      height: 60
  }, 
  heading: {
      fontSize: 30,
      marginTop: 10
  },
  loginInput: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    alignSelf: 'stretch',
    borderWidth: 3,
    borderColor: '#48BBEC',
    borderRadius: 0,
    color: '#48BBEC'
},
  input: {
      height: 50,
      marginTop: 10,
      alignSelf: 'stretch',
      padding: 4,
      fontSize: 18,
      borderWidth: 3,
      borderColor: '#48bbec'     
  },
  button: {
      height: 50,
      backgroundColor: '#48BBEC',
      alignSelf: 'stretch',
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
  },
  buttonText: {
      color: '#FFF',
      fontSize: 22
  },
  loader: {
     marginTop: 20 
  }, 
  error: {
    color: 'red',
    fontWeight: 'bold',
    paddingTop: 10
  }
});
