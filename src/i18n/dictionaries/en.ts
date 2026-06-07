import type { Dictionary } from './ru';

const dict: Dictionary = {
  meta: {
    title: 'JEEP.ALATAU — jeep tours in the mountains of the Almaty region',
    description:
      'Jeep tours on premium 4x4s across the mountain locations of the Almaty region: Big Almaty Lake, Charyn, Kolsai, Assy Plateau. Expert guides, online booking, prices 20% below the market.'
  },
  nav: {
    home: 'Home',
    tours: 'Tours',
    fleet: 'Fleet',
    booking: 'Booking',
    businessPlan: 'Business plan',
    contact: 'Contact'
  },
  hero: {
    eyebrow: 'Jeep tours in the Almaty mountains',
    title: 'The mountains of the Almaty region on premium 4x4s',
    subtitle:
      'Signature jeep tours to the lakes, canyons and plateaus of the Trans-Ili Alatau. Expert guides, dependable off-roaders and prices 20% below the market.',
    ctaPrimary: 'Book a tour',
    ctaSecondary: 'Explore tours'
  },
  sections: {
    toursTitle: 'Popular jeep tours',
    toursSubtitle: 'Routes to the most beautiful mountain locations of the Almaty region',
    fleetTitle: 'Our fleet',
    fleetSubtitle: 'Off-roaders proven on mountain trails',
    whyTitle: 'Why JEEP.ALATAU',
    whySubtitle: 'Making the mountains accessible, safe and unforgettable',
    bookingTitle: 'Online booking',
    bookingSubtitle: 'Send a request — our AI will process it and prepare your route'
  },
  why: {
    items: [
      { title: 'Local expert guides', text: 'Our driver-guides know every trail and the story behind each location.' },
      { title: 'Premium 4x4 fleet', text: 'Nissan Patrol, Land Cruiser Prado, Honda Pilot and Hyundai Santa Fe.' },
      { title: '7 languages & your currency', text: 'Website and support in 7 languages, prices auto-shown in your currency.' },
      { title: 'Fair pricing', text: 'Transparent rates 20% below the market average — no hidden fees.' }
    ]
  },
  tags: {
    offroad: 'Off-road',
    alpineLake: 'Alpine lake',
    canyon: 'Canyon',
    waterfall: 'Waterfalls',
    observatory: 'Observatory',
    petroglyphs: 'Petroglyphs',
    picnic: 'Picnic',
    photography: 'Photo stops',
    hotSprings: 'Thermal springs',
    plateau: 'Plateau',
    nomadCulture: 'Nomad culture'
  },
  tour: {
    from: 'from',
    perJeep: 'per jeep',
    duration: 'Duration',
    hours: 'h',
    distance: 'Route',
    km: 'km',
    upToGuests: 'up to {n} guests',
    difficulty: 'Difficulty',
    difficultyLevels: { easy: 'Easy', moderate: 'Moderate', hard: 'Hard' },
    details: 'Details',
    bookNow: 'Book now',
    includedTitle: "What's included",
    included: [
      'Professional driver-guide',
      'Fuel and all road fees',
      'Modern 4x4 vehicle',
      'Drinking water & snacks',
      'Hotel pickup & drop-off',
      'Photo & rest stops'
    ],
    bringTitle: 'What to bring',
    bring: [
      'Comfortable clothes & shoes',
      'Warm jacket (mountain weather)',
      'Sunscreen & sunglasses',
      'ID / passport'
    ],
    backToTours: '← Back to all tours'
  },
  fleet: {
    seats: 'seats',
    drivetrain: 'Drivetrain',
    onMountainBg: 'against the mountains of the Almaty region'
  },
  booking: {
    name: 'Your name',
    phone: 'Phone / WhatsApp',
    email: 'Email',
    tour: 'Choose a tour',
    vehicle: 'Preferred vehicle',
    anyVehicle: 'Any available',
    date: 'Tour date',
    guests: 'Number of guests',
    message: 'Comments or requests',
    messagePlaceholder: 'Write in any language you like — we will automatically translate your request into Russian.',
    submit: 'Send request',
    submitting: 'Sending…',
    successTitle: 'Request received!',
    successText: 'Thank you! Our AI assistant has processed your request and we will contact you shortly.',
    errorTitle: 'Submission error',
    errorText: 'We could not send your request. Please try again or message us on WhatsApp.',
    aiNote: 'Requests are processed by AI: the data is structured and translated into Russian for our team.',
    paymentNote: 'Online payment via internet banking is coming soon. For now, payment is on confirmation.',
    required: 'Required field'
  },
  currency: {
    note: 'Prices are automatically converted into your currency at the average rate against the tenge on the day of conversion.',
    updated: 'Rate updated',
    live: 'live rate',
    fallback: 'fallback rate'
  },
  footer: {
    followUs: 'Follow us',
    contact: 'Contact',
    language: 'Language',
    rights: 'All rights reserved.',
    builtWith: 'Jeep tours across the mountains of the Almaty region'
  }
};

export default dict;
