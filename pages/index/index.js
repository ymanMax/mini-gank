var appInstance = getApp();
var RequestData = require('../../js/RequestData.js');
var IMGSRC = '';

Page({
  data: {
    popupShowData: false,
    GankDatas: [],
    loadingHidden: false,
    modalHidden: true,
    bodyHeight: 0,
    userInfo: {},
    SearchData: " ",
    bannerData: [],
    hotContent: [],
    latestContent: [],
    editorRecommendations: [],
    personalRecommendations: [],
    currentTab: 'recommend', // 当前标签页：recommend, hot, latest
    categoryTree: [],
    userBehavior: {
      viewedCategories: ['前端', 'Android'],
      likedItems: [],
      ratedItems: []
    }
  },
  onLoad: function (options) {
    this.loadAllData();
    var that = this;
    appInstance.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      });
    });
  },
  onReady: function () {},
  onShow: function () {
    var _self = this;
    wx.getSystemInfo({
      success: function (res) {
        _self.setData({
          "bodyHeight": res.windowHeight
        });
      }
    });
  },
  onHide: function () {},
  onUnload: function () {},
  loadAllData: function () {
    var that = this;

    RequestData.getBannerData(4, function (data) {
      that.setData({
        bannerData: data
      });
    });

    RequestData.getHotContent(10, function (data) {
      that.setData({
        hotContent: data
      });
    });

    RequestData.getLatestContent(10, function (data) {
      that.setData({
        latestContent: data
      });
    });

    RequestData.getEditorRecommendations(8, function (data) {
      that.setData({
        editorRecommendations: data
      });
    });

    RequestData.getPersonalRecommendations(that.data.userBehavior, 10, function (data) {
      that.setData({
        personalRecommendations: data
      });
    });

    RequestData.getCategoryTree(function (data) {
      that.setData({
        categoryTree: data
      });
    });

    reda(this, appInstance.globalType, appInstance.globalName);
  },
  upOnload: function (e) {
    this.setData({
      "loadingHidden": false
    });
    var _self = this;
    setTimeout(function () {
      _self.loadAllData();
    }, 500);
  },
  downOnload: function (e) {
    this.setData({
      "loadingHidden": false
    });
    var oldData = this.data.GankDatas;
    var _self = this;
    setTimeout(function () {
      redaDown(_self, appInstance.globalType, appInstance.globalName, oldData);
    }, 500);
  },
  popupMenuShow: function () {
    this.setData({ "popupShowData": !this.data.popupShowData });
  },
  imageError: function (e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg);
  },
  onSavePic: function (event) {
    IMGSRC = event.currentTarget.dataset.imgsrc;
    this.setData({
      "modalHidden": false,
      "modalImgSrc": IMGSRC
    });
  },
  modalChange: function (event) {
    this.setData({
      "modalHidden": true,
    });
  },
  modalconfirm: function (event) {
    wx.downloadFile({
      url: IMGSRC,
      type: 'image',
      success: function (res) {}
    });
  },
  chuang: function (event) {
    appInstance.globalName = event.currentTarget.dataset.name;
    appInstance.globalPage = 1;
    this.setData({
      "popupShowData": false,
    });
    reda(this, 'common', event.currentTarget.dataset.name);
  },
  switchTab: function (event) {
    this.setData({
      currentTab: event.currentTarget.dataset.tab
    });
  },
  getSearch: function (event) {
    this.setData({
      SearchData: event.detail.value
    });
  },
  search: function () {
    appInstance.globalType = 'search',
      appInstance.globalPage = 1;
    var data = this.data.SearchData;
    this.setData({
      "loadingHidden": false,
    });
    if (trim(data) > 0) {
      reda(this, 'search', data);
    }
  },
  details: function (event) {
    var url = event.currentTarget.dataset.src;
    wx.navigateTo({
      url: url
    });
  },
  rateContent: function (event) {
    var itemId = event.currentTarget.dataset.itemid;
    var rating = event.currentTarget.dataset.rating;
    var that = this;

    RequestData.submitRating(itemId, rating, function (result) {
      if (result.error === false) {
        wx.showToast({
          title: '评分成功',
          icon: 'success',
          duration: 1500
        });
      }
    });
  },
  selectCategory: function (event) {
    var categoryType = event.currentTarget.dataset.type;
    if (categoryType) {
      appInstance.globalName = categoryType;
      appInstance.globalPage = 1;
      reda(this, 'common', categoryType);
    }
  }
});

function reda(_self, type, value) {
  RequestData.init({
    "value": value,
    "type": type,
    "page": appInstance.globalPage
  }, function (data) {
    _self.setData({
      "GankDatas": data,
      "loadingHidden": true
    });
    appInstance.globalPage++;
  });
}

function redaDown(_self, type, value, oldData) {
  RequestData.init({
    "value": value,
    "type": type,
    "page": appInstance.globalPage
  }, function (data) {
    if (oldData.lenght >= 500) {
      oldData = oldData.slice(-1, -500);
    }
    var newData = oldData.concat(data);
    _self.setData({
      "GankDatas": newData,
      "loadingHidden": true
    });
    appInstance.globalPage++;
  });
}

function trim(str) {
  return str.replace(/^(\s*)|(\s*)$/g, "");
}