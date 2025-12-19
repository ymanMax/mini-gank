/**
 * Mock数据模块
 * 根据页面展示逻辑生成模拟数据
 */

// 模拟数据类型
const mockTypes = ['Android', 'iOS', '休息视频', '福利', '拓展资源', '前端', '瞎推荐', 'App'];

// 多级分类结构
const categoryTree = [
  {
    id: 'technology',
    name: '技术',
    children: [
      { id: 'android', name: 'Android', type: 'Android' },
      { id: 'ios', name: 'iOS', type: 'iOS' },
      { id: 'frontend', name: '前端', type: '前端' },
      { id: 'app', name: 'App', type: 'App' }
    ]
  },
  {
    id: 'life',
    name: '生活',
    children: [
      { id: 'video', name: '休息视频', type: '休息视频' },
      { id: 'welfare', name: '福利', type: '福利' }
    ]
  },
  {
    id: 'resources',
    name: '资源',
    children: [
      { id: 'expand', name: '拓展资源', type: '拓展资源' },
      { id: 'random', name: '瞎推荐', type: '瞎推荐' }
    ]
  }
];

// 标签系统
const tags = ['热门', '最新', '推荐', '精选', '热门技术', '实用工具', '前端开发', '移动开发'];

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

// 生成轮播图图片URL
function generateBannerUrl() {
  const bannerUrls = [
    'https://picsum.photos/750/300?random=10',
    'https://picsum.photos/750/300?random=11',
    'https://picsum.photos/750/300?random=12',
    'https://picsum.photos/750/300?random=13'
  ];
  return bannerUrls[Math.floor(Math.random() * bannerUrls.length)];
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

  // 获取分类树
  getCategoryTree() {
    return categoryTree;
  }

  // 获取标签列表
  getTags() {
    return tags;
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
      _id: `mock_${Date.now()}_${index}`,
      category: actualType,
      tags: this.generateRandomTags(2),
      rating: Math.floor(Math.random() * 5) + 3, // 3-5星评分
      ratingCount: Math.floor(Math.random() * 1000) + 10, // 评分人数
      views: Math.floor(Math.random() * 10000) + 50, // 浏览量
      likes: Math.floor(Math.random() * 500) + 10, // 收藏数
      comments: Math.floor(Math.random() * 200) + 5 // 评论数
    };
  }

  // 生成随机标签
  generateRandomTags(count) {
    const shuffled = tags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // 生成轮播图数据
  generateBannerData(num = 4) {
    const bannerData = [];
    for (let i = 0; i < num; i++) {
      const type = mockTypes[Math.floor(Math.random() * mockTypes.length)];
      bannerData.push({
        id: `banner_${i}`,
        imageUrl: generateBannerUrl(),
        title: generateDescription(type),
        url: generateArticleUrl(),
        category: type
      });
    }
    return bannerData;
  }

  // 生成热门内容
  generateHotContent(num = 10) {
    const hotData = [];
    for (let i = 0; i < num; i++) {
      const item = this.generateItem('all', i);
      // 热门内容应有更高的浏览量和评分
      item.views = Math.floor(Math.random() * 50000) + 10000;
      item.rating = Math.floor(Math.random() * 2) + 4; // 4-5星
      item.ratingCount = Math.floor(Math.random() * 5000) + 1000;
      hotData.push(item);
    }
    // 按热度排序
    return hotData.sort((a, b) => (b.views + b.likes * 10) - (a.views + a.likes * 10));
  }

  // 生成最新内容
  generateLatestContent(num = 10) {
    const latestData = [];
    for (let i = 0; i < num; i++) {
      const item = this.generateItem('all', i);
      // 设置为最近日期
      const daysAgo = Math.floor(Math.random() * 30);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      item.publishedAt = date.toISOString().split('T')[0];
      latestData.push(item);
    }
    // 按日期排序
    return latestData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }

  // 生成编辑推荐内容
  generateEditorRecommendations(num = 8) {
    const recommendData = [];
    for (let i = 0; i < num; i++) {
      const item = this.generateItem('all', i);
      // 编辑推荐应有更高的评分和互动
      item.rating = 5; // 5星
      item.ratingCount = Math.floor(Math.random() * 10000) + 5000;
      item.views = Math.floor(Math.random() * 100000) + 50000;
      item.likes = Math.floor(Math.random() * 1000) + 500;
      recommendData.push(item);
    }
    return recommendData;
  }

  // 生成个性化推荐（基于用户行为）
  generatePersonalRecommendations(userBehavior, num = 10) {
    // 简单的推荐算法：基于用户浏览历史中的分类进行推荐
    const preferredCategories = userBehavior.viewedCategories || ['前端', 'Android'];
    const recommendations = [];

    for (let i = 0; i < num; i++) {
      const category = preferredCategories[Math.floor(Math.random() * preferredCategories.length)];
      const item = this.generateItem(category, i);
      recommendations.push(item);
    }

    return recommendations;
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

  // 模拟评分提交
  submitRating(itemId, rating) {
    return {
      error: false,
      msg: '评分成功！(模拟数据)',
      data: {
        itemId,
        rating,
        averageRating: (4 + Math.random() * 1).toFixed(1)
      }
    };
  }

  // 清空缓存
  clearCache() {
    this.mockDataCache = {};
  }
}

module.exports = new MockData();