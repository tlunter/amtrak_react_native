'use strict';

import React from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import HeaderView from './header_view.js';
import LeftHeaderButton from './left_header_button.js';
import RightHeaderButton from './right_header_button.js';
import containerStyles from '../styles/container.js';
const { container, fullWidth, horizontalCenter, verticalTop } = containerStyles;
import Route from '../models/routes.js';
import icons from '../icons.js';
const { plus, edit } = icons;

var AddRouteForm = React.createClass({
  getInitialState: function() {
    if (this.props.route) {
      const { from, to, preferredTrain } = this.props.route;
      return { from, to, preferredTrain };
    } else {
      return {};
    }
  },
  createOrUpdateRoute: function() {
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
      if (this.props.route && this.props.route.id) {
        console.log("Updating");
        Route.get(this.props.route.id)
          .then((route) => {
            return route.update({ from, to, preferredTrain });
          })
          .then(() => this.props.navigator.resetTo({}))
          .done();
      } else {
        console.log("Saving");
        new Route({ from, to, preferredTrain })
          .save()
          .then(() => this.props.navigator.resetTo({}))
          .done();
      }
    });
  },
  leftHeaderButton() {
    return (
      <LeftHeaderButton
        text="Back"
        onTap={this.props.navigator.pop} />
    );
  },
  rightHeaderButton() {
    return <RightHeaderButton text="Save" onTap={this.createOrUpdateRoute} />;
  },
  render: function() {
    return (
      <TouchableWithoutFeedback style={container} onPress={() => dismissKeyboard()}>
        <View style={container}>
          <HeaderView
            onTap={this.props.navigator.pop}
            left={this.leftHeaderButton()}
            right={this.rightHeaderButton()} />
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
});

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
