import React, { Component } from 'react';
import { Platform, StyleProp, ViewStyle, View } from 'react-native';
import Webview, { WebViewMessageEvent } from 'react-native-webview';
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
  onChooseSeries?: (event: any) => void;
  onChooseLegend?: (event: any) => void;
}

export default class Echarts extends Component<Props> {
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

  private onMessage = (e: WebViewMessageEvent) => {
    const event = JSON.parse(e.nativeEvent.data);
    const { onChooseLegend, onChooseSeries } = this.props;
    if (event.type === 'legendselectchanged' && onChooseLegend) {
      onChooseLegend(event);
    } else if (
      event.type === 'click' &&
      event.componentType === 'series' &&
      onChooseSeries
    ) {
      onChooseSeries(event);
    }
  };

  render() {
    return (
      <View style={this.props.containerStyle}>
        <Webview
          ref={this.webview}
          scalesPageToFit
          scrollEnabled={false}
          originWhitelist={['*']}
          startInLoadingState={Platform.OS === 'ios'}
          source={Platform.select({
            ios: require('../../assets/template.html'),
            android: { uri: 'file:///android_asset/template.html' },
          })}
          onMessage={this.onMessage}
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
