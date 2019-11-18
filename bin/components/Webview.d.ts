import React, { PureComponent } from 'react';
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
}
export default class Echarts extends PureComponent<Props> {
    shouldComponentUpdate(nextProps: Props): boolean;
    webview: React.RefObject<Webview>;
    componentDidUpdate(prevProps: Props): void;
    render(): JSX.Element;
}
export {};
