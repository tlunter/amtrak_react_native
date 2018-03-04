import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AutoCompleteInput from './auto_complete_input.js';
import Stations from '../models/stations.js';

import FontAwesome from './font_awesome.js';
import { angleDoubleDown, edit, mapMarker, train } from '../icons.js';

import routeTableStyles from '../styles/route_table.js';
const { card } = routeTableStyles;

class RouteTableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editing: false, route: props.route };

    this.editRoute = this.editRoute.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.updateRouteProperty = this.updateRouteProperty.bind(this);
    this.saveRoute = this.saveRoute.bind(this);
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
        <TouchableOpacity
          onPress={this.editRoute}>
          <FontAwesome style={styles.editButton}>{edit}</FontAwesome>
        </TouchableOpacity>
      </View>
    );
  }

  updateRouteProperty(property) {
    return (value) => {
      const route = Object.assign(
        {},
        this.state.route,
        { [property]: value }
      );

      console.log("Updated routed:", route);

      this.setState({ route });
    };
  }

  saveRoute() {
    this.props.route.update(this.state.route)
      .then(() => {
        this.setState({ editing: false }, this.props.onUpdate);
      });
  }

  renderSpecsView(route) {
    const { from, to, preferredTrain } = route;

    let fromCell, toCell, preferredTrainCell, saveCell;
    if (this.state.editing) {
      fromCell = (
        <AutoCompleteInput
          style={styles.autoCompleteStyle}
          textInputStyle={styles.textInput}
          placeholder="From"
          value={from}
          onSubmit={this.updateRouteProperty('from')} />
      );
      toCell = (
        <AutoCompleteInput
          style={styles.autoCompleteStyle}
          textInputStyle={styles.textInput}
          placeholder="To"
          value={to}
          onSubmit={this.updateRouteProperty('to')} />
      );
      preferredTrainCell = (
        <TextInput
          placeholder="Preferred Train Number"
          value={preferredTrain}
          style={styles.textInput}
          returnKeyType='done'
          onChangeText={this.updateRouteProperty('preferredTrain')} />
      );
      saveCell = (
        <View style={styles.headerRow}>
          <Button title="Save" onPress={this.saveRoute} />
        </View>
      );
    } else {
      const fromStation = Stations.findByCode(from);
      const toStation = Stations.findByCode(to);

      const fromText = (fromStation) ? fromStation.autoFillName : from.toUpperCase();
      const toText = (toStation) ? toStation.autoFillName : to.toUpperCase();

      fromCell = <Text style={styles.specsText}>{fromText}</Text>;
      toCell = <Text style={styles.specsText}>{toText}</Text>;
      preferredTrainCell = <Text style={styles.specsText}>{preferredTrain}</Text>;
    }

    let preferredTrainRow;
    if (preferredTrain || this.state.editing) {
      preferredTrainRow = (
        <View style={styles.headerRow}>
          <FontAwesome style={[styles.specsIcon, styles.headerPreferredTrain]}>
            {train}
          </FontAwesome>
          {preferredTrainCell}
        </View>
      );
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
          {toCell}
        </View>
        {preferredTrainRow}
        {saveCell}
      </View>
    );
  }

  render() {
    return (
      <View style={[card, { flexDirection: 'row' }]}>
        {this.renderSpecsView(this.state.route)}
        {this.renderEditButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,

    padding: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

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
    flex: 1,

    marginRight: 40,

    paddingLeft: 5,
    paddingRight: 5,

    fontSize: 18,
    textAlign: 'left',

    fontWeight: 'bold',
    color: '#000000',
  },

  autoCompleteStyle: {
    marginRight: 40,
  },

  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',

    paddingLeft: 5,
    paddingRight: 5,

    fontSize: 18,
    textAlign: 'left',

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
