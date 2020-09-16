import toString from '../../utils/toString'

export default props => {
  const height = `${props.height || 400}px`
  const width = props.width ? `${props.width}px` : 'auto'
  return `
(function() {
  document.getElementById('main').style.height = '${height}';
  document.getElementById('main').style.width = '${width}';

  var myChart = echarts.init(document.getElementById('main'));
  var options = ${toString(props.option)};

  function setFunctionsFromString(obj) {
    for (var k in obj) {
      if (typeof obj[k] === "object" && obj[k] != null) {
        setFunctionsFromString(obj[k]);
      } else {
        if (typeof obj[k] === "string" && (obj[k].startsWith("function") || obj[k].startsWith("()"))) {
          obj[k] = new Function("return " + obj[k])();
        }
      }
    }
  }
  setFunctionsFromString(options);

  myChart.setOption(options);

  // Send to RN
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
    window.ReactNativeWebView.postMessage(paramsString);
  });
  myChart.on('datazoom', function(params) {
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
    window.ReactNativeWebView.postMessage(paramsString);
  });

  // Receive from RN
  window.addEventListener('message', message => {
    // delete message.data.dataZoom
    var options = message.data;
    
    setFunctionsFromString(options);

    myChart.setOption(options, {
      notMerge: true,
    });
  })

  return true;
})();
  `
}
