import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

class AutoCompleteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  render() {
    return (
      <TextInput
        placeholder={this.props.placeholder}
        value={this.state.value}
        style={this.props.textInputStyle} />
    );
  }
}

export default AutoCompleteInput;
