import toString from '../../utils/toString';

export default props => {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  return `
    document.getElementById('main').style.height = '${height}';
    document.getElementById('main').style.width = '${width}';
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});
    myChart.on('click', function(params) {
      var seen = [];
      var paramsString = JSON.stringify(params, function(key, val) {
        if (typeof val === 'object') {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
      window.postMessage(paramsString);
    });
  `;
};
