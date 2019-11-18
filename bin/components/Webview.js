import React, { PureComponent } from 'react';
import { Platform, View } from 'react-native';
import Webview from 'react-native-webview';
import isEqual from 'react-fast-compare';
import renderCharts from '../utils/renderCharts';
export default class Echarts extends PureComponent {
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
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            const { width, height, options } = this.props;
            this.webview.current &&
                this.webview.current.injectJavaScript(renderCharts({
                    options,
                    width,
                    height,
                    isFirst: false,
                }));
        }
    }
    render() {
        const { width, height, containerStyle, options } = this.props;
        return (<View style={[{ width, height }, containerStyle]}>
        <Webview ref={this.webview} scalesPageToFit scrollEnabled={false} originWhitelist={['*']} startInLoadingState={Platform.OS === 'ios'} source={Platform.select({
            ios: require('../../assets/template.html'),
            android: { uri: 'file:///android_asset/rn-echarts-template.html' },
        })} onMessage={this.onMessage} injectedJavaScript={renderCharts({
            options,
            width,
            height,
            isFirst: true,
        })}/>
      </View>);
    }
}
