# react-native-charting

  Originally forked from [native-echarts](https://github.com/somonus/react-native-echarts).

  react-native-charting uses [Echarts](https://github.com/ecomfe/echarts).

  Works for both iOS & Android using WebView.

## Install

`$ npm i --save react-native-charting`

**Android**

Copy `./node_modules/react-native-charting/src/components/Echarts/echart.html` to `./android/app/src/main/assets/`. Don't remove `./node_modules/react-native-charting/src/components/Echarts/echart.html`.

**iOS**

Nothing else to do.

## Usage

The Usage is complete consistent with Echarts.

component props:

* *option* (object): The option for echarts: [Documentation](http://echarts.baidu.com/option.html#title)。
* *width* (number): The width of the chart. The default value is the outer container width.
* *height* (number): The height of the chart. The default value is 400.
* *onPress* (function): Returns event [object](https://ecomfe.github.io/echarts-doc/public/en/api.html#events.Mouse%20events).


```js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Echarts from 'react-native-charting';

export default class app extends Component {
  render() {
    const option = {
      title: {
        text: 'ECharts demo'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
    return (
      <Echarts option={option} height={300} onPress={params => console.log(params)} />
    );
  }
}

AppRegistry.registerComponent('app', () => app);

```


### IOS

![image](https://github.com/superandrew213/react-native-charting/blob/master/demoIOS.png)

### Android

![image](https://github.com/superandrew213/react-native-charting/blob/master/demoAndroid.png)

## License

react-native-charting is released under the MIT license.
