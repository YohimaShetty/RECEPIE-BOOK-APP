const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const isTest = process.env.NODE_ENV === 'test';
const dbPath = path.join(__dirname, '..', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    if (!isTest) console.error('Error opening database:', err.message);
  } else {
    if (!isTest) console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        if (!isTest) console.error('Error creating users table:', err.message);
      } else {
        if (!isTest) console.log('Users table ready');
      }
    });

    // Recipes table
    db.run(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        prep_time INTEGER,
        cook_time INTEGER,
        servings INTEGER,
        category TEXT,
        image_url TEXT,
        is_favorite INTEGER DEFAULT 0,
        rating INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) {
        if (!isTest) console.error('Error creating recipes table:', err.message);
      } else {
        if (!isTest) console.log('Recipes table ready');
      }
    });
  });
}

module.exports = db;
