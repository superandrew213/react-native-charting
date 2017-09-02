import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform } from 'react-native';
import renderChart from './renderChart';

const SOURCE = Platform.select({
  ios: require('./echart.html'),
  android: __DEV__
    ? require('./echart.html')
    : { uri: 'file:///android_asset/echart.html' },
});

export default class extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.chart.reload();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, height: this.props.height || 400 }}>
        <WebView
          ref={ref => this.chart = ref}
          style={{ height: this.props.height || 400 }}
          source={SOURCE}
          injectedJavaScript={renderChart(this.props)}
          onMessage={event => this.props.onPress
            ? this.props.onPress(JSON.parse(event.nativeEvent.data))
            : {}
          }
          scrollEnabled={false}
          scalesPageToFit={Platform.select({ ios: false, android: true })}
        />
      </View>
    );
  }
}
