# Recipe Book Application 🍽️

A full-stack web application to manage, share, and rate personal recipes. Built with React (frontend), Node.js + Express (backend) and SQLite (local DB).

---

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd recipe-book-app/recipe-book-app
   ```
2. Install backend dependencies:
   ```bash
   cd server && npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../client && npm install
   ```
4. Start backend (in one terminal):
   ```bash
   cd server
   npm run dev   # or `npm start`
   ```
5. Start frontend (in another terminal):
   ```bash
   cd client
   npm start
   ```

> Backend defaults to port **5000** and frontend to **5500**. Adjust `server/.env` if needed.

---

## ⌨️ Commands (run in terminal)

Note: commands assume you're at the repo root `recipe-book-app/recipe-book-app` unless stated otherwise. Use separate terminals for frontend and backend.

- Clone repo
  ```bash
  git clone <your-repo-url>
  cd recipe-book-app/recipe-book-app
  ```

- Install dependencies
  ```bash
  # Backend
  cd server && npm install
  # Frontend
  cd ../client && npm install
  ```

- Start servers
  ```bash
  # Backend (dev with nodemon)
  cd server && npm run dev
  # Backend (production)
  cd server && npm start

  # Frontend (create-react-app)
  cd client && npm start
  ```

- Run both (concurrently)
  ```bash
  # Install once: npm install -D concurrently
  npx concurrently "npm run dev --prefix server" "npm start --prefix client"
  ```

- Server tests (Jest)
  ```bash
  cd server
  npm test                          # run all server tests (NODE_ENV=test)
  npm test -- --testPathPattern=tests/unit         # run unit tests only
  npm test -- --testPathPattern=tests/integration  # run integration tests only
  npm test -- --coverage             # collect coverage
  npm test -- -t "test name"        # run tests matching name
  ```

- Client tests (React + Jest)
  ```bash
  cd client
  npm test                           # run interactive test runner
  CI=true npm test -- --coverage     # run once and collect coverage
  ```

- Cypress E2E
  ```bash
  # Open interactive runner
  cd client && npx cypress open
  # Run headless
  cd client && npx cypress run
  ```

- Restore `server/config/database.js` (if accidentally overwritten)
  ```bash
  # Restore from last commit
  git restore server/config/database.js
  # or for older git
  git checkout -- server/config/database.js
  ```

- Recreate DB (reset)
  ```bash
  # Remove local SQLite file and restart server
  rm server/database.sqlite  # use del on Windows PowerShell if needed
  # then start server to recreate and initialize DB
  cd server && npm start
  ```

---

## Features

- ✅ User Authentication (Register/Login with JWT)
- 🍳 Add, Edit, Delete Recipes
- 📝 Detailed recipe information (ingredients, instructions, prep time, etc.)
- ❤️ Favorite recipes
- ⭐ Rate your recipes
- 🔍 Search and filter by category
- 📱 Responsive design

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- SQLite3
- JWT Authentication
- Bcrypt for password hashing

## Project Structure

```
recipe-book-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context for state
│   │   ├── utils/         # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── routes/          # API routes
│   ├── server.js        # Entry point
│   └── package.json
│
└── README.md
```

## Installation & Setup

Follow these steps to get the application running on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Step 1: Open the Project in VS Code

1. Extract the zip file
2. Open VS Code
3. Go to `File > Open Folder`
4. Select the `recipe-book-app` folder

### Step 2: Install Backend Dependencies

1. Open the integrated terminal in VS Code (`Terminal > New Terminal` or Ctrl+`)
2. Navigate to the server folder:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Step 3: Install Frontend Dependencies

1. In the terminal, navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Step 4: Start the Backend Server

1. Open a NEW terminal (click the + button or `Terminal > New Terminal`)
2. Navigate to the server folder:
   ```bash
   cd server
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. You should see: "Server is running on port 5000" and "Connected to SQLite database"

### Step 5: Start the Frontend

1. Open ANOTHER NEW terminal
2. Navigate to the client folder:
   ```bash
   cd client
   ```
3. Start the React app:
   ```bash
   npm start
   ```
4. The app should automatically open in your browser at `http://localhost:5500`

