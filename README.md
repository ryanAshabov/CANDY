# CANDY Store Management Dashboard

A beautiful, full-featured store management dashboard for candy retailers. Built with React Native, Expo, and Supabase.

![CANDY Dashboard](https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg)

## ✨ Features

### 📊 Analytics & Reporting
- Real-time sales tracking
- Revenue analytics
- Customer engagement metrics
- Performance trends visualization

### 🏪 Product Management
- Inventory tracking
- Product categorization
- Price management
- Stock alerts

### 📦 Order Management
- Real-time order tracking
- Order status updates
- Shipping integration
- Customer communication

### 🤖 Content AI
- AI-powered content generation
- Multi-language support
- Event-based campaigns
- Performance tracking
- Template management

### 👥 User Management
- Role-based access control
- User activity tracking
- Profile management
- Authentication

## 🛠 Technology Stack

- **Frontend Framework**: React Native + Expo
- **Navigation**: Expo Router
- **State Management**: React Context + Hooks
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Analytics**: React Native Chart Kit
- **UI Components**: Custom components
- **Icons**: Lucide React Native
- **Internationalization**: i18next
- **Type Safety**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/candy-store-management.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 📱 App Structure

```
app/
├── (app)/            # Protected routes
│   └── (tabs)/       # Main tab navigation
├── (auth)/           # Authentication routes
├── _layout.tsx       # Root layout
└── +not-found.tsx    # 404 page

components/
├── ui/               # Reusable UI components
└── AppHeader.tsx     # Global header component

lib/
├── i18n/             # Internationalization
└── supabase.ts       # Supabase client

hooks/                # Custom React hooks
contexts/             # React Context providers
constants/            # Global constants
types/                # TypeScript types
```

## 🌍 Internationalization

Supported languages:
- English (en)
- Arabic (ar)
- Hebrew (he)
- Russian (ru)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@candystore.com or join our Slack channel.