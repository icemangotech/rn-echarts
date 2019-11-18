import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Webview from 'react-native-webview';
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
    shouldComponentUpdate(nextProps: Props): boolean;
    webview: React.RefObject<Webview>;
    componentDidUpdate(prevProps: Props): void;
    private onMessage;
    render(): JSX.Element;
}
export {};
