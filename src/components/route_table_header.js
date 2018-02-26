import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

import AutoCompleteInput from './auto_complete_input.js';

import FontAwesome from './font_awesome.js';
import { angleDoubleDown, edit, mapMarker, train } from '../icons.js';

import routeTableStyles from '../styles/route_table.js';
const { card } = routeTableStyles;

class RouteTableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editing: false };

    this.editRoute = this.editRoute.bind(this);

    this.renderEditButton = this.renderEditButton.bind(this);
  }

  editRoute() {
    this.setState({ editing: true });
  }

  renderEditButton() {
    if (this.state.editing) {
      return;
    }

    return (
      <View style={styles.editView}>
        <TouchableHighlight
          onPress={this.editRoute}
          underlayColor="white">
          <FontAwesome style={styles.editButton}>{edit}</FontAwesome>
        </TouchableHighlight>
      </View>
    );
  }

  renderSpecsView(route) {
    const { from, to, preferredTrain } = route;

    let preferredTrainRow;
    if (preferredTrain) {
      preferredTrainRow = (
        <View style={styles.headerRow}>
          <FontAwesome style={[styles.specsIcon, styles.headerPreferredTrain]}>
            {train}
          </FontAwesome>
          <Text style={styles.specsText}>
            {preferredTrain}
          </Text>
        </View>
      );
    }

    let fromCell;
    if (this.state.editing) {
      fromCell = <AutoCompleteInput textInputStyle={styles.specsText} placeholder="From" value={from} />;
    } else {
      fromCell = <Text style={styles.specsText}>{from.toUpperCase()}</Text>;
    }

    return (
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <FontAwesome style={[styles.specsIcon, styles.headerFrom]}>
            {angleDoubleDown}
          </FontAwesome>
          {fromCell}
        </View>
        <View style={styles.headerRow}>
          <FontAwesome style={[styles.specsIcon, styles.headerTo]}>
            {mapMarker}
          </FontAwesome>
          <Text style={styles.specsText}>
            {to.toUpperCase()}
          </Text>
        </View>
        {preferredTrainRow}
      </View>
    );
  }

  render() {
    return (
      <View style={[card, { flexDirection: 'row' }]}>
        {this.renderSpecsView(this.props.route)}
        {this.renderEditButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
  },

  headerRow: {
    flexDirection: 'row',

    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    paddingLeft: 5,
  },

  headerFrom: {
    color: 'green',
  },

  headerTo: {
    color: 'red',
  },

  headerPreferredTrain: {
    color: 'rgba(19, 117, 179, 0.5)',
  },

  specsIcon: {
    paddingRight: 5,

    width: 40,

    textAlign: 'center',
    fontSize: 24,
  },

  specsText: {
    paddingLeft: 5,
    paddingRight: 5,

    fontSize: 18,
    textAlign: 'center',

    fontWeight: 'bold',
    color: '#000000',
  },

  editView: {
    position: 'absolute',
    right: 0,

    padding: 20,
  },

  editButton: {
    fontSize: 20,
    color: '#b6bec6',
  }
});

export default RouteTableHeader;
