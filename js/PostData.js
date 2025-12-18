
var MockData = require('./MockData.js');

// 检查网络状态
function checkNetworkStatus() {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success: function(res) {
        resolve(res.networkType !== 'none');
      },
      fail: function() {
        resolve(false);
      }
    });
  });
}

var PostData = function(options,callback){
    var url = options.url || 'https://gank.io/api/add2gank';
    var data = options.data || {};
    
    // 直接使用mock数据，不调用真实接口
    console.log('使用mock提交响应');
    var mockResponse = {
        data: MockData.generateSubmitResponse(data)
    };
    // 模拟网络延迟
    setTimeout(function() {
        callback(mockResponse);
    }, 500);
}

function json2Form(json) {
    var str = [];
    for(var p in json){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

module.exports = PostData;