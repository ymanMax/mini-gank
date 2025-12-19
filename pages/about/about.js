const MockData = require('../../js/MockData.js');

Page({
  data: {
    userInfo: null,
    myPosts: [],
    browseHistory: [],
    settings: null,
    activeTab: 'profile', // profile, posts, history, settings
    theme: 'light'
  },

  onLoad: function (options) {
    this.loadUserData();
  },

  // 加载用户数据
  loadUserData: function () {
    const userInfo = MockData.generateUserInfo();
    const myPosts = MockData.generateMyPosts();
    const browseHistory = MockData.generateBrowseHistory();
    const settings = MockData.generateSettings();

    this.setData({
      userInfo: userInfo,
      myPosts: myPosts,
      browseHistory: browseHistory,
      settings: settings,
      theme: settings.theme
    });
  },

  // 切换标签
  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  // 主题切换
  toggleTheme: function () {
    const newTheme = this.data.theme === 'light' ? 'dark' : 'light';
    this.setData({
      theme: newTheme
    });

    // 更新设置数据
    const settings = { ...this.data.settings, theme: newTheme };
    this.setData({ settings });

    wx.showToast({
      title: `已切换至${newTheme === 'light' ? '浅色' : '深色'}主题`,
      icon: 'success'
    });
  },

  // 通知设置切换
  toggleNotifications: function () {
    const newNotifications = !this.data.settings.notifications;
    const settings = { ...this.data.settings, notifications: newNotifications };
    this.setData({ settings });

    wx.showToast({
      title: newNotifications ? '通知已开启' : '通知已关闭',
      icon: 'success'
    });
  },

  // 自动刷新设置切换
  toggleAutoRefresh: function () {
    const newAutoRefresh = !this.data.settings.autoRefresh;
    const settings = { ...this.data.settings, autoRefresh: newAutoRefresh };
    this.setData({ settings });

    wx.showToast({
      title: newAutoRefresh ? '自动刷新已开启' : '自动刷新已关闭',
      icon: 'success'
    });
  },

  // 清空缓存
  clearCache: function () {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空缓存吗？',
      success: (res) => {
        if (res.confirm) {
          MockData.clearCache();
          this.setData({
            settings: { ...this.data.settings, cacheSize: '0MB' }
          });

          wx.showToast({
            title: '缓存已清空',
            icon: 'success'
          });
        }
      }
    });
  },

  // 查看发布详情
  viewPostDetail: function (e) {
    const postId = e.currentTarget.dataset.id;
    wx.showToast({
      title: `查看发布 #${postId}`,
      icon: 'none'
    });
  },

  // 查看历史详情
  viewHistoryDetail: function (e) {
    const historyId = e.currentTarget.dataset.id;
    wx.showToast({
      title: `查看历史 #${historyId}`,
      icon: 'none'
    });
  },

  // 编辑个人信息
  editProfile: function () {
    wx.showToast({
      title: '编辑个人信息功能',
      icon: 'none'
    });
  },

  // 关注
  followUser: function () {
    wx.showToast({
      title: '关注功能',
      icon: 'none'
    });
  }
})
