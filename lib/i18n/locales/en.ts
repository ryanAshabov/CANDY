export const en = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    search: 'Search',
    noResults: 'No results found',
    back: 'Back',
    continue: 'Continue',
  },
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account?',
    hasAccount: 'Already have an account?',
  },
  navigation: {
    dashboard: 'Dashboard',
    products: 'Products',
    orders: 'Orders',
    users: 'Users',
    contentAI: 'Content AI',
    analytics: 'Analytics',
  },
  dashboard: {
    welcome: 'Welcome, {{name}}!',
    overview: 'Here\'s a quick overview of your CANDY store.',
    totalCandies: 'Total Candies',
    activePromotions: 'Active Promotions',
    usersOnline: 'Users Online',
    siteSettings: 'Site Settings',
  },
  products: {
    management: 'Product Management',
    subtitle: 'Manage your inventory of candies and snacks.',
    addNew: 'Add New Product',
    name: 'Name',
    price: 'Price',
    inventory: 'Inventory',
    category: 'Category',
    description: 'Description',
    imageUrl: 'Image URL',
    stock: 'Stock: {{count}} units',
  },
  orders: {
    management: 'Orders Management',
    subtitle: 'View and manage all incoming orders from customers.',
    orderNumber: 'Order #{{number}}',
    status: {
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    },
  },
  users: {
    management: 'Users Management',
    subtitle: 'View and manage registered store owners and administrators.',
    addNew: 'Add User',
    lastLogin: 'Last login: {{date}}',
    role: {
      admin: 'Admin',
      manager: 'Manager',
      staff: 'Staff',
    },
  },
  contentAI: {
    title: 'Content AI',
    subtitle: 'Generate marketing content for your candy store.',
    generate: 'Generate',
    post: 'Post Now',
    schedule: 'Schedule Post',
    templates: 'Quick Templates',
    history: 'Content History',
    rating: {
      useful: 'Useful',
      notRelevant: 'Not Relevant',
      saveTemplate: 'Save as Template',
      saved: 'Saved to Templates'
    },
    types: {
      social: 'Social',
      whatsapp: 'WhatsApp',
      email: 'Email'
    },
    upcomingEvents: 'Upcoming Events',
    eventCalendarSubtitle: 'Plan your content for these upcoming events',
    daysUntil: 'days until',
    regions: 'regions',
    eventTypes: {
      cultural: 'Cultural',
      seasonal: 'Seasonal',
      holiday: 'Holiday'
    },
    campaign: {
      create: 'Create Campaign',
      title: 'Campaign Builder',
      subtitle: 'Create a targeted marketing campaign for your upcoming events',
      selectEvent: 'Select Event',
      defineAudience: 'Define Audience',
      createContent: 'Create Content',
      schedule: 'Schedule',
      eventDetails: 'Event Details',
      eventName: 'Event Name',
      eventNamePlaceholder: 'Enter event name',
      startDate: 'Start Date',
      endDate: 'End Date',
      targetAudience: 'Target Audience',
      selectRegions: 'Select target regions for your campaign'
    },
    culturalTemplates: {
      seasonal: {
        title: 'Seasonal',
        templates: [
          'Summer vacation special: Buy 2 Get 1 Free on all chocolate bars!',
          'Back to School candy pack - perfect for lunchboxes',
          'Holiday season gift boxes now available'
        ]
      },
      occasions: {
        title: 'Special Occasions',
        templates: [
          'Birthday party candy assortment',
          'Wedding favor custom candy boxes',
          'Corporate event sweet treats'
        ]
      }
    }
  },
  analytics: {
    title: 'Sales Analytics',
    subtitle: 'Track sales performance and visualize data trends.',
    export: 'Export',
    timeRange: 'Time Range',
    metrics: {
      revenue: 'Total Revenue',
      orders: 'Total Orders',
      items: 'Items Sold',
      customers: 'New Customers',
    },
  },
};