## Using the Application

### 1. Register a New Account
- Click "Register here" on the login page
- Fill in your username, email, and password
- Click "Register"

### 2. Add Your First Recipe
- After logging in, click "Add Recipe" in the navbar
- Fill in the recipe details:
  - Title (required)
  - Description (optional)
  - Ingredients (required - add multiple)
  - Instructions (required)
  - Prep time, cook time, servings
  - Category
  - Image URL (you can use any image URL from the web)
- Click "Create Recipe"

### 3. Manage Your Recipes
- **View All Recipes**: Home page shows all your recipes
- **Search**: Use the search bar to find recipes by name
- **Filter**: Filter by category (Breakfast, Lunch, Dinner, etc.)
- **Favorite**: Click the heart icon to mark favorites
- **View Details**: Click "View Recipe" to see full details
- **Edit**: Click "Edit" to modify a recipe
- **Delete**: Click "Delete" to remove a recipe

### 4. Recipe Details Page
- See full recipe with all details
- View ingredients and instructions
- Toggle favorite status
- Edit or delete the recipe

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Recipes (All Protected)
- `GET /api/recipes` - Get all user recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `PATCH /api/recipes/:id/favorite` - Toggle favorite status

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed)
- created_at

### Recipes Table
- id (Primary Key)
- user_id (Foreign Key)
- title
- description
- ingredients (JSON array)
- instructions
- prep_time
- cook_time
- servings
- category
- image_url
- is_favorite (Boolean)
- rating (1-5)
- created_at
- updated_at

## Troubleshooting

### Port Already in Use
If you see "Port 5500 or 5000 already in use":
- Close any other applications using these ports
- Or change the port in `.env` file (server) or change React's default port

### Database Issues
If the database doesn't initialize:
- Delete `database.sqlite` file in the server folder
- Restart the server - it will recreate the database

### Cannot Connect to Server
Make sure:
1. Backend server is running on port 5000
2. Frontend is running on port 5500
3. Check for any error messages in the terminals

## 🗄️ Database notes & restoring `database.js`
If you accidentally replaced `server/config/database.js` (this file should manage SQLite connections and export `get`, `all`, `run` helpers), restore it from git:

```bash
# restore local changes from the last commit
git restore server/config/database.js
# or (older git versions)
git checkout -- server/config/database.js
```

If you prefer to manually recreate it, this is a minimal example you can use (save to `server/config/database.js`):

```js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '..', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('DB connection error', err);
  else console.log('Connected to SQLite database');
});

module.exports = {
  get: (sql, params = []) => new Promise((res, rej) => db.get(sql, params, (e, row) => e ? rej(e) : res(row))),
  all: (sql, params = []) => new Promise((res, rej) => db.all(sql, params, (e, rows) => e ? rej(e) : res(rows))),
  run: (sql, params = []) => new Promise((res, rej) => db.run(sql, params, function (e) { e ? rej(e) : res({ id: this.lastID }); }))
};

---

## 🔧 Useful npm scripts
- Backend: `npm start`, `npm run dev` (nodemon), `npm test`
- Frontend: `npm start`, `npm test`, `npm run build`
- E2E: `npx cypress open` / `npx cypress run`

## Future Enhancements

Ideas for extending this project:
- Add recipe images upload functionality
- Share recipes with other users
- Recipe tags and advanced search
- Meal planning calendar
- Shopping list generator
- Print recipe feature
- Import recipes from URLs
- Recipe comments and notes

## License

This project is open source and available for learning purposes.

## Support

If you encounter any issues:
1. Check the console for error messages
2. Make sure all dependencies are installed
3. Verify both servers are running
4. Check that ports 5500 and 5000 are available
