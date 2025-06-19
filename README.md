# 🌤️ Local Weather Dashboard

A modern, production-ready weather dashboard built with **AWS Cloudscape Design System** that provides real-time weather information for any US location via ZIP code.

![Weather Dashboard](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![AWS Cloudscape](https://img.shields.io/badge/AWS-Cloudscape-orange)

## ✨ Features

- **🎯 Location-based weather**: Enter any US ZIP code to get current conditions
- **🌡️ Comprehensive data**: Temperature, humidity, wind, pressure, visibility, and more
- **🌅 Sun times**: Sunrise and sunset information
- **📱 Responsive design**: Works perfectly on desktop, tablet, and mobile
- **🎨 AWS Cloudscape UI**: Professional, accessible design system
- **⚡ Real-time updates**: Fresh weather data with refresh capability
- **🔄 Smart caching**: Optimized API calls with intelligent caching
- **🛡️ Error handling**: Graceful error handling and user feedback
- **♿ Accessibility**: Built with accessibility best practices
- **🌙 Dark mode**: Automatic dark mode support

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd weather-dashboard
npm install
```

### 2. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate your API key (free tier includes 1,000 calls/day)

### 3. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 4. Run the Application

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run typecheck    # Run TypeScript type checking
npm run test         # Run tests
npm run format.fix   # Format code with Prettier
```

### Project Structure

```
src/
├── components/           # React components
│   ├── LocationInput.tsx    # ZIP code input component
│   ├── WeatherDisplay.tsx   # Weather data display
│   └── ui/                  # Base UI components
├── pages/               # Route components
│   ├── WeatherDashboard.tsx # Main dashboard page
│   └── NotFound.tsx         # 404 page
├── lib/                 # Utility libraries
│   ├── weather.ts          # Weather API service
│   └── utils.ts            # General utilities
├── types/               # TypeScript type definitions
│   └── weather.ts          # Weather data types
├── hooks/               # Custom React hooks
└── App.tsx             # Main application component
```

## 🌍 API Information

This application uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data.

### Free Tier Limits

- **1,000 API calls per day**
- **60 calls per minute**
- Current weather data
- 5-day forecast (upgradeable)

### Demo Mode

When no API key is configured, the application runs in demo mode with sample weather data, allowing you to explore the interface without an API key.

## 🎨 Design System

Built with **AWS Cloudscape Design System** for:

- **Consistent UX**: Professional AWS-style interface
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first design
- **Theme support**: Light and dark modes
- **Internationalization**: Built-in i18n support

### Key Design Elements

- **Colors**: AWS-standard blue (#0073bb) primary theme
- **Typography**: Open Sans font family
- **Spacing**: Consistent 8px grid system
- **Components**: Form fields, buttons, containers, alerts
- **Icons**: Lucide React icon set

## 📦 Dependencies

### Core Framework

- **React 18.3.1**: Modern React with concurrent features
- **TypeScript 5.5.3**: Type safety and developer experience
- **Vite 6.2.2**: Lightning-fast build tool
- **React Router 6.26.2**: Client-side routing

### UI & Styling

- **@cloudscape-design/components**: AWS Cloudscape UI components
- **@cloudscape-design/global-styles**: Cloudscape design tokens
- **TailwindCSS 3.4.11**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons

### Data & State

- **@tanstack/react-query 5.56.2**: Server state management
- **React Hook Form 7.53.0**: Form management
- **Zod 3.23.8**: TypeScript-first schema validation

## 🔧 Configuration

### Environment Variables

```bash
# Required for real weather data
VITE_OPENWEATHER_API_KEY=your_api_key

# Optional: API endpoint override (defaults to OpenWeatherMap)
VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org
```

### Tailwind Configuration

The application extends Tailwind with Cloudscape design tokens:

```typescript
// Custom color palette
cloudscape: {
  blue: { 500: "#0073bb" },    // Primary
  green: { 500: "#037f0c" },   // Success
  red: { 500: "#d91515" },     // Error
  orange: { 500: "#ff9900" },  // Warning
}

// Typography scale
fontSize: {
  'cloudscape-body-s': ['12px', { lineHeight: '16px' }],
  'cloudscape-body-m': ['14px', { lineHeight: '20px' }],
  'cloudscape-heading-l': ['20px', { lineHeight: '28px', fontWeight: '700' }],
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory ready for deployment.

### Deployment Platforms

**Recommended platforms:**

- **Vercel**: Zero-config deployment with environment variables
- **Netlify**: Easy static site hosting
- **AWS S3 + CloudFront**: For AWS-native deployment
- **GitHub Pages**: Free hosting for open source projects

### Environment Setup for Production

1. Set `VITE_OPENWEATHER_API_KEY` in your deployment platform
2. Ensure all build dependencies are available
3. Configure any necessary redirects for client-side routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use AWS Cloudscape components when possible
- Maintain responsive design principles
- Write accessible code (ARIA labels, semantic HTML)
- Add tests for new functionality
- Update documentation for API changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [AWS Cloudscape](https://cloudscape.design/) for the design system
- [Lucide](https://lucide.dev/) for beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling

---

**Built with ❤️ using AWS Cloudscape Design System**
