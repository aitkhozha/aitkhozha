import type { Locale } from '@/i18n/locales';

export type TourTag =
  | 'offroad'
  | 'alpineLake'
  | 'canyon'
  | 'waterfall'
  | 'observatory'
  | 'petroglyphs'
  | 'picnic'
  | 'photography'
  | 'hotSprings'
  | 'plateau'
  | 'nomadCulture';

export type Tour = {
  slug: string;
  /** Base price per jeep (up to maxGuests), stored in KZT. */
  priceKzt: number;
  durationHours: number;
  distanceKm: number;
  maxGuests: number;
  difficulty: 'easy' | 'moderate' | 'hard';
  image: string;
  tags: TourTag[];
  /** Localised name and summary. */
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
};

export const tours: Tour[] = [
  {
    slug: 'big-almaty-lake',
    priceKzt: 55000,
    durationHours: 6,
    distanceKm: 90,
    maxGuests: 4,
    difficulty: 'easy',
    image: '/images/tours/big-almaty-lake.svg',
    tags: ['offroad', 'alpineLake', 'photography', 'picnic'],
    name: {
      ru: 'Большое Алматинское озеро',
      kk: 'Үлкен Алматы көлі',
      en: 'Big Almaty Lake',
      ko: '빅 알마티 호수',
      zh: '大阿拉木图湖',
      ms: 'Tasik Besar Almaty',
      ar: 'بحيرة ألماتي الكبرى'
    },
    summary: {
      ru: 'Бирюзовое высокогорное озеро на высоте 2511 м, серпантины и панорамы Заилийского Алатау.',
      kk: '2511 м биіктіктегі көгілдір таулы көл, серпантиндер мен Іле Алатауының панорамалары.',
      en: 'A turquoise alpine lake at 2,511 m with switchback roads and Trans-Ili Alatau panoramas.',
      ko: '해발 2,511m의 청록색 고산 호수와 굽이진 산길, 일레 알라타우 파노라마.',
      zh: '海拔2511米的绿松石色高山湖泊，盘山公路与外伊犁阿拉套全景。',
      ms: 'Tasik alpine pirus pada 2,511 m dengan jalan berliku dan panorama Trans-Ili Alatau.',
      ar: 'بحيرة جبلية فيروزية على ارتفاع 2511 م مع طرق متعرجة وإطلالات على جبال ترانس-إيلي ألاتاو.'
    }
  },
  {
    slug: 'charyn-canyon',
    priceKzt: 95000,
    durationHours: 12,
    distanceKm: 420,
    maxGuests: 4,
    difficulty: 'moderate',
    image: '/images/tours/charyn-canyon.svg',
    tags: ['offroad', 'canyon', 'photography', 'picnic'],
    name: {
      ru: 'Чарынский каньон',
      kk: 'Шарын шатқалы',
      en: 'Charyn Canyon',
      ko: '차린 협곡',
      zh: '恰伦大峡谷',
      ms: 'Ngarai Charyn',
      ar: 'وادي تشارين'
    },
    summary: {
      ru: '«Долина замков» — 12-километровый каньон возрастом 12 млн лет на реке Чарын.',
      kk: '«Құлыптар алқабы» — Шарын өзеніндегі 12 млн жылдық, 12 шақырымдық шатқал.',
      en: 'The "Valley of Castles" — a 12 km, 12-million-year-old canyon on the Charyn River.',
      ko: '차린 강의 1,200만 년 된 12km "성의 계곡" 협곡.',
      zh: '“城堡谷”——恰伦河畔长12公里、有1200万年历史的峡谷。',
      ms: '"Lembah Istana" — ngarai sepanjang 12 km berusia 12 juta tahun di Sungai Charyn.',
      ar: '«وادي القلاع» — وادٍ بطول 12 كم وعمر 12 مليون سنة على نهر تشارين.'
    }
  },
  {
    slug: 'kolsai-kaindy-lakes',
    priceKzt: 240000,
    durationHours: 30,
    distanceKm: 660,
    maxGuests: 4,
    difficulty: 'moderate',
    image: '/images/tours/kolsai-kaindy.svg',
    tags: ['offroad', 'alpineLake', 'waterfall', 'photography', 'nomadCulture'],
    name: {
      ru: 'Кольсайские озёра и Каинды',
      kk: 'Көлсай көлдері мен Қайыңды',
      en: 'Kolsai & Kaindy Lakes',
      ko: '콜사이 & 카인디 호수',
      zh: '科尔赛湖与卡因迪湖',
      ms: 'Tasik Kolsai & Kaindy',
      ar: 'بحيرتا كولساي وكايندي'
    },
    summary: {
      ru: '2-дневный тур к «жемчужинам Северного Тянь-Шаня» и затопленному лесу озера Каинды.',
      kk: 'Солтүстік Тянь-Шаньның «інжу-маржандарына» және Қайыңды көліне 2 күндік тур.',
      en: 'A 2-day trip to the "pearls of the Northern Tian Shan" and the sunken forest of Lake Kaindy.',
      ko: '북부 톈산의 "진주"와 카인디 호수의 수몰 숲을 찾아가는 2일 투어.',
      zh: '前往北天山“明珠”和卡因迪湖水下森林的两日游。',
      ms: 'Lawatan 2 hari ke "permata Tian Shan Utara" dan hutan tenggelam Tasik Kaindy.',
      ar: 'رحلة لمدة يومين إلى «لآلئ تيان شان الشمالية» والغابة الغارقة في بحيرة كايندي.'
    }
  },
  {
    slug: 'assy-plateau',
    priceKzt: 110000,
    durationHours: 10,
    distanceKm: 240,
    maxGuests: 4,
    difficulty: 'moderate',
    image: '/images/tours/assy-plateau.svg',
    tags: ['offroad', 'plateau', 'observatory', 'photography', 'nomadCulture'],
    name: {
      ru: 'Плато Ассы и обсерватория',
      kk: 'Асы үстірті және обсерватория',
      en: 'Assy Plateau & Observatory',
      ko: '아시 고원 & 천문대',
      zh: '阿瑟高原与天文台',
      ms: 'Dataran Tinggi Assy & Balai Cerap',
      ar: 'هضبة آسي والمرصد الفلكي'
    },
    summary: {
      ru: 'Высокогорное плато (2600 м), летние джайляу и Ассы-Тургенская обсерватория.',
      kk: 'Биік таулы үстірт (2600 м), жазғы жайлаулар және Асы-Түрген обсерваториясы.',
      en: 'A high-mountain plateau (2,600 m), summer pastures and the Assy-Turgen observatory.',
      ko: '고산 고원(2,600m), 여름 목초지, 아시-투르겐 천문대.',
      zh: '高山高原（2600米）、夏季牧场和阿瑟-图尔根天文台。',
      ms: 'Dataran tinggi gunung (2,600 m), padang ragut musim panas dan balai cerap Assy-Turgen.',
      ar: 'هضبة جبلية عالية (2600 م) ومراعٍ صيفية ومرصد آسي-تورغن.'
    }
  },
  {
    slug: 'turgen-gorge',
    priceKzt: 75000,
    durationHours: 8,
    distanceKm: 180,
    maxGuests: 4,
    difficulty: 'easy',
    image: '/images/tours/turgen-gorge.svg',
    tags: ['offroad', 'waterfall', 'picnic', 'hotSprings'],
    name: {
      ru: 'Тургенское ущелье и водопады',
      kk: 'Түрген шатқалы және сарқырамалар',
      en: 'Turgen Gorge & Waterfalls',
      ko: '투르겐 협곡 & 폭포',
      zh: '图尔根峡谷与瀑布',
      ms: 'Gaung Turgen & Air Terjun',
      ar: 'مضيق تورغن والشلالات'
    },
    summary: {
      ru: 'Каскад водопадов «Медвежий», форелевые хозяйства и термальные источники.',
      kk: '«Аю» сарқырамалар каскады, бахтақ шаруашылықтары және термалды бұлақтар.',
      en: 'The "Bear" waterfall cascade, trout farms and thermal springs.',
      ko: '"곰" 폭포 캐스케이드, 송어 양식장, 온천.',
      zh: '“熊”瀑布群、鳟鱼养殖场和温泉。',
      ms: 'Lata air terjun "Beruang", ladang ikan trout dan mata air terma.',
      ar: 'سلسلة شلالات «الدب»، ومزارع سمك السلمون المرقط، والينابيع الحارة.'
    }
  },
  {
    slug: 'tamgaly-tas',
    priceKzt: 70000,
    durationHours: 9,
    distanceKm: 320,
    maxGuests: 4,
    difficulty: 'easy',
    image: '/images/tours/tamgaly-tas.svg',
    tags: ['offroad', 'petroglyphs', 'photography', 'picnic'],
    name: {
      ru: 'Тамгалы-Тас на реке Или',
      kk: 'Іле өзеніндегі Тамғалы-Тас',
      en: 'Tamgaly-Tas on the Ili River',
      ko: '일리 강의 탐갈리-타스',
      zh: '伊犁河畔的塔姆加雷-塔斯',
      ms: 'Tamgaly-Tas di Sungai Ili',
      ar: 'تامغالي-تاس على نهر إيلي'
    },
    summary: {
      ru: 'Буддийские наскальные изображения и петроглифы на живописном берегу реки Или.',
      kk: 'Іле өзенінің көркем жағасындағы буддалық таңбалар мен петроглифтер.',
      en: 'Buddhist rock images and petroglyphs on the scenic bank of the Ili River.',
      ko: '일리 강의 경치 좋은 강변에 있는 불교 암각화와 암각 문양.',
      zh: '伊犁河风景秀丽河岸上的佛教岩刻与岩画。',
      ms: 'Imej batu Buddha dan petroglif di tebing indah Sungai Ili.',
      ar: 'نقوش صخرية بوذية ورسوم بدائية على ضفة نهر إيلي الخلابة.'
    }
  }
];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);
