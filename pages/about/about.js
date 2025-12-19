var appInstance = getApp();
var MockData = require('../../js/MockData.js');

Page({
  data:{
    userInfo: {},
    activeTab: 'myComments', // 'myComments' 或 'replies'
    myComments: [], // 我的评论
    replies: [], // 收到的回复
    loading: {
      myComments: false,
      replies: false
    },
    page: {
      myComments: 1,
      replies: 1
    }
  },

  onLoad:function(options){
    var that = this;
    // 获取用户信息
    appInstance.getUserInfo(function(userInfo){
      that.setData({
        userInfo: userInfo
      });
      // 加载我的评论和收到的回复
      that.loadMyComments();
      that.loadReplies();
    });
  },

  // 切换标签
  switchTab: function(event) {
    const tab = event.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  // 加载我的评论
  loadMyComments: function() {
    if (this.data.loading.myComments) return;

    this.setData({
      loading: {
        ...this.data.loading,
        myComments: true
      }
    });

    const userId = this.data.userInfo.openId || 'user_default';
    const comments = MockData.generateUserComments(userId, {
      num: 10,
      page: this.data.page.myComments
    });

    // 模拟网络请求延迟
    setTimeout(() => {
      this.setData({
        myComments: this.data.page.myComments === 1 ? comments : [...this.data.myComments, ...comments],
        page: {
          ...this.data.page,
          myComments: this.data.page.myComments + 1
        },
        loading: {
          ...this.data.loading,
          myComments: false
        }
      });
    }, 500);
  },

  // 加载收到的回复
  loadReplies: function() {
    if (this.data.loading.replies) return;

    this.setData({
      loading: {
        ...this.data.loading,
        replies: true
      }
    });

    const userId = this.data.userInfo.openId || 'user_default';
    const replies = MockData.generateUserReplies(userId, {
      num: 10,
      page: this.data.page.replies
    });

    // 模拟网络请求延迟
    setTimeout(() => {
      this.setData({
        replies: this.data.page.replies === 1 ? replies : [...this.data.replies, ...replies],
        page: {
          ...this.data.page,
          replies: this.data.page.replies + 1
        },
        loading: {
          ...this.data.loading,
          replies: false
        }
      });
    }, 500);
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    // 重置分页
    this.setData({
      page: {
        myComments: 1,
        replies: 1
      }
    });
    // 重新加载数据
    this.loadMyComments();
    this.loadReplies();
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  // 上拉加载更多
  onReachBottom: function() {
    if (this.data.activeTab === 'myComments') {
      this.loadMyComments();
    } else {
      this.loadReplies();
    }
  },

  // 点赞评论
  likeComment: function(event) {
    const commentId = event.currentTarget.dataset.commentId;
    const userId = this.data.userInfo.openId || 'user_default';

    const result = MockData.toggleLike('comment', commentId, userId);

    wx.showToast({
      title: result.msg,
      icon: result.error ? 'none' : 'success'
    });
  },

  // 回复评论
  replyToComment: function(event) {
    const commentId = event.currentTarget.dataset.commentId;
    wx.showModal({
      title: '回复评论',
      content: '回复功能将在稍后实现',
      showCancel: false
    });
  }
})
