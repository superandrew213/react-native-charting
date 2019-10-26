import React, { Component } from 'react'
import { View } from 'react-native'

export default props => (
  <View style={[{ flexDirection: 'row' }, { width: props.width }]}>
    {props.children}
  </View>
)
