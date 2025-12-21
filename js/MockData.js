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

  // 生成用户统计数据
  generateUserStats() {
    return {
      publishCount: Math.floor(Math.random() * 50) + 5,
      favoriteCount: Math.floor(Math.random() * 100) + 10,
      commentCount: Math.floor(Math.random() * 80) + 15,
      likeCount: Math.floor(Math.random() * 200) + 20,
      activeDays: Math.floor(Math.random() * 30) + 5,
      recentActivity: generateRandomDate()
    };
  }

  // 生成内容举报数据
  generateReports() {
    const reports = [];
    const reportReasons = ['色情低俗', '政治敏感', '广告推广', '恶意攻击', '其他'];

    for (let i = 0; i < 8; i++) {
      reports.push({
        id: `report_${Date.now()}_${i}`,
        contentId: `mock_${Date.now()}_${i}`,
        contentTitle: `违规内容标题 ${i+1}`,
        reporter: `user_${generateRandomString(6)}`,
        reason: reportReasons[Math.floor(Math.random() * reportReasons.length)],
        reportTime: generateRandomDate(),
        status: i % 3 === 0 ? '待处理' : i % 3 === 1 ? '已处理' : '已删除',
        type: mockTypes[Math.floor(Math.random() * mockTypes.length)]
      });
    }

    return reports;
  }

  // 生成后台管理统计数据
  generateAdminStats() {
    return {
      totalUsers: Math.floor(Math.random() * 500) + 200,
      totalContents: Math.floor(Math.random() * 2000) + 500,
      pendingReviews: Math.floor(Math.random() * 30) + 5,
      todayPublish: Math.floor(Math.random() * 50) + 10,
      contentHeat: [
        { type: 'Android', count: 120, trend: '+12%' },
        { type: 'iOS', count: 95, trend: '+8%' },
        { type: '前端', count: 150, trend: '+20%' },
        { type: '福利', count: 80, trend: '+5%' },
        { type: '休息视频', count: 65, trend: '+3%' }
      ]
    };
  }

  // 生成待审核内容
  generatePendingContents() {
    const contents = [];

    for (let i = 0; i < 10; i++) {
      contents.push({
        id: `pending_${Date.now()}_${i}`,
        title: `待审核内容 ${i+1}`,
        type: mockTypes[Math.floor(Math.random() * mockTypes.length)],
        author: `user_${generateRandomString(6)}`,
        publishTime: generateRandomDate(),
        status: '待审核'
      });
    }

    return contents;
  }

  // 清空缓存
  clearCache() {
    this.mockDataCache = {};
  }
}

module.exports = new MockData();