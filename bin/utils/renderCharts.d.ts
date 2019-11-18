import { EChartOption } from 'echarts';
interface Config {
    options: EChartOption;
    isFirst: boolean;
    width: number;
    height: number;
}
declare const _default: ({ options, isFirst, width, height }: Config) => string;
export default _default;
