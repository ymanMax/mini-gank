Page({
  data:{
    actionSheetHidden: true,
    actionSheetItems: ['item1', 'item2', 'item3', 'item4']
  },

  // 跳转到数据统计页面
  goToStats: function() {
    wx.navigateTo({
      url: '/pages/stats/stats'
    })
  },

  // 跳转到后台管理页面
  goToAdmin: function() {
    wx.navigateTo({
      url: '/pages/admin/index'
    })
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