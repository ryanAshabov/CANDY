export const ru = {
  common: {
    loading: 'Загрузка...',
    error: 'Произошла ошибка',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    view: 'Просмотр',
    search: 'Поиск',
    noResults: 'Результаты не найдены',
  },
  auth: {
    signIn: 'Войти',
    signUp: 'Регистрация',
    signOut: 'Выйти',
    email: 'Электронная почта',
    password: 'Пароль',
    confirmPassword: 'Подтверждение пароля',
    forgotPassword: 'Забыли пароль?',
    noAccount: 'Нет аккаунта?',
    hasAccount: 'Уже есть аккаунт?',
  },
  navigation: {
    dashboard: 'Панель управления',
    products: 'Товары',
    orders: 'Заказы',
    users: 'Пользователи',
    contentAI: 'Контент AI',
    analytics: 'Аналитика',
  },
  dashboard: {
    welcome: 'Добро пожаловать, {{name}}!',
    overview: 'Краткий обзор вашего магазина сладостей.',
    totalCandies: 'Всего сладостей',
    activePromotions: 'Активные акции',
    usersOnline: 'Пользователей онлайн',
    siteSettings: 'Настройки сайта',
  },
  products: {
    management: 'Управление товарами',
    subtitle: 'Управляйте запасами конфет и снеков.',
    addNew: 'Добавить новый товар',
    name: 'Название',
    price: 'Цена',
    inventory: 'Запас',
    category: 'Категория',
    description: 'Описание',
    imageUrl: 'URL изображения',
    stock: 'В наличии: {{count}} шт.',
  },
  orders: {
    management: 'Управление заказами',
    subtitle: 'Просмотр и управление входящими заказами клиентов.',
    orderNumber: 'Заказ №{{number}}',
    status: {
      pending: 'Ожидает',
      processing: 'Обрабатывается',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
      cancelled: 'Отменён',
    },
  },
  users: {
    management: 'Управление пользователями',
    subtitle: 'Просмотр и управление зарегистрированными владельцами магазинов и администраторами.',
    addNew: 'Добавить пользователя',
    lastLogin: 'Последний вход: {{date}}',
    role: {
      admin: 'Администратор',
      manager: 'Менеджер',
      staff: 'Сотрудник',
    },
  },
  contentAI: {
    title: 'Контент AI',
    subtitle: 'Создание маркетингового контента для вашего магазина сладостей',
    generate: 'Создать',
    post: 'Опубликовать',
    schedule: 'Запланировать',
    templates: 'Быстрые шаблоны',
    history: 'История контента',
    rating: {
      useful: 'Полезно',
      notRelevant: 'Не подходит',
      saveTemplate: 'Сохранить как шаблон',
      saved: 'Сохранено в шаблонах'
    },
    types: {
      social: 'Соцсети',
      whatsapp: 'WhatsApp',
      email: 'Email'
    },
    culturalTemplates: {
      seasonal: {
        title: 'Сезонные',
        templates: [
          'Новогодняя коллекция сладостей уже в продаже',
          'Подарочные наборы к 8 марта',
          'Летняя распродажа - скидки до 30%'
        ]
      },
      weekly: {
        title: 'Еженедельные',
        templates: [
          'Сладкая среда - скидка 15% на все шоколадные конфеты',
          'Выходные со вкусом - 2 по цене 1',
          'Счастливые часы: с 15 до 18 скидка 20%'
        ]
      }
    }
  },
  analytics: {
    title: 'Аналитика продаж',
    subtitle: 'Отслеживайте показатели продаж и анализируйте тренды.',
    export: 'Экспорт',
    timeRange: 'Период времени',
    metrics: {
      revenue: 'Общий доход',
      orders: 'Всего заказов',
      items: 'Продано товаров',
      customers: 'Новых клиентов',
    },
  },
};