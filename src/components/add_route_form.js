'use strict';

import React from 'react-native';
const { View, Text, TextInput, StyleSheet } = React;
import HeaderView from './header_view.js';
import RightHeaderButton from './right_header_button.js';
import containerStyles from '../styles/container.js';
const { container, horizontalCenter, verticalTop } = containerStyles;
import Route from '../models/routes.js';
import icons from '../icons.js';
const { newIcon } = icons;

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
      <View style={container}>
        <HeaderView>
          <RightHeaderButton
            source={{uri: newIcon}}
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
            onSubmitEditing={() => { this.refs.to.focus(); }}
            />
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
            onSubmitEditing={() => { this.refs.preferredTrain.focus(); }}
            />
          <TextInput
            ref='preferredTrain'
            placeholder='Preferred Train'
            style={styles.input}
            onChangeText={(text) => { this.setState({ preferredTrain: text }); }}
            value={this.state.preferredTrain}
            clearButtonMode='while-editing'
            returnKeyType='done'
            enablesReturnKeyAutomatically={true}
            blurOnSubmit={false}
            onSubmitEditing={this.createRoute}
            />
        </View>
      </View>
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
