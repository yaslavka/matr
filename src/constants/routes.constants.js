const r = Object.freeze({
  // Public routes
  root: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  resetPassword: '/reset-password',

  // Private routes
  dashboard: '/dashboard',
  leader: '/leader',
  news: '/news',
  newsItem: '/news/:id',
  aboutUs: '/about-us',
  tables: '/MATRIX',
  premiumStars: '/MATRIX2',
  superStars: '/MATRIX3',
  personalPremiumTable: '/MATRIX2-table/:type',
  premiumTable: '/MATRIX2-table/:id',
  personalTable: '/MATRIX-table/:type',
  personalTableQueue: '/personal-table/:type/queue',
  table: '/table/:id',
  tableQueue: '/table/:type/queue',
  personalSSTable: '/MATRIX3-table/:type',
  ssTable: '/MATRIX3-table/:id',
  exchange: '/exchange',
  starTrek: '/startrek',
  starTrekPlanets: '/startrek/planets',
  starTrekStatistic: '/startrek/statistic',
  starsUp: '/investbox',
  myinvestments: '/investbox/invests',
  investbox: '/investbox/history',
  casino: '/casino',
  rollet: '/casino/rollet',
  dice: '/casino/dice',
  fool: '/casino/fool',
  slots: '/casino/slots',
  starsUpPersonTable: '/starsup/person/:level',
  starsUpPersonTableQueue: '/starsup/person/:level/queue',
  starsUpPersonBonuses: '/starsup/bonuses',
  finances: '/finances',
  team: '/team',
  promo: '/promo',
  education: '/education',
  educationComment: '/education/create-comment',
  educationForm: '/education/send-request',
  chat: '/chat',
  reviews: '/reviews',
  settings: '/settings',
})

export default r
