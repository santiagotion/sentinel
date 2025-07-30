# 🛡️ SENTINEL - Congo Monitoring System

A sophisticated intelligence monitoring dashboard for the Democratic Republic of Congo, built with React, TypeScript, and modern web technologies.

## 🚀 Features

- **Real-time Dashboard** - Live monitoring of keywords, sentiment, and activity
- **Advanced Analytics** - Comprehensive charts and data visualization
- **Network Analysis** - Influence mapping and community detection
- **Geographic Intelligence** - Province-level mapping and analysis
- **AI-Powered Insights** - Machine learning predictions and anomaly detection
- **Source Management** - Credibility scoring and platform comparison
- **Alert System** - Real-time notifications and priority management
- **Interactive Maps** - Mapbox integration for geographic visualization

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar)
│   ├── screens/         # Main screen components
│   │   ├── OverviewScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── KeywordsScreen.tsx
│   │   ├── AnalyticsScreen.tsx
│   │   ├── NetworkScreen.tsx
│   │   ├── GeographicScreen.tsx
│   │   ├── IntelligenceScreen.tsx
│   │   ├── SourcesScreen.tsx
│   │   └── AlertsScreen.tsx
│   └── ui/              # Reusable UI components
├── data/                # Mock data and constants
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── styles/              # Custom CSS and animations
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```bash
   # Optional: Mapbox API key for geographic features
   VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### 🗺️ Mapbox Setup (Optional)

For geographic mapping features:

1. Sign up for a free Mapbox account: [https://account.mapbox.com/auth/signup/](https://account.mapbox.com/auth/signup/)
2. Get your access token from the dashboard
3. Add it to your `.env` file or configure it in the app's geographic screen

## 📜 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint
- **`npm run type-check`** - Run TypeScript type checking

## 🎨 Tech Stack

- **Frontend:** React 18, TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Maps:** Mapbox GL JS
- **Build Tool:** Vite
- **Package Manager:** npm

## 🔧 Development

### Component Architecture

Each screen component is self-contained with its own:
- TypeScript interfaces
- Mock data
- State management
- Utility functions

### Adding New Features

1. Create components in appropriate directories
2. Add TypeScript types to `src/types/index.ts`
3. Create utility functions in `src/utils/`
4. Add mock data to `src/data/`

## 📊 Dashboard Screens

1. **Overview** - Executive dashboard with key metrics
2. **Search** - Advanced search with filtering capabilities
3. **Keywords** - Keyword monitoring and trend analysis
4. **Analytics** - Deep dive analytics and reporting
5. **Network** - Social network analysis and influence mapping
6. **Geographic** - Province-level geographic intelligence
7. **Intelligence** - AI-powered predictions and insights
8. **Sources** - Source credibility and performance tracking
9. **Alerts** - Real-time alert management system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for intelligence monitoring purposes.

## 🆘 Support

For support and questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for Congo intelligence monitoring**