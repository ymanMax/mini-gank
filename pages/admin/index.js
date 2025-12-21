var MockData = require('../../js/MockData.js');

Page({
  data: {
    adminStats: {},
    pendingContents: [],
    reports: [],
    currentTab: 'overview' // overview, review, reports
  },

  onLoad: function () {
    this.loadAdminData();
  },

  loadAdminData: function () {
    const stats = MockData.generateAdminStats();
    const pendingContents = MockData.generatePendingContents();
    const reports = MockData.generateReports();

    this.setData({
      adminStats: stats,
      pendingContents: pendingContents,
      reports: reports
    });
  },

  // 切换标签页
  switchTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    });
  },

  // 处理内容审核
  handleContentReview: function (e) {
    const contentId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '审核处理',
      content: '确定要通过该内容的审核吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '审核通过',
            icon: 'success'
          });
        }
      }
    });
  },

  // 删除待审核内容
  deletePendingContent: function (e) {
    const contentId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除内容',
      content: '确定要删除该内容吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 处理举报
  handleReport: function (e) {
    const reportId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '处理举报',
      content: '确定要处理该举报吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '处理成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 删除举报内容
  deleteReportedContent: function (e) {
    const reportId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除举报内容',
      content: '确定要删除被举报的内容吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
})
