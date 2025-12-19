/**
 * Mock数据模块
 * 根据页面展示逻辑生成模拟数据
 */

// 模拟数据类型
const mockTypes = ['Android', 'iOS', '休息视频', '福利', '拓展资源', '前端', '瞎推荐', 'App'];

// 生成随机字符串
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 生成随机日期
function generateRandomDate() {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

// 生成图片URL
function generateImageUrl() {
  const imageUrls = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5'
  ];
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
}

// 生成文章URL
function generateArticleUrl() {
  const articleUrls = [
    'https://github.com/daimajia/AndroidSwipeLayout',
    'https://github.com/ReactiveX/RxJava',
    'https://github.com/facebook/react',
    'https://github.com/vuejs/vue',
    'https://github.com/tensorflow/tensorflow'
  ];
  return articleUrls[Math.floor(Math.random() * articleUrls.length)];
}

// 生成描述文本
function generateDescription(type) {
  const descriptions = {
    'Android': [
      'Android开发必备的实用工具库',
      '最新的Android开发框架介绍',
      'Android性能优化技巧分享',
      'Android UI设计最佳实践'
    ],
    'iOS': [
      'iOS开发中的Swift技巧',
      'Objective-C与Swift混合编程',
      'iOS应用架构设计模式',
      'iOS性能监控工具推荐'
    ],
    '前端': [
      'Vue.js 3.0新特性详解',
      'React Hooks使用指南',
      'Webpack配置优化技巧',
      'TypeScript在项目中的应用'
    ],
    '福利': [
      '程序员必备的壁纸合集',
      '技术分享会精彩瞬间',
      '开发者社区活动照片',
      '技术团队建设活动'
    ],
    '休息视频': [
      '编程技巧分享视频',
      '技术讲座录像',
      '开发者访谈视频',
      '编程教学视频'
    ],
    '拓展资源': [
      '开发者工具推荐',
      '编程学习资源汇总',
      '技术文档整理',
      '开源项目推荐'
    ],
    '瞎推荐': [
      '有趣的编程小技巧',
      '开发者必备的软件',
      '提高效率的工具',
      '技术书籍推荐'
    ],
    'App': [
      '实用的移动应用推荐',
      '开发工具类App介绍',
      '效率提升App合集',
      '技术学习App推荐'
    ]
  };
  
  const typeDescs = descriptions[type] || descriptions['瞎推荐'];
  return typeDescs[Math.floor(Math.random() * typeDescs.length)];
}

// 生成模拟数据
class MockData {
  constructor() {
    this.mockDataCache = {};
  }

  // 生成单个数据项
  generateItem(type = 'all', index = 0) {
    const actualType = type === 'all' ? mockTypes[Math.floor(Math.random() * mockTypes.length)] : type;
    const isImage = Math.random() > 0.5;
    
    return {
      desc: `${generateDescription(actualType)} - 模拟数据${index + 1}`,
      url: isImage ? generateImageUrl() : generateArticleUrl(),
      publishedAt: generateRandomDate(),
      type: isImage ? 'img' : 'other',
      who: `mock_user_${generateRandomString(6)}`,
      _id: `mock_${Date.now()}_${index}`
    };
  }

  // 生成数据列表
  generateList(options = {}) {
    const {
      type = 'all',
      num = 10,
      page = 1
    } = options;

    const cacheKey = `${type}_${num}_${page}`;
    
    // 使用缓存避免重复生成相同数据
    if (this.mockDataCache[cacheKey]) {
      return this.mockDataCache[cacheKey];
    }

    const results = [];
    const startIndex = (page - 1) * num;
    
    for (let i = 0; i < num; i++) {
      results.push(this.generateItem(type, startIndex + i));
    }

    this.mockDataCache[cacheKey] = results;
    return results;
  }

  // 模拟搜索数据
  generateSearchResults(query, options = {}) {
    const {
      num = 10,
      page = 1
    } = options;

    const results = [];
    const startIndex = (page - 1) * num;
    
    for (let i = 0; i < num; i++) {
      const item = this.generateItem('all', startIndex + i);
      // 在描述中添加搜索关键词
      item.desc = `[搜索:${query}] ${item.desc}`;
      results.push(item);
    }

    return results;
  }

  // 模拟提交响应
  generateSubmitResponse(data) {
    return {
      error: false,
      msg: '提交成功！(模拟数据)',
      data: {
        ...data,
        id: `mock_submit_${Date.now()}`,
        createdAt: new Date().toISOString()
      }
    };
  }

