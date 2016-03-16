import axios from 'axios';
import React, { StyleSheet, Text, View, ListView } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import containerStyles from '../styles/container.js';
const { container, fullWidth } = containerStyles;

var RouteStatusView = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return { dataSource: ds };
  },
  componentDidMount: function() {
    this.load();
    this.setInterval(this.load, 30000);
  },
  load: async function() {
    const route = this.props.route;
    const response = await axios.get(`http://amtrak.tlunter.com/${route.from}/${route.to}.json`);
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(response.data) });
  },
  renderTrain: function(train) {
    const preferredTrain = this.props.route.options.preferredTrain;
    return (
      <View>
        <View style={[styles.train, preferredTrain && train.number === preferredTrain && styles.highlightedTrain]}>
          <Text style={styles.trainNumber}>{train.number}</Text>
          <Text style={styles.trainScheduled}>{train.departure && train.departure.scheduled_time}</Text>
          <Text style={styles.trainEstimated}>{train.departure && train.departure.estimated_time}</Text>
        </View>
      </View>
    );
  },
  render: function() {
    return (
      <ListView
        style={[container, fullWidth]}
        dataSource={this.state.dataSource}
        renderRow={this.renderTrain}
        automaticallyAdjustContentInsets={false} />
    );
  }
});

var styles = StyleSheet.create({
  train: {
    flex: 1,
    flexDirection: 'row',
  },
  highlightedTrain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(19, 117, 179, 0.5)',
  },
  trainNumber: {
    flex: 1,
    margin: 10,
    fontSize: 24,
  },
  trainScheduled: {
    flex: 2,
    margin: 10,
    fontSize: 24,
  },
  trainEstimated: {
    flex: 2,
    margin: 10,
    fontSize: 24,
  },
});

export default RouteStatusView;
