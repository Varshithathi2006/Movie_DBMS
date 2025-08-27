# Bingibo - Intelligent Movie Database Application

A modern, AI-powered movie database application built with React, TypeScript, and Node.js. Discover movies, explore actors and directors, and get intelligent recommendations through our AI chatbot.

## 🎬 Features

- **Movie Discovery**: Browse thousands of movies with advanced filtering
- **Person Profiles**: Explore actors, directors, and crew members
- **AI Chatbot**: Get intelligent movie recommendations and information
- **User Authentication**: Secure login and registration system
- **Reviews & Ratings**: Rate movies and read community reviews
- **Analytics Dashboard**: View movie statistics and trends
- **Mobile Responsive**: Beautiful design that works on all devices
- **Real-time Search**: Search movies, actors, and directors instantly

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Context API** for state management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MySQL** database
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Bingibo-App/project
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Database Setup
1. Create a MySQL database named `movie_app`
2. Import the schema from `server/sql/schema.sql`
3. Optionally seed with sample data from `server/sql/seed.sql`

### 4. Environment Configuration
Create a `.env` file in the `server` directory:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=movie_app
PORT=4000
```

### 5. Start the Application
```bash
# Start the backend server (from server directory)
cd server
npm run dev

# Start the frontend (from project root)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

## 🎯 Usage

### For Users
1. **Browse Movies**: Visit the homepage to see featured movies
2. **Search**: Use the search bar to find specific movies or people
3. **Filter**: Apply filters by genre, year, rating, or box office
4. **AI Assistant**: Click the chat icon for movie recommendations
5. **Create Account**: Sign up to rate movies and write reviews

### For Developers
1. **API Endpoints**: All API routes are prefixed with `/api`
2. **Database**: Use the provided SQL scripts for setup
3. **Environment**: Configure database connection in `.env`
4. **Development**: Use `npm run dev` for hot reloading

## 📁 Project Structure

```
project/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   ├── types/         # TypeScript type definitions
│   └── data/          # Mock data and utilities
├── server/
│   ├── src/
│   │   ├── routes/    # API route handlers
│   │   ├── scripts/   # Database seeding scripts
│   │   └── sql/       # Database schema and seed data
│   └── package.json
└── package.json
```

## 🔧 API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create new movie

### People
- `GET /api/people` - Get all people
- `GET /api/people/:id` - Get person by ID

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## 🎨 Design Features

- **Dark Theme**: Modern dark UI with purple and cyan accents
- **Glassmorphism**: Beautiful backdrop blur effects
- **Gradients**: Smooth gradient transitions throughout
- **Animations**: Hover effects and smooth transitions
- **Responsive**: Mobile-first design approach

## 🤖 AI Features

The Bingibo AI assistant can help with:
- Movie recommendations based on preferences
- Information about actors and directors
- Box office statistics
- Genre-based suggestions
- Recent movie releases

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend (Railway/Heroku)
1. Set up environment variables
2. Deploy the `server` directory
3. Ensure database connection is configured

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository.

---

**Bingibo** - Your intelligent movie companion! 🎬✨
