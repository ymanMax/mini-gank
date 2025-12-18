var MockData = require('../../js/MockData.js');

Page({
  data: {
    collectionData: [],
    loadingHidden: false,
    currentPage: 1,
    totalCount: 0,
    hasMore: true,
    currentCategory: '',
    searchKeyword: '',
    listHeight: 0
  },

  onLoad: function (options) {
    this.calculateListHeight();
    this.loadCollectionData();
  },

  onShow: function () {
    // 页面显示时重新加载数据
    this.setData({
      currentPage: 1,
      collectionData: [],
      hasMore: true
    });
    this.loadCollectionData();
  },

  // 计算列表高度
  calculateListHeight: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // 减去搜索栏和分类筛选的高度
        var listHeight = res.windowHeight - 120 - 80;
        that.setData({
          listHeight: listHeight
        });
      }
    });
  },

  // 加载收藏数据
  loadCollectionData: function () {
    var that = this;
    var { currentPage, currentCategory, searchKeyword } = this.data;

    // 调用mock数据接口
    var result = MockData.getCollectionList({
      page: currentPage,
      num: 10,
      category: currentCategory,
      search: searchKeyword
    });

    if (result.error === false) {
      var collectionData = currentPage === 1 ? result.data : that.data.collectionData.concat(result.data);

      that.setData({
        collectionData: collectionData,
        totalCount: result.total,
        loadingHidden: true,
        hasMore: collectionData.length < result.total
      });
    }
  },

  // 搜索输入
  onSearchInput: function (event) {
    this.setData({
      searchKeyword: event.detail.value
    });
  },

  // 搜索
  onSearch: function () {
    this.setData({
      currentPage: 1,
      collectionData: [],
      hasMore: true,
      loadingHidden: false
    });
    this.loadCollectionData();
  },

  // 分类筛选
  onCategoryChange: function (event) {
    var category = event.currentTarget.dataset.category;
    this.setData({
      currentCategory: category,
      currentPage: 1,
      collectionData: [],
      hasMore: true,
      loadingHidden: false
    });
    this.loadCollectionData();
  },

  // 加载更多
  onLoadMore: function () {
    if (this.data.hasMore && this.data.loadingHidden) {
      this.setData({
        currentPage: this.data.currentPage + 1,
        loadingHidden: false
      });
      this.loadCollectionData();
    }
  },

  // 取消收藏
  onRemoveCollection: function (event) {
    var item = event.currentTarget.dataset.item;
    var that = this;

    // 调用mock数据接口
    var result = MockData.removeFromCollection(item._id);

    if (result.error === false) {
      wx.showToast({
        title: result.msg,
        icon: 'success',
        duration: 1500
      });

      // 从列表中移除该项目
      var collectionData = that.data.collectionData.filter(function (collectionItem) {
        return collectionItem._id !== item._id;
      });

      that.setData({
        collectionData: collectionData,
        totalCount: that.data.totalCount - 1
      });
    }
  },

  // 查看详情
  onViewDetail: function (event) {
    var url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  }
});
