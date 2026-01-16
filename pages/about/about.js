var MockData = require('../../js/MockData.js') ;

Page({
  data:{
    actionSheetHidden: true,
    actionSheetItems: ['item1', 'item2', 'item3', 'item4'],
    collectionCount: 0
  },

  onLoad: function() {
    this.loadCollectionCount();
  },

  // 加载收藏数量
  loadCollectionCount: function() {
    var result = MockData.getCollectionList({
      num: 1
    });

    this.setData({
      collectionCount: result.total
    });
  },

  // 跳转到收藏夹页面
  goToCollection: function() {
    wx.navigateTo({
      url: '/pages/collection/index'
    });
  },

  actionSheetTap: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  bindItemTap:function(e){
    console.log('tap ' + e.currentTarget.dataset.name)
  }
})