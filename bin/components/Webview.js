import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import Webview from 'react-native-webview';
import isEqual from 'react-fast-compare';
import renderCharts from '../utils/renderCharts';
export default class Echarts extends Component {
    constructor() {
        super(...arguments);
        this.webview = React.createRef();
        this.onMessage = (e) => {
            const event = JSON.parse(e.nativeEvent.data);
            const { onChooseLegend, onChooseSeries } = this.props;
            if (event.type === 'legendselectchanged' && onChooseLegend) {
                onChooseLegend(event);
            }
            else if (event.type === 'click' &&
                event.componentType === 'series' &&
                onChooseSeries) {
                onChooseSeries(event);
            }
        };
    }
    shouldComponentUpdate(nextProps) {
        const shouldChange = !isEqual(this.props.options, nextProps.options);
        return shouldChange;
    }
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.webview.current &&
                this.webview.current.injectJavaScript(renderCharts({
                    options: this.props.options,
                    ...this.props.canvasSize,
                    isFirst: false,
                }));
        }
    }
    render() {
        return (<View style={this.props.containerStyle}>
        <Webview ref={this.webview} scalesPageToFit scrollEnabled={false} originWhitelist={['*']} startInLoadingState={Platform.OS === 'ios'} source={require('../../assets/template.html')} onMessage={this.onMessage} injectedJavaScript={renderCharts({
            options: this.props.options,
            ...this.props.canvasSize,
            isFirst: true,
        })}/>
      </View>);
    }
}
