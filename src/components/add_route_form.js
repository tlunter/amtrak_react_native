'use strict';

import React from 'react-native';
const { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } = React;
import dismissKeyboard from 'dismissKeyboard';
import HeaderView from './header_view.js';
import RightHeaderButton from './right_header_button.js';
import containerStyles from '../styles/container.js';
const { container, horizontalCenter, verticalTop } = containerStyles;
import Route from '../models/routes.js';
import icons from '../icons.js';
const { createNew } = icons;

var AddRouteForm = React.createClass({
  getInitialState: function() {
    return { from: '', to: '', preferredTrain: '' }
  },
  createRoute: function() {
    const { from, to, preferredTrain } = this.state;
    if (from.length && to.length && preferredTrain.length) {
      const route = new Route(from, to, { preferredTrain });
      route.save()
        .then(() => this.props.setTab('status'));
    }
  },
  render: function() {
    return (
      <TouchableWithoutFeedback style={container} onPress={() => dismissKeyboard()}>
        <View style={container}>
          <HeaderView onTap={() => this.props.setTab('status')}>
            <RightHeaderButton
              source={{uri: createNew}}
              onTap={this.createRoute} />
          </HeaderView>
          <View style={[horizontalCenter, verticalTop]}>
            <TextInput
              ref='from'
              placeholder='From'
              style={styles.input}
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
              style={styles.input}
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
              onSubmitEditing={this.createRoute} />
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
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
  }
});

export default AddRouteForm;
