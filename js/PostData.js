
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
    
    // 检查网络状态，决定是否使用mock数据
    checkNetworkStatus().then((hasNetwork) => {
        if (hasNetwork) {
            // 有网络时使用真实接口
            wx.request({
                url : url,
                data :json2Form(data),
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },    
                method : 'POST',
                success : function(res){
                    callback(res)
                },
                fail: function() {
                    // 网络请求失败时使用mock数据
                    console.log('网络请求失败，使用mock提交响应');
                    var mockResponse = {
                        data: MockData.generateSubmitResponse(data)
                    };
                    callback(mockResponse);
                }
            })
        } else {
            // 无网络时使用mock数据
            console.log('无网络连接，使用mock提交响应');
            var mockResponse = {
                data: MockData.generateSubmitResponse(data)
            };
            // 模拟网络延迟
            setTimeout(function() {
                callback(mockResponse);
            }, 500);
        }
    });
}

function json2Form(json) {
    var str = [];
    for(var p in json){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

module.exports = PostData;