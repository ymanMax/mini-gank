var options = "";
var rootUrl = 'http://111.229.213.248:7002/api/';
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

    // 直接使用mock数据，不调用真实接口
    console.log('使用mock数据展示');
    _self._handleMockData(options, callback);
}

// 获取分类树
RequestData.prototype.getCategoryTree = function(callback) {
    setTimeout(function() {
        callback(MockData.getCategoryTree());
    }, 200);
}

// 获取标签列表
RequestData.prototype.getTags = function(callback) {
    setTimeout(function() {
        callback(MockData.getTags());
    }, 200);
}

// 获取轮播图数据
RequestData.prototype.getBannerData = function(num, callback) {
    setTimeout(function() {
        callback(MockData.generateBannerData(num));
    }, 200);
}

// 获取热门内容
RequestData.prototype.getHotContent = function(num, callback) {
    setTimeout(function() {
        callback(MockData.generateHotContent(num));
    }, 200);
}

// 获取最新内容
RequestData.prototype.getLatestContent = function(num, callback) {
    setTimeout(function() {
        callback(MockData.generateLatestContent(num));
    }, 200);
}

// 获取编辑推荐
RequestData.prototype.getEditorRecommendations = function(num, callback) {
    setTimeout(function() {
        callback(MockData.generateEditorRecommendations(num));
    }, 200);
}

// 获取个性化推荐
RequestData.prototype.getPersonalRecommendations = function(userBehavior, num, callback) {
    setTimeout(function() {
        callback(MockData.generatePersonalRecommendations(userBehavior, num));
    }, 200);
}

// 提交评分
RequestData.prototype.submitRating = function(itemId, rating, callback) {
    setTimeout(function() {
        callback(MockData.submitRating(itemId, rating));
    }, 200);
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
        d.category = value.category;
        d.tags = value.tags;
        d.rating = value.rating;
        d.ratingCount = value.ratingCount;
        d.views = value.views;
        d.likes = value.likes;
        d.comments = value.comments;
        d._id = value._id;
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