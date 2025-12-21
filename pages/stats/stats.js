var MockData = require('../../js/MockData.js');

Page({
  data: {
    userStats: {}
  },

  onLoad: function () {
    this.loadUserStats();
  },

  loadUserStats: function () {
    const stats = MockData.generateUserStats();
    this.setData({
      userStats: stats
    });
  }
})
