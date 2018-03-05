import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import Stations from '../models/stations.js';

class AutoCompleteInput extends React.Component {
  constructor(props) {
    super(props);

    let code, value;

    const station = Stations.findByCode(props.value);
    if (station !== undefined) {
      code = station.code;
      value = station.autoFillName;
    } else {
      code = null;
      value = props.value;
    }

    this.state = { code, value, showList: false };

    this.selectStation = this.selectStation.bind(this);
    this.renderStation = this.renderStation.bind(this);
    this.filteredStations = this.filteredStations.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  selectStation(station) {
    return () => {
      this.setState({
        code: station.code,
        value: station.autoFillName,
      }, this.onSubmit);
    };
  }

  renderEmptyCell() {
    return <Text style={[styles.text, styles.grey]}>No stations match</Text>;
  }

  renderStation(item) {
    return (
      <TouchableHighlight
        onPress={this.selectStation(item)}
        underlayColor="#f4f7f9"
        style={styles.item}
        key={item.code}>
        <Text style={styles.text}>{item.autoFillName}</Text>
      </TouchableHighlight>
    );
  }

  filteredStations() {
    return Stations.filter(this.state.value);
  }

  onChangeText(value) {
    this.setState({ value });
  }

  onSubmit() {
    this.textInput.blur();

    this.setState(
      { showList: false },
      () => {
        const { code, value } = this.state;
        if (code) {
          this.props.onSubmit(code);
        } else {
          this.props.onSubmit(value);
        }
      }
    );
  }

  render() {
    let list;
    if (this.state.showList) {
      let listItems = this.filteredStations()
        .slice(0, 10)
        .map(this.renderStation);

      if (listItems.length === 0) {
        listItems = this.renderEmptyCell();
      }

      list = (
        <View style={styles.list}>
          {listItems}
        </View>
      );
    }

    return (
      <View style={[styles.container, this.props.style]}>
        <TextInput
          ref={(component) => this.textInput = component}
          placeholder={this.props.placeholder}
          value={this.state.value}
          style={this.props.textInputStyle}
          returnKeyType='done'
          underlineColorAndroid='transparent'
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmit}
          onFocus={() => this.setState({ showList: true })} />
        {list}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  list: {
    flex: 1,

    backgroundColor: '#fff',
  },

  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e3eaef',
    backgroundColor: '#fff',
  },

  text: {
    padding: 5,

    fontSize: 16,
  },

  grey: {
    color: '#949699',
    fontStyle: 'italic',
  }
});

export default AutoCompleteInput;
