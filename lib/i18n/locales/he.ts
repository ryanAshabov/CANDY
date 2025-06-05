export const he = {
  common: {
    loading: 'טוען...',
    error: 'אירעה שגיאה',
    save: 'שמור',
    cancel: 'ביטול',
    delete: 'מחק',
    edit: 'ערוך',
    view: 'צפה',
    search: 'חיפוש',
    noResults: 'לא נמצאו תוצאות',
  },
  auth: {
    signIn: 'התחברות',
    signUp: 'הרשמה',
    signOut: 'התנתקות',
    email: 'כתובת דואר אלקטרוני',
    password: 'סיסמה',
    confirmPassword: 'אימות סיסמה',
    forgotPassword: 'שכחת סיסמה?',
    noAccount: 'אין לך חשבון?',
    hasAccount: 'כבר יש לך חשבון?',
  },
  navigation: {
    dashboard: 'לוח בקרה',
    products: 'מוצרים',
    orders: 'הזמנות',
    users: 'משתמשים',
    contentAI: 'תוכן AI',
    analytics: 'אנליטיקה',
  },
  dashboard: {
    welcome: 'ברוך הבא, {{name}}!',
    overview: 'הנה סקירה מהירה של חנות הממתקים שלך.',
    totalCandies: 'סך הכל ממתקים',
    activePromotions: 'מבצעים פעילים',
    usersOnline: 'משתמשים מחוברים',
    siteSettings: 'הגדרות אתר',
  },
  products: {
    management: 'ניהול מוצרים',
    subtitle: 'נהל את המלאי של הממתקים והחטיפים שלך.',
    addNew: 'הוסף מוצר חדש',
    name: 'שם',
    price: 'מחיר',
    inventory: 'מלאי',
    category: 'קטגוריה',
    description: 'תיאור',
    imageUrl: 'כתובת תמונה',
    stock: 'מלאי: {{count}} יחידות',
  },
  orders: {
    management: 'ניהול הזמנות',
    subtitle: 'צפה ונהל את כל ההזמנות הנכנסות מלקוחות.',
    orderNumber: 'הזמנה מס׳ {{number}}',
    status: {
      pending: 'ממתין',
      processing: 'בטיפול',
      shipped: 'נשלח',
      delivered: 'נמסר',
      cancelled: 'בוטל',
    },
  },
  users: {
    management: 'ניהול משתמשים',
    subtitle: 'צפה ונהל בעלי חנויות ומנהלים רשומים.',
    addNew: 'הוסף משתמש',
    lastLogin: 'התחברות אחרונה: {{date}}',
    role: {
      admin: 'מנהל',
      manager: 'מנהל חנות',
      staff: 'צוות',
    },
  },
  contentAI: {
    title: 'תוכן AI',
    subtitle: 'יצירת תוכן שיווקי לחנות הממתקים שלך',
    generate: 'צור',
    post: 'פרסם עכשיו',
    schedule: 'תזמן פרסום',
    templates: 'תבניות מהירות',
    history: 'היסטוריית תוכן',
    rating: {
      useful: 'שימושי',
      notRelevant: 'לא רלוונטי',
      saveTemplate: 'שמור כתבנית',
      saved: 'נשמר בתבניות'
    },
    types: {
      social: 'חברתי',
      whatsapp: 'וואטסאפ',
      email: 'דואר אלקטרוני'
    },
    culturalTemplates: {
      holidays: {
        title: 'חגים',
        templates: [
          'מבצעי סוף החודש - הנחה של 20% על כל הממתקים',
          'חבילות מתוקים לראש השנה - הזמינו עכשיו',
          'מארזי שי לפורים - משלוח מנות מתוק'
        ]
      },
      shabbat: {
        title: 'שבת',
        templates: [
          'מארזי ממתקים לשבת - הזמינו עד יום חמישי',
          'חבילות שי מתוקות לאירוח שבת',
          'מבחר שוקולדים כשרים למהדרין'
        ]
      }
    }
  },
  analytics: {
    title: 'אנליטיקת מכירות',
    subtitle: 'עקוב אחר ביצועי מכירות ונתח מגמות.',
    export: 'ייצוא',
    timeRange: 'טווח זמן',
    metrics: {
      revenue: 'סך הכנסות',
      orders: 'סך הזמנות',
      items: 'פריטים שנמכרו',
      customers: 'לקוחות חדשים',
    },
  },
};