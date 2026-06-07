import type { Dictionary } from './ru';

const dict: Dictionary = {
  meta: {
    title: 'JEEP.ALATAU — 阿拉木图州山区吉普之旅',
    description:
      '乘坐高端四驱车畅游阿拉木图州山区：大阿拉木图湖、恰伦、科尔赛、阿瑟高原。专业向导、在线预订、价格比市场低20%。'
  },
  nav: {
    home: '首页',
    tours: '行程',
    fleet: '车队',
    booking: '预订',
    businessPlan: '商业计划',
    contact: '联系'
  },
  hero: {
    eyebrow: '阿拉木图山区吉普之旅',
    title: '乘高端四驱车探索阿拉木图州的群山',
    subtitle:
      '前往外伊犁阿拉套的湖泊、峡谷与高原的特色吉普之旅。专业向导、可靠越野车，价格比市场低20%。',
    ctaPrimary: '预订行程',
    ctaSecondary: '查看行程'
  },
  sections: {
    toursTitle: '热门吉普行程',
    toursSubtitle: '通往阿拉木图州最美山区景点的线路',
    fleetTitle: '我们的车队',
    fleetSubtitle: '经山地越野检验的越野车',
    whyTitle: '为什么选择 JEEP.ALATAU',
    whySubtitle: '让群山更可达、更安全、更难忘',
    bookingTitle: '在线预订',
    bookingSubtitle: '提交申请——AI将处理并为您规划线路'
  },
  why: {
    items: [
      { title: '本地专业向导', text: '驾驶向导熟悉每一条路径，并讲述每个景点的故事。' },
      { title: '高端四驱车队', text: 'Nissan Patrol、Land Cruiser Prado、Honda Pilot 和 Hyundai Santa Fe。' },
      { title: '7种语言与本地货币', text: '网站与服务支持7种语言，价格自动以您的货币显示。' },
      { title: '公道价格', text: '比市场均价低20%的透明价格——无隐藏费用。' }
    ]
  },
  tags: {
    offroad: '越野',
    alpineLake: '高山湖',
    canyon: '峡谷',
    waterfall: '瀑布',
    observatory: '天文台',
    petroglyphs: '岩画',
    picnic: '野餐',
    photography: '拍照点',
    hotSprings: '温泉',
    plateau: '高原',
    nomadCulture: '游牧文化'
  },
  tour: {
    from: '起',
    perJeep: '每辆吉普',
    duration: '时长',
    hours: '小时',
    distance: '路线',
    km: '公里',
    upToGuests: '最多 {n} 位',
    difficulty: '难度',
    difficultyLevels: { easy: '轻松', moderate: '中等', hard: '困难' },
    details: '详情',
    bookNow: '立即预订',
    includedTitle: '行程包含',
    included: [
      '专业驾驶向导',
      '燃油及全部道路费用',
      '现代四驱车',
      '饮用水与小食',
      '酒店接送',
      '拍照及休息停靠'
    ],
    bringTitle: '需要携带',
    bring: [
      '舒适的衣物和鞋子',
      '保暖外套（山区天气）',
      '防晒霜和墨镜',
      '身份证 / 护照'
    ],
    backToTours: '← 返回全部行程'
  },
  fleet: {
    seats: '座',
    drivetrain: '驱动',
    onMountainBg: '以阿拉木图州群山为背景'
  },
  booking: {
    name: '您的姓名',
    phone: '电话 / WhatsApp',
    email: '邮箱',
    tour: '选择行程',
    vehicle: '首选车辆',
    anyVehicle: '任意可用车辆',
    date: '出行日期',
    guests: '人数',
    message: '备注或要求',
    messagePlaceholder: '可用任何语言填写——我们会自动将您的申请翻译成俄语。',
    submit: '提交申请',
    submitting: '提交中…',
    successTitle: '已收到申请！',
    successText: '谢谢！我们的AI助手已处理您的申请，我们会尽快与您联系。',
    errorTitle: '提交出错',
    errorText: '无法发送申请。请重试或通过 WhatsApp 联系我们。',
    aiNote: '申请由AI处理：数据将被结构化并翻译成俄语供我们团队使用。',
    paymentNote: '通过网上银行的在线支付即将上线。目前为确认后付款。',
    required: '必填项'
  },
  currency: {
    note: '价格按转换当日对坚戈的平均汇率自动换算为您的货币。',
    updated: '汇率已更新',
    live: '实时汇率',
    fallback: '备用汇率'
  },
  footer: {
    followUs: '关注我们',
    contact: '联系',
    language: '语言',
    rights: '版权所有。',
    builtWith: '阿拉木图州山区吉普之旅'
  }
};

export default dict;
