import toString from './toString';
import { EChartOption } from 'echarts';
interface Config {
  options: EChartOption;
  isFirst: boolean;
  width: number;
  height: number;
}

export default ({ options, isFirst, width, height }: Config) => `
document.getElementById('main').style.height = "${height}px";
document.getElementById('main').style.width = "${width}px";
${
  isFirst
    ? "myChart = echarts.init(document.getElementById('main'));"
    : 'myChart.clear();'
}
  myChart.setOption(${toString(options)});
  myChart.on('click', function (params) {
    var tmp = {};
    for (var p in params) {
      if (params.hasOwnProperty(p) && typeof params[p] != 'object') {
        tmp[p] = params[p];
      }
    }
    window.postMessage(JSON.stringify(tmp));
  });
  myChart.on('legendselectchanged', function(params) {
    window.postMessage(JSON.stringify(params));
  });
`;
