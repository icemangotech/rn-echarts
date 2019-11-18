import toString from './toString';
export default ({ options, isFirst, width, height }) => `
document.getElementById('main').style.height = "${height}px";
document.getElementById('main').style.width = "${width}px";
${isFirst
    ? "myChart = echarts.init(document.getElementById('main'));"
    : 'myChart.clear();'}
  myChart.setOption(${toString(options)});
  myChart.on('click', function (params) {
    var tmp = {};
    for (var p in params) {
      if (params.hasOwnProperty(p) && typeof params[p] != 'object') {
        tmp[p] = params[p];
      }
    }
    window.ReactNativeWebView.postMessage(JSON.stringify(tmp));
  });
  myChart.on('legendselectchanged', function(params) {
    window.ReactNativeWebView.postMessage(JSON.stringify(params));
  });
`;
