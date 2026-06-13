import type { Locale } from '@/i18n/locales';

export type Vehicle = {
  slug: string;
  name: string; // brand/model — not translated
  generation: Record<Locale, string>; // body / generation label
  seats: number;
  drivetrain: string;
  image: string;
  blurb: Record<Locale, string>;
};

export const vehicles: Vehicle[] = [
  {
    slug: 'nissan-patrol-y61',
    name: 'Nissan Patrol Y61',
    generation: {
      ru: '61 кузов',
      kk: '61 шанақ',
      en: 'Y61 body',
      ko: 'Y61 바디',
      zh: 'Y61 车身',
      ms: 'badan Y61',
      ar: 'هيكل Y61'
    },
    seats: 5,
    drivetrain: '4WD • TD42 / ZD30',
    image: '/images/fleet/nissan-patrol-y61.svg',
    blurb: {
      ru: 'Легендарный рамный внедорожник с блокировками — эталон надёжности на горном бездорожье.',
      kk: 'Блокировкалары бар аңызға айналған рамалы внедорожник — таулы жолсыздықтағы сенімділік эталоны.',
      en: 'A legendary body-on-frame 4x4 with diff locks — the benchmark for reliable mountain off-roading.',
      ko: '디퍼렌셜 잠금장치를 갖춘 전설적인 프레임 바디 4x4 — 산악 오프로드 신뢰성의 기준.',
      zh: '配备差速锁的传奇非承载式车身四驱——山地越野可靠性的标杆。',
      ms: 'Pacuan 4x4 berbingkai legenda dengan kunci gardan — penanda aras pemanduan luar jalan gunung.',
      ar: 'سيارة دفع رباعي أسطورية بهيكل منفصل وأقفال تفاضلية — معيار الموثوقية في الطرق الجبلية الوعرة.'
    }
  },
  {
    slug: 'toyota-land-cruiser-prado-150',
    name: 'Toyota Land Cruiser Prado 150',
    generation: {
      ru: '150 кузов',
      kk: '150 шанақ',
      en: '150 body',
      ko: '150 바디',
      zh: '150 车身',
      ms: 'badan 150',
      ar: 'هيكل 150'
    },
    seats: 7,
    drivetrain: 'Full-time 4WD',
    image: '/images/fleet/toyota-prado-150.svg',
    blurb: {
      ru: 'Комфорт и проходимость в одном: 7 мест, полный привод и репутация «неубиваемого» Prado.',
      kk: 'Жайлылық пен өткіштік біріккен: 7 орын, толық жетек және «мызғымас» Prado беделі.',
      en: 'Comfort and capability combined: 7 seats, full-time AWD and the unbreakable Prado reputation.',
      ko: '편안함과 험로 주파력의 조화: 7인승, 상시 4륜구동, 견고한 프라도의 명성.',
      zh: '舒适与通过性兼备：7座、全时四驱以及“开不坏”的普拉多口碑。',
      ms: 'Keselesaan dan keupayaan bergabung: 7 tempat duduk, AWD sepenuh masa dan reputasi Prado yang kukuh.',
      ar: 'راحة وقدرة معاً: 7 مقاعد ودفع رباعي دائم وسمعة برادو التي لا تُقهر.'
    }
  },
  {
    slug: 'honda-pilot',
    name: 'Honda Pilot',
    generation: {
      ru: 'последний кузов',
      kk: 'соңғы шанақ',
      en: 'latest body',
      ko: '최신 바디',
      zh: '最新车身',
      ms: 'badan terkini',
      ar: 'أحدث هيكل'
    },
    seats: 8,
    drivetrain: 'i-VTM4 AWD',
    image: '/images/fleet/honda-pilot.svg',
    blurb: {
      ru: 'Просторный 8-местный SUV для семей и групп — мягкий ход на длинных трассах к каньонам.',
      kk: 'Отбасылар мен топтарға арналған кең 8 орынды SUV — шатқалдарға дейінгі ұзақ жолда жұмсақ жүріс.',
      en: 'A spacious 8-seat SUV for families and groups — smooth on the long runs out to the canyons.',
      ko: '가족과 단체를 위한 넓은 8인승 SUV — 협곡까지의 장거리 주행이 부드럽습니다.',
      zh: '宽敞的8座SUV，适合家庭和团体——前往峡谷的长途行驶平稳舒适。',
      ms: 'SUV 8 tempat duduk yang luas untuk keluarga dan kumpulan — lancar dalam perjalanan jauh ke ngarai.',
      ar: 'سيارة دفع رباعي واسعة بـ 8 مقاعد للعائلات والمجموعات — انسيابية في الرحلات الطويلة نحو الوديان.'
    }
  },
  {
    slug: 'hyundai-santa-fe',
    name: 'Hyundai Santa Fe',
    generation: {
      ru: 'последний кузов',
      kk: 'соңғы шанақ',
      en: 'latest body',
      ko: '최신 바디',
      zh: '最新车身',
      ms: 'badan terkini',
      ar: 'أحدث هيكل'
    },
    seats: 7,
    drivetrain: 'HTRAC AWD',
    image: '/images/fleet/hyundai-santa-fe.svg',
    blurb: {
      ru: 'Современный кроссовер с HTRAC: тихий салон и панорамные виды по дороге к озёрам.',
      kk: 'HTRAC жүйелі заманауи кроссовер: тыныш салон және көлдерге апарар жолдағы панорамалар.',
      en: 'A modern HTRAC crossover: a quiet cabin and panoramic views on the road to the lakes.',
      ko: 'HTRAC를 갖춘 현대적인 크로스오버: 조용한 실내와 호수로 가는 길의 파노라마 전망.',
      zh: '搭载HTRAC的现代跨界车：安静的车厢和通往湖泊途中的全景视野。',
      ms: 'Crossover HTRAC moden: kabin yang senyap dan pemandangan panoramik di jalan ke tasik.',
      ar: 'سيارة كروس أوفر حديثة بنظام HTRAC: مقصورة هادئة وإطلالات بانورامية في الطريق إلى البحيرات.'
    }
  }
];

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug);
