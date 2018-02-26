'use strict';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class RouteStatusView extends React.Component {
  render() {
    const { preferredTrain, status, style } = this.props;

    const preferredTrainInt = parseInt(preferredTrain);
    const isHighlighted = preferredTrainInt && status.number === preferredTrainInt;

    let estimatedText;
    if (status.departure && status.departure.estimated_time) {
      console.log(`Estimated: ${status.departure.estimated_time}`);
      estimatedText = <Text style={styles.trainEstimated}>{status.departure.estimated_time.trim()}</Text>
    } else {
      estimatedText = <Text style={[styles.trainEstimated, styles.missingEstimation]}>Soon</Text>
    }


    return (
      <View
        key={status.number}
        style={[style, styles.train, isHighlighted && styles.highlightedTrain]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.estimatedView}>
            {estimatedText}
          </View>
          <View>
            <Text style={styles.trainNumber}>Train {status.number}</Text>
            <Text style={styles.trainScheduled}>Scheduled: {status.departure && status.departure.scheduled_time.trim()}</Text>
          </View>
        </View>
      </View>
    );
  }
};

const textHeight = 20;

var styles = StyleSheet.create({
  train: {
    flex: 1,

    padding: 12,
  },
  highlightedTrain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(19, 117, 179, 0.5)',
  },
  trainNumber: {
    paddingTop: 10,

    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
  },
  trainScheduled: {
    paddingBottom: 10,

    fontSize: 20,
    color: '#000000',
  },
  trainEstimated: {
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    paddingLeft: 5,

    fontSize: 28,
    textAlign: 'left',
    color: '#000000',
  },
  estimatedView: {
    width: 140,
  },
  missingEstimation: {
    color: 'orange',
  }
});

export default RouteStatusView;
