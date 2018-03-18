import React from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import AutoCompleteInput from './auto_complete_input.js';
import Stations from '../models/stations.js';

import FontAwesome from './font_awesome.js';
import { angleDoubleDown, edit, mapMarker, train } from '../icons.js';

import routeTableStyles from '../styles/route_table.js';
const { card } = routeTableStyles;

class RouteTableHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { route: props.route };

    this.renderEditButton = this.renderEditButton.bind(this);
    this.updateRouteProperty = this.updateRouteProperty.bind(this);

    this.saveRoute = this.saveRoute.bind(this);
    this.cancelSaveRoute = this.cancelSaveRoute.bind(this);
    this.removeRoute = this.removeRoute.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ route: nextProps.route });
  }

  renderEditButton() {
    if (this.props.editing) {
      return;
    }

    return (
      <View style={styles.editView}>
        <TouchableOpacity onPress={this.props.startEditing}>
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
    this.props.updateRoute({ value: this.state.route });
  }

  cancelSaveRoute() {
    this.props.updateRoute({ cancel: true });
  }

  removeRoute() {
    this.props.updateRoute({ remove: true });
  }

  renderSpecsView() {
    const { editing } = this.props;
    const { from, to, preferredTrain } = (editing) ? this.state.route : this.props.route;

    let fromCell, toCell, preferredTrainCell, saveCell;
    if (editing) {
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
          style={[styles.textInput, styles.preferredTrainTextInput]}
          returnKeyType='done'
          underlineColorAndroid='transparent'
          onChangeText={this.updateRouteProperty('preferredTrain')}
          keyboardType='numeric' />
      );
      saveCell = (
        <View style={styles.headerRow}>
          <View style={styles.leftButton}><Button title="Save" onPress={this.saveRoute} /></View>
          <Button title="Cancel" onPress={this.cancelSaveRoute} />
          <Button title="Remove" onPress={this.removeRoute} />
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
    if (preferredTrain || editing) {
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
        {this.renderSpecsView()}
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
    fontSize: 16,
  },

  specsText: {
    flex: 1,

    marginRight: 40,

    paddingLeft: 5,
    paddingRight: 5,

    fontSize: 14,
    textAlign: 'left',

    //fontWeight: 'bold',
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

    fontSize: 14,
    textAlign: 'left',

    //fontWeight: 'bold',
    color: '#000000',
  },

  preferredTrainTextInput: {
    flex: 1,
    marginRight: 40,
  },

  editView: {
    position: 'absolute',
    right: 0,
    bottom: 0,

    padding: 20,
  },

  editButton: {
    fontSize: 16,
    color: '#b6bec6',
  },

  leftButton: {
    marginLeft: 40,
    marginRight: 10,
  }
});

export default RouteTableHeader;
