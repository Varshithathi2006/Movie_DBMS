# Bingibo Setup Guide

## Quick Start

Follow these steps to get Bingibo running on your machine:

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Database Setup

1. **Install MySQL** if you haven't already
2. **Create a database**:
   ```sql
   CREATE DATABASE movie_app;
   ```
3. **Import the schema**:
   ```bash
   cd server
   mysql -u root -p movie_app < sql/schema.sql
   ```
4. **Seed with sample data** (optional):
   ```bash
   mysql -u root -p movie_app < sql/seed.sql
   ```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=movie_app
PORT=4000
```

### 4. Start the Application

**Option 1: Start both frontend and backend together**
```bash
npm run dev:full
```

**Option 2: Start them separately**
```bash
# Terminal 1 - Start backend
npm run server

# Terminal 2 - Start frontend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check your database credentials in `.env`
- Verify the database `movie_app` exists

### Port Already in Use
- Change the port in `.env` file
- Kill processes using the ports: `lsof -ti:4000 | xargs kill -9`

### Missing Dependencies
- Run `npm install` in both root and server directories
- Clear node_modules and reinstall if needed

## Features to Test

1. **Browse Movies**: Visit homepage to see featured movies
2. **Search**: Use the search bar to find movies/people
3. **AI Chatbot**: Click the chat icon for recommendations
4. **User Registration**: Create an account to rate movies
5. **Movie Details**: Click on any movie to see full details
6. **Mobile Responsive**: Test on different screen sizes

## Development

- **Hot Reload**: Both frontend and backend support hot reloading
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting is configured
- **Tailwind**: Utility-first CSS framework

## Production Build

```bash
# Build frontend
npm run build

# The built files will be in the `dist` directory
```

---

**Bingibo** is now ready to use! 🎬✨
