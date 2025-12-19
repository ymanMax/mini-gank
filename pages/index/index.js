var appInstance = getApp();
var RequestData = require('../../js/RequestData.js') ;
var MockData = require('../../js/MockData.js') ;
var IMGSRC = '';

Page({
  data:{
    popupShowData : false,
    GankDatas:[],
    loadingHidden : false,
    modalHidden : true,
    bodyHeight : 0,
    userInfo: {},
    SearchData: " ",
    // 评论相关数据
    comments: {}, // 按contentId存储评论列表
    showingComments: [], // 当前显示的评论
    showCommentInput: false, // 是否显示评论输入框
    currentContentId: null, // 当前评论的内容ID
    currentParentId: null, // 当前回复的评论ID
    commentContent: '', // 评论内容
    // 点赞相关数据
    likes: {}, // 按contentId存储点赞信息
    // 表情相关数据
    showEmojiPicker: false, // 是否显示表情选择器
    emojis: [], // 表情列表
    // 图片上传相关数据
    commentImages: [] // 评论图片
  },
  onLoad:function(options){
    reda(this,appInstance.globalType, appInstance.globalName);
    var that = this
    // 加载表情数据
    const emojis = MockData.generateEmojis();
    //调用应用实例的方法获取全局数据
    appInstance.getUserInfo(function(userInfo){
    //更新数据
      that.setData({
        userInfo:userInfo,
        emojis: emojis
     })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var _self = this;
    wx.getSystemInfo({
      success : function(res){
        _self.setData({
          "bodyHeight" : res.windowHeight
        })
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  // 上拉刷新
  upOnload : function(e){
    this.setData({
      "loadingHidden":false
    });
    var _self = this;
    setTimeout(function(){
      _self.onLoad();
    },500)

  },
  // 下拉加载
  downOnload : function(e){
    this.setData({
        "loadingHidden":false
      });
      var oldData = this.data.GankDatas;
      var _self = this;
      setTimeout(function(){
        redaDown(_self,appInstance.globalType ,appInstance.globalName,oldData)
      },500)
  },
  //弹出菜单
  popupMenuShow : function(){
    this.setData({"popupShowData" :! this.data.popupShowData});
  },
  imageError: function(e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },
  //保存图片
  onSavePic :function(event){
    IMGSRC = event.currentTarget.dataset.imgsrc;
    this.setData({
      "modalHidden" : false,
      "modalImgSrc" : IMGSRC
    })
  },
  //图片取消
  modalChange : function (event) {
    this.setData({
     "modalHidden" : true,
    })
  },
  modalconfirm : function (event) {
    wx.downloadFile({
      url: IMGSRC,
      type: 'image',
      success: function(res) {
        // console.log(res.tempFilePath)
      }
    })

  },
  // 点击不同的选项
  chuang : function(event){
        appInstance.globalName = event.currentTarget.dataset.name;
        appInstance.globalPage = 1;
        this.setData({
          "popupShowData":false,
        })
        reda(this,'common', event.currentTarget.dataset.name);
  },
  //搜索
  getSearch :function(event){
    this.setData({
      SearchData : event.detail.value
    })
  },
  search :function(){
    appInstance.globalType = 'search',
    appInstance.globalPage =1;
    var data = this.data.SearchData;
    this.setData({
         "loadingHidden":false,
        })
    if(trim(data)> 0){
        reda(this,'search',data)
    }
  },

  // ==================== 评论功能 ====================

  // 显示内容的评论
  showComments: function(event) {
    const contentId = event.currentTarget.dataset.contentId;
    // 如果已经加载过该内容的评论，直接显示
    if (this.data.comments[contentId]) {
      this.setData({
        showingComments: this.data.comments[contentId],
        currentContentId: contentId,
        showCommentInput: true,
        currentParentId: null
      });
    } else {
      // 加载评论数据
      const comments = MockData.generateComments(contentId, { num: 5, includeReplies: true });
      const newComments = { ...this.data.comments };
      newComments[contentId] = comments;
      this.setData({
        comments: newComments,
        showingComments: comments,
        currentContentId: contentId,
        showCommentInput: true,
        currentParentId: null
      });
    }
  },

  // 隐藏评论
  hideComments: function() {
    this.setData({
      showCommentInput: false,
      commentContent: '',
      commentImages: [],
      currentParentId: null
    });
  },

  // 回复评论
  replyToComment: function(event) {
    const parentId = event.currentTarget.dataset.commentId;
    this.setData({
      currentParentId: parentId,
      showCommentInput: true,
      commentContent: ''
    });
  },

  // 输入评论内容
  onCommentInput: function(event) {
    this.setData({
      commentContent: event.detail.value
    });
  },

  // 发表评论
  submitComment: function() {
    const { commentContent, currentContentId, currentParentId, userInfo, commentImages } = this.data;

    if (!commentContent.trim() && commentImages.length === 0) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }

    // 提交评论
    const result = MockData.submitComment({
      contentId: currentContentId,
      parentId: currentParentId,
      content: commentContent,
      user: {
        id: userInfo.openId || 'user_' + Date.now(),
        name: userInfo.nickName || '匿名用户',
        avatar: userInfo.avatarUrl || ''
      },
      images: commentImages
    });

    if (result.error) {
      wx.showToast({
        title: '评论发表失败',
        icon: 'none'
      });
      return;
    }

    // 更新评论列表
    const newComments = { ...this.data.comments };
    if (!newComments[currentContentId]) {
      newComments[currentContentId] = [];
    }
    newComments[currentContentId].unshift(result.data);

    this.setData({
      comments: newComments,
      showingComments: newComments[currentContentId],
      commentContent: '',
      commentImages: [],
      currentParentId: null
    });

    wx.showToast({
      title: '评论发表成功',
      icon: 'success'
    });
  },

  // ==================== 点赞功能 ====================

  // 点赞内容
  likeContent: function(event) {
    const contentId = event.currentTarget.dataset.contentId;
    const userId = this.data.userInfo.openId || 'user_' + Date.now();

    const result = MockData.toggleLike('content', contentId, userId);

    if (result.error) {
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      });
      return;
    }

    // 更新点赞信息
    const newLikes = { ...this.data.likes };
    newLikes[contentId] = result.data;

    this.setData({
      likes: newLikes
    });

    wx.showToast({
      title: result.msg,
      icon: 'success'
    });
  },

  // 点赞评论
  likeComment: function(event) {
    const commentId = event.currentTarget.dataset.commentId;
    const userId = this.data.userInfo.openId || 'user_' + Date.now();

    const result = MockData.toggleLike('comment', commentId, userId);

    if (result.error) {
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      });
      return;
    }

    wx.showToast({
      title: result.msg,
      icon: 'success'
    });
  },

  // ==================== 表情功能 ====================

  // 显示表情选择器
  showEmojiPicker: function() {
    this.setData({
      showEmojiPicker: true
    });
  },

  // 隐藏表情选择器
  hideEmojiPicker: function() {
    this.setData({
      showEmojiPicker: false
    });
  },

  // 选择表情
  selectEmoji: function(event) {
    const emojiCode = event.currentTarget.dataset.emojiCode;
    this.setData({
      commentContent: this.data.commentContent + emojiCode
    });
  },

  // ==================== 图片上传功能 ====================

  // 选择图片
  chooseCommentImage: function() {
    const that = this;
    wx.chooseImage({
      count: 1, // 最多选择1张图片
      sizeType: ['compressed'], // 压缩图片
      sourceType: ['album', 'camera'], // 支持从相册和相机选择
      success: function(res) {
        const tempFilePaths = res.tempFilePaths;
        // 上传图片
        const uploadResult = MockData.uploadImage(tempFilePaths[0]);
        if (uploadResult.error) {
          wx.showToast({
            title: '图片上传失败',
            icon: 'none'
          });
          return;
        }
        // 添加图片到评论
        that.setData({
          commentImages: [...that.data.commentImages, uploadResult.data.url]
        });
      }
    });
  },

  // 删除评论图片
  removeCommentImage: function(event) {
    const index = event.currentTarget.dataset.index;
    const newCommentImages = [...this.data.commentImages];
    newCommentImages.splice(index, 1);
    this.setData({
      commentImages: newCommentImages
    });
  },

  // 详情
  details:function(event){
     var url = event.currentTarget.dataset.src;
     console.log(url);
     wx.navigateTo({
       url:url
     })
   }

});

function reda(_self, type,value){
  RequestData.init({
      "value" : value,
      "type" : type,
      "page" : appInstance.globalPage
    },function(data){
        _self.setData({
          "GankDatas" : data,
          "loadingHidden" : true
        });
        appInstance.globalPage++;
    });
}
function redaDown(_self,type,value, oldData){
  RequestData.init({
      "value" : value,
      "type" : type,
      "page" : appInstance.globalPage
    },function(data){
      if(oldData.lenght >= 500){
        oldData = oldData.slice(-1,-500);
      }
      var newData = oldData.concat(data);
        _self.setData({
          "GankDatas" : newData,
          "loadingHidden" : true
        });
        appInstance.globalPage++;
    });
}
function trim(str) {
    return str.replace(/^(\s*)|(\s*)$/g,"");
}
