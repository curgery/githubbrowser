import React, { Component } from 'react'
import buffer from 'buffer';


class AuthService extends Component {
  login(creds, cb){
    var b = new buffer.Buffer(creds.username + ':' + creds.password);
    var encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization' : 'Basic' + encodedAuth
      }
    })
    .then((response) => {
      if(response.status >= 200 && response.status < 300){
        return repsonse;
      }
      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response) => {
        return response.json();
    })
    .then((results) => {
        return cb({success:true })
    })
    .catch((err) => {
      return cb(err);
    })
    .finally(() => {
      this.setState({showProgress: false});
    });

  }
}

module.exports = new AuthService();