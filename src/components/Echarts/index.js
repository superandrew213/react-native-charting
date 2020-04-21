import React, { Component } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import WebView from 'react-native-webview'
import renderChart from './renderChart'

const SOURCE = Platform.select({
  ios: require('./echart.html'),
  android: { uri: 'file:///android_asset/echart.html' },
})

export default class extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.option !== this.props.option) {
      this.chart.reload()
    }
  }

  render() {
    return (
      <View style={{ flex: 1, height: this.props.height || 400 }}>
        <WebView
          ref={(ref) => (this.chart = ref)}
          style={{ height: this.props.height || 400 }}
          source={SOURCE}
          injectedJavaScript={renderChart(this.props)}
          onMessage={(event) => {
            const { type } = JSON.parse(event.nativeEvent.data)
            if (type === 'click' && this.props.onPress) {
              this.props.onPress(JSON.parse(event.nativeEvent.data))
              return
            }
            if (type === 'datazoom' && this.props.onDataZoom) {
              this.props.onDataZoom(JSON.parse(event.nativeEvent.data))
              return
            }
          }}
          scrollEnabled={false}
          originWhitelist={['*']}
          scalesPageToFit={Platform.select({ android: false })}
        />
      </View>
    )
  }
}
