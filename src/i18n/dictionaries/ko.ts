import type { Dictionary } from './ru';

const dict: Dictionary = {
  meta: {
    title: 'JEEP.ALATAU — 알마티 지역 산악 지프 투어',
    description:
      '프리미엄 4x4로 떠나는 알마티 지역 산악 지프 투어: 빅 알마티 호수, 차린, 콜사이, 아시 고원. 전문 가이드, 온라인 예약, 시장가보다 20% 저렴.'
  },
  nav: {
    home: '홈',
    tours: '투어',
    fleet: '차량',
    booking: '예약',
    businessPlan: '사업 계획',
    contact: '문의'
  },
  hero: {
    eyebrow: '알마티 산악 지프 투어',
    title: '프리미엄 4x4로 만나는 알마티 지역의 산',
    subtitle:
      '일레 알라타우의 호수, 협곡, 고원으로 떠나는 시그니처 지프 투어. 전문 가이드, 믿음직한 오프로더, 그리고 시장가보다 20% 저렴한 가격.',
    ctaPrimary: '투어 예약',
    ctaSecondary: '투어 보기'
  },
  sections: {
    toursTitle: '인기 지프 투어',
    toursSubtitle: '알마티 지역에서 가장 아름다운 산악 명소로 가는 코스',
    fleetTitle: '보유 차량',
    fleetSubtitle: '산악 험로에서 검증된 오프로더',
    whyTitle: 'JEEP.ALATAU를 선택하는 이유',
    whySubtitle: '산을 더 가깝고, 안전하고, 잊지 못할 곳으로',
    bookingTitle: '온라인 예약',
    bookingSubtitle: '요청을 보내주시면 AI가 처리하여 코스를 준비합니다'
  },
  why: {
    items: [
      { title: '현지 전문 가이드', text: '운전 가이드가 모든 길과 각 명소의 이야기를 알고 있습니다.' },
      { title: '프리미엄 4x4 차량', text: 'Nissan Patrol, Land Cruiser Prado, Honda Pilot, Hyundai Santa Fe.' },
      { title: '7개 언어와 현지 통화', text: '웹사이트와 지원을 7개 언어로, 가격은 자동으로 사용자의 통화로 표시.' },
      { title: '합리적인 가격', text: '시장 평균보다 20% 저렴한 투명한 요금 — 숨은 비용 없음.' }
    ]
  },
  tags: {
    offroad: '오프로드',
    alpineLake: '고산 호수',
    canyon: '협곡',
    waterfall: '폭포',
    observatory: '천문대',
    petroglyphs: '암각화',
    picnic: '피크닉',
    photography: '포토 스톱',
    hotSprings: '온천',
    plateau: '고원',
    nomadCulture: '유목 문화'
  },
  tour: {
    from: '부터',
    perJeep: '지프 1대당',
    duration: '소요 시간',
    hours: '시간',
    distance: '경로',
    km: 'km',
    upToGuests: '최대 {n}명',
    difficulty: '난이도',
    difficultyLevels: { easy: '쉬움', moderate: '보통', hard: '어려움' },
    details: '자세히 보기',
    bookNow: '예약하기',
    includedTitle: '포함 사항',
    included: [
      '전문 운전 가이드',
      '연료 및 모든 도로 비용',
      '최신 4x4 차량',
      '식수 및 간식',
      '호텔 픽업 및 드롭오프',
      '사진 촬영 및 휴식 정차'
    ],
    bringTitle: '준비물',
    bring: [
      '편한 복장과 신발',
      '따뜻한 재킷(산악 날씨)',
      '자외선 차단제와 선글라스',
      '신분증 / 여권'
    ],
    backToTours: '← 모든 투어로'
  },
  fleet: {
    seats: '인승',
    drivetrain: '구동 방식',
    onMountainBg: '알마티 지역의 산을 배경으로'
  },
  booking: {
    name: '성함',
    phone: '전화 / WhatsApp',
    email: '이메일',
    tour: '투어 선택',
    vehicle: '선호 차량',
    anyVehicle: '아무 차량이나',
    date: '투어 날짜',
    guests: '인원수',
    message: '문의 또는 요청 사항',
    messagePlaceholder: '편한 언어로 작성하세요 — 요청을 자동으로 러시아어로 번역합니다.',
    submit: '요청 보내기',
    submitting: '전송 중…',
    successTitle: '요청이 접수되었습니다!',
    successText: '감사합니다! AI 어시스턴트가 요청을 처리했으며 곧 연락드리겠습니다.',
    errorTitle: '전송 오류',
    errorText: '요청을 보내지 못했습니다. 다시 시도하거나 WhatsApp으로 연락주세요.',
    aiNote: '요청은 AI가 처리합니다: 데이터를 구조화하고 팀을 위해 러시아어로 번역합니다.',
    paymentNote: '인터넷 뱅킹을 통한 온라인 결제가 곧 제공됩니다. 현재는 확정 시 결제합니다.',
    required: '필수 항목'
  },
  currency: {
    note: '가격은 변환일의 텡게 대비 평균 환율로 사용자의 통화로 자동 변환됩니다.',
    updated: '환율 업데이트',
    live: '실시간 환율',
    fallback: '대체 환율'
  },
  footer: {
    followUs: '소셜 미디어',
    contact: '문의',
    language: '언어',
    rights: '모든 권리 보유.',
    builtWith: '알마티 지역 산악 지프 투어'
  }
};

export default dict;
