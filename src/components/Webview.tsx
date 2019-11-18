import React, { PureComponent } from 'react';
import { Platform, StyleProp, ViewStyle, View } from 'react-native';
import Webview from 'react-native-webview';
import isEqual from 'react-fast-compare';
import renderCharts from '../utils/renderCharts';
import { EChartOption } from 'echarts';

interface Props {
  options: EChartOption;
  containerStyle?: StyleProp<ViewStyle>;
  canvasSize: {
    width: number;
    height: number;
  };
}

export default class Echarts extends PureComponent<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const shouldChange = !isEqual(this.props.options, nextProps.options);
    return shouldChange;
  }

  webview = React.createRef<Webview>();

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps, this.props)) {
      this.webview.current &&
        this.webview.current.injectJavaScript(
          renderCharts({
            options: this.props.options,
            ...this.props.canvasSize,
            isFirst: false,
          })
        );
    }
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        <Webview
          ref={this.webview}
          scalesPageToFit
          scrollEnabled={false}
          originWhitelist={['*']}
          startInLoadingState={Platform.OS === 'ios'}
          source={require('../../assets/template.html')}
          injectedJavaScript={renderCharts({
            options: this.props.options,
            ...this.props.canvasSize,
            isFirst: true,
          })}
        />
      </View>
    );
  }
}
