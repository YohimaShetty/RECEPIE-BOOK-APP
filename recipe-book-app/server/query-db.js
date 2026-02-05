const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
  console.log('\n=== TABLES ===');
  tables.forEach(t => console.log('  -', t.name));
  
  db.get("SELECT COUNT(*) as count FROM users;", (err, row) => {
    console.log('\n=== USERS ===');
    console.log('Total users:', row?.count || 0);
    if(row?.count > 0) {
      db.all("SELECT id, email, name FROM users;", (err, rows) => {
        if(rows && rows.length > 0) {
          console.log('Users:');
          rows.forEach(r => console.log('  - Email:', r.email, 'Name:', r.name));
        }
        
        db.get("SELECT COUNT(*) as count FROM recipes;", (err, row) => {
          console.log('\n=== RECIPES ===');
          console.log('Total recipes:', row?.count || 0);
          if(row?.count > 0) {
            db.all("SELECT id, title, description FROM recipes;", (err, rows) => {
              if(rows && rows.length > 0) {
                console.log('Recipes:');
                rows.forEach(r => console.log('  - Title:', r.title, 'Description:', r.description?.substring(0, 40) + '...'));
              }
              db.close();
            });
          } else {
            db.close();
          }
        });
      });
    } else {
      db.close();
    }
  });
});