  // 生成表情符号数据
  generateEmojis() {
    const emojis = [
      { code: '[微笑]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-1.222e0a.png' },
      { code: '[撇嘴]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-2.406bc0.png' },
      { code: '[色]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-3.30b94c.png' },
      { code: '[发呆]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-4.5a4566.png' },
      { code: '[得意]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-5.77284b.png' },
      { code: '[流泪]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-6.6385f7.png' },
      { code: '[害羞]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-7.8d2467.png' },
      { code: '[闭嘴]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-8.946195.png' },
      { code: '[睡]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-9.a93434.png' },
      { code: '[大哭]', url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-10.1d6f6d.png' }
    ];
    return emojis;
  }

  // 生成单个评论
  generateComment(contentId, parentId = null, index = 0) {
    const isReply = parentId !== null;
    return {
      _id: `comment_${Date.now()}_${index}`,
      contentId: contentId,
      parentId: parentId,
      content: isReply ? `回复：这个内容真不错！(模拟评论${index + 1})` : `这个内容真不错！(模拟评论${index + 1})`,
      user: {
        id: `user_${generateRandomString(6)}`,
        name: `用户${generateRandomString(6)}`,
        avatar: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 100)}`
      },
      likes: Math.floor(Math.random() * 50),
      replies: Math.floor(Math.random() * 20),
      createdAt: generateRandomDate(),
      status: Math.random() > 0.1 ? 'approved' : 'pending', // 90% 已审核，10% 待审核
      images: Math.random() > 0.7 ? [generateImageUrl()] : [] // 30% 评论包含图片
    };
  }

  // 生成内容的评论列表
  generateComments(contentId, options = {}) {
    const {
      num = 10,
      page = 1,
      includeReplies = true
    } = options;

    const cacheKey = `comments_${contentId}_${num}_${page}_${includeReplies}`;

    if (this.mockDataCache[cacheKey]) {
      return this.mockDataCache[cacheKey];
    }

    const results = [];
    const startIndex = (page - 1) * num;

    for (let i = 0; i < num; i++) {
      // 生成主评论
      const mainComment = this.generateComment(contentId, null, startIndex + i);
      results.push(mainComment);

      // 如果包含回复，为每个主评论生成一些回复
      if (includeReplies && Math.random() > 0.3) {
        const replyCount = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < replyCount; j++) {
          const reply = this.generateComment(contentId, mainComment._id, `${startIndex + i}_${j}`);
          results.push(reply);
        }
      }
    }

    this.mockDataCache[cacheKey] = results;
    return results;
  }

  // 生成用户的评论记录
  generateUserComments(userId, options = {}) {
    const {
      num = 10,
      page = 1
    } = options;

    const results = [];
    const startIndex = (page - 1) * num;

    for (let i = 0; i < num; i++) {
      const contentId = `mock_content_${Math.floor(Math.random() * 100)}`;
      const comment = this.generateComment(contentId, null, startIndex + i);
      comment.user.id = userId;
      comment.user.name = `用户${userId.slice(-6)}`;
      results.push(comment);
    }

    return results;
  }

  // 生成用户收到的回复
  generateUserReplies(userId, options = {}) {
    const {
      num = 10,
      page = 1
    } = options;

    const results = [];
    const startIndex = (page - 1) * num;

    for (let i = 0; i < num; i++) {
      const contentId = `mock_content_${Math.floor(Math.random() * 100)}`;
      const parentId = `comment_${Date.now()}_${startIndex + i}`;
      const reply = this.generateComment(contentId, parentId, startIndex + i);
      reply.parentUser = {
        id: userId,
        name: `用户${userId.slice(-6)}`
      };
      results.push(reply);
    }

    return results;
  }

  // 模拟发表评论
  submitComment(data) {
    const comment = {
      _id: `comment_${Date.now()}`,
      contentId: data.contentId,
      parentId: data.parentId || null,
      content: data.content,
      user: data.user,
      likes: 0,
      replies: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: Math.random() > 0.2 ? 'approved' : 'pending', // 80% 直接通过，20% 待审核
      images: data.images || []
    };

    return {
      error: false,
      msg: '评论发表成功！(模拟数据)',
      data: comment
    };
  }

  // 模拟点赞功能
  toggleLike(type, id, userId) {
    const isLiked = Math.random() > 0.5;
    const likeCount = Math.floor(Math.random() * 100);

    return {
      error: false,
      msg: `${isLiked ? '点赞' : '取消点赞'}成功！(模拟数据)`,
      data: {
        id: id,
        type: type,
        isLiked: isLiked,
        likeCount: likeCount
      }
    };
  }

  // 模拟图片上传
  uploadImage(filePath) {
    return {
      error: false,
      msg: '图片上传成功！(模拟数据)',
      data: {
        url: generateImageUrl(),
        width: 400,
        height: 300,
        size: Math.floor(Math.random() * 1024 * 1024) + 1024 // 1KB - 1MB
      }
    };
  }

  // 模拟获取内容的点赞数
  getContentLikes(contentId) {
    return {
      error: false,
      data: {
        likeCount: Math.floor(Math.random() * 200),
        isLiked: Math.random() > 0.5
      }
    };
  }

  // 清空缓存
  clearCache() {
    this.mockDataCache = {};
  }
}

module.exports = new MockData();