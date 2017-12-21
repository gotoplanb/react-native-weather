/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Forecast from './Forecast';
import OpenWeatherMap from './open_weather_map';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      zip: '',
      forecast: null
    };
  }

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this.setState({ zip: zip });
    OpenWeatherMap.fetchForecast(zip).then(forecast => {
      console.log(forecast);
      this.setState({ forecast: forecast });
    });
  }
  
  render() {

    let content = null;

    if (this.state.forecast !== null) {
      content = (
        <Forecast
          main={this.state.forecast.main}
          description={this.state.forecast.description}
          temp={this.state.forecast.temp}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You input {this.state.zip}.
        </Text>
        {content}
        <TextInput 
          style= {styles.input}
          onSubmitEditing={this._handleTextChange}
        />
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40,
    padding: 2,
    width: 100,
    textAlign: 'center',
  }
});
