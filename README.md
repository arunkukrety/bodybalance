# BodyBalance - Weight Tracking Application

BodyBalance is a modern, responsive web application built with React and Tailwind CSS that helps users track their weight loss journey with interactive features and AI-powered insights.

![Dashboard Screenshot](src\assets\screenshots\dashboard.png)
_Dashboard showing weight trends, achievements, and daily statistics_

## 🌟 Features

### 1. Interactive Dashboard

- Real-time weight tracking visualization
- BMI calculation and categorization
- Achievement system with unlockable milestones
- Progress tracking towards target weight
- Responsive design for all devices

### 2. Weight Logging System

![Data Page Screenshot](src\assets\screenshots\weight.png)
_Data page with calendar integration and weight history_

- Calendar-based weight entry
- Historical data visualization
- Edit and delete entries
- Weight change tracking
- Sortable and filterable history table

### 3. AI Analysis Integration

![AI Analysis Screenshot](src\assets\screenshots\ai-analysis.png)
_AI-powered analysis page with chat interface_

- Powered by Groq LLM (llama-3.3-70b-versatile)
- Natural language weight trend analysis
- Personalized recommendations
- Interactive chat interface
- Context-aware responses based on user data

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Groq API key for AI features

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd my-react-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```properties
VITE_GROQ_API_KEY=your_groq_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## 🛠 Tech Stack

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Calendar**: React Calendar
- **AI Integration**: Groq SDK
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔐 Data Privacy

- All user data is stored locally using browser's localStorage
- No external data storage
- AI analysis is performed on-demand with user consent

## 🎯 Key Components

1. **Landing Page**

   - User onboarding
   - Initial data collection
   - Smooth animations

2. **Dashboard**

   - Current weight stats
   - Progress visualization
   - Achievement tracking
   - Activity sidebar

3. **Data Page**

   - Weight entry form
   - Historical data table
   - Calendar integration
   - Data management tools

4. **AI Analysis**
   - Chat interface
   - Weight trend analysis
   - Personalized insights
   - Real-time responses
