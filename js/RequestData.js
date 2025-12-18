var options = "";
var rootUrl = 'http://gank.io/api/';
var MockData = require('./MockData.js');

var jonit = {
    "common" : function (options){
        return encodeURI(rootUrl + "data/" + options.value + "/" + options.num + '/' + options.page);
    },
    "search" : function (options){
        return encodeURI(rootUrl + "search/query/" + options.value + "/category/all/count/"+ options.num +"/page/"+options.page); 
    }
}

var runjonit = function(options){
    return jonit[options.type](options);
}

// 检查网络状态
function checkNetworkStatus() {
  return new Promise((resolve) => {
    wx.getNetworkType({
      success: function(res) {
        // 如果网络类型为none，则使用mock数据
        resolve(res.networkType !== 'none');
      },
      fail: function() {
        // 获取网络状态失败时也使用mock数据
        resolve(false);
      }
    });
  });
}

var RequestData = function(){

};

RequestData.prototype.init = function(option, callback){
    var _self = this;
    var _options = {
        "type" : "common",
        "page" : '1',
        "num"  : '10'
    }
    for(var key in option){
        _options[key] = option[key];
    }
    options = _options;
    
    // 检查网络状态，决定是否使用mock数据
    checkNetworkStatus().then((hasNetwork) => {
        if (hasNetwork) {
            // 有网络时使用真实接口
            this._requestD(runjonit(options), function(res){
                if(res.data && res.data.results){
                    _self._handleData(res.data.results, callback)
                } else {
                    // 接口返回异常时使用mock数据
                    console.log('接口返回异常，使用mock数据');
                    _self._handleMockData(options, callback);
                }
            })
        } else {
            // 无网络时使用mock数据
            console.log('无网络连接，使用mock数据');
            _self._handleMockData(options, callback);
        }
    });
}

RequestData.prototype._handleData = function(data, callback){
    var callData = [];
    data.forEach(function(value, index, arr){
        var d = {};
        d.desc = value.desc;
        if(/\.jpg?$/.test(value['url'])){
            d.type = 'img'
            d.url = value['url'].replace("//ww", "//ws");
        }else{
            d.type = 'other';
            d.url = value['url'];
        }
        
        d.publishedAt = value['publishedAt'].split("T")[0];
        callData.push(d);
    })
    // console.table(callData)
    callback(callData);
}

// 处理mock数据
RequestData.prototype._handleMockData = function(options, callback) {
    var callData = [];
    var mockResults = [];
    
    if (options.type === 'search') {
        mockResults = MockData.generateSearchResults(options.value, {
            num: parseInt(options.num),
            page: parseInt(options.page)
        });
    } else {
        mockResults = MockData.generateList({
            type: options.value,
            num: parseInt(options.num),
            page: parseInt(options.page)
        });
    }
    
    mockResults.forEach(function(value, index, arr){
        var d = {};
        d.desc = value.desc;
        d.type = value.type;
        d.url = value.url;
        d.publishedAt = value.publishedAt;
        callData.push(d);
    });
    
    // 模拟网络延迟
    setTimeout(function() {
        callback(callData);
    }, 300);
}

RequestData.prototype._requestD = function(url, callback){
    wx.request({
        url : url,   
        header: {
            'Content-Type': 'application/json'
        },
        success : callback,
    })
}

module.exports = new RequestData();