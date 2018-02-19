'use strict';

import React from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import RightHeaderButton from './right_header_button.js';
import containerStyles from '../styles/container.js';
const { container, fullWidth, horizontalCenter, verticalTop } = containerStyles;
import Route from '../models/routes.js';
import icons from '../icons.js';
const { plus, edit } = icons;

class AddRouteForm extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: params.addRoute ? 'Add' : 'Edit',
      headerRight: (
        <RightHeaderButton
          text="Save"
          onTap={params.createOrUpdateRoute} />
      )
    };
  };

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;

    if (params.route) {
      const { from, to, preferredTrain } = params.route;
      this.state = { from, to, preferredTrain };
    } else {
      this.state = {};
    }

    this._createOrUpdateRoute = this._createOrUpdateRoute.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({ createOrUpdateRoute: this._createOrUpdateRoute });
  }

  _createOrUpdateRoute() {
    const { from, to, preferredTrain } = this.state;

    if (!from.length) {
      this.setState({ fromError: true });
      return;
    }

    if (!to.length) {
      this.setState({ toError: true });
      return;
    }

    this.setState({
      fromError: false, toError: false
    }, function() {
      const { params } = this.props.navigation.state;

      if (params.route && params.route.id) {
        console.log("Updating");
        Route.get(params.route.id)
          .then((route) => route.update({ from, to, preferredTrain }))
          .then(this.props.navigation.popToTop)
          .done();
      } else {
        console.log("Saving");
        new Route({ from, to, preferredTrain })
          .save()
          .then(this.props.navigation.popToTop)
          .done();
      }
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback style={container} onPress={() => dismissKeyboard()}>
        <View style={container}>
          <View style={[horizontalCenter, verticalTop]}>
            <TextInput
              ref='from'
              placeholder='From'
              style={[styles.input, this.state.fromError && styles.error]}
              onChangeText={(text) => { this.setState({ from: text }); }}
              value={this.state.from}
              autoFocus={true}
              clearButtonMode='while-editing'
              returnKeyType='next'
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onSubmitEditing={() => { this.refs.to.focus(); }} />
            <TextInput
              ref='to'
              placeholder='To'
              style={[styles.input, this.state.toError && styles.error]}
              onChangeText={(text) => { this.setState({ to: text }); }}
              value={this.state.to}
              clearButtonMode='while-editing'
              returnKeyType='next'
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onSubmitEditing={() => { this.refs.preferredTrain.focus(); }} />
            <TextInput
              ref='preferredTrain'
              placeholder='Preferred Train'
              style={styles.input}
              onChangeText={(text) => { this.setState({ preferredTrain: text }); }}
              value={this.state.preferredTrain}
              keyboardType='numeric'
              clearButtonMode='while-editing'
              returnKeyType='done'
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={false}
              onSubmitEditing={this.createOrUpdateRoute} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

var styles = StyleSheet.create({
  input: {
    margin: 5,
    padding: 5,

    height: 40,

    alignSelf: 'stretch',

    borderColor: '#cccccc',
    borderWidth: 1,
  },
  error: {
    borderColor: '#ff0000',
  }
});

export default AddRouteForm;
