# Step-by-Step Setup Guide for VS Code

Follow these instructions carefully to set up and run the Recipe Book application.

## Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js installed (check with `node --version` in terminal)
- ✅ VS Code installed
- ✅ Internet connection for downloading packages

If you don't have Node.js:
1. Go to https://nodejs.org/
2. Download the LTS version
3. Install it
4. Restart your computer

---

## Step 1: Extract and Open Project

1. Extract the `recipe-book-app.zip` file to a location you can easily find (like Desktop or Documents)
2. Open VS Code
3. Click `File` → `Open Folder`
4. Navigate to and select the `recipe-book-app` folder
5. Click `Select Folder`

---

## Step 2: Open Integrated Terminal

1. In VS Code, go to the top menu
2. Click `Terminal` → `New Terminal` (or press Ctrl + ` )
3. A terminal panel should appear at the bottom of VS Code

---

## Step 3: Install Backend (Server) Dependencies

In the terminal, type these commands one by one:

```bash
cd server
```
Press Enter. You should see your path change to include "server".

```bash
npm install
```
Press Enter. This will take 1-2 minutes. You'll see a progress bar and many package names. Wait until it completes and you see the command prompt again.

**Expected output:** You should see something like "added X packages" when done.

---

## Step 4: Install Frontend (Client) Dependencies

Now let's install the React app dependencies:

```bash
cd ../client
```
Press Enter. This takes you to the client folder.

```bash
npm install
```
Press Enter. This will also take 1-2 minutes. Wait for it to complete.

**Expected output:** You should see "added X packages" when done.

---

## Step 5: Open Multiple Terminals

You need TWO terminals running simultaneously (one for backend, one for frontend):

1. Click the **"+"** button in the terminal panel (top right of terminal)
2. Now you have 2 terminals (you can switch between them using the dropdown)

**OR**

1. Split the terminal: Click the split icon (looks like two rectangles) in the terminal
2. Now you have two terminal panels side by side

---

## Step 6: Start the Backend Server

In Terminal 1 (or left terminal if split):

```bash
cd server
```
Press Enter.

```bash
npm start
```
Press Enter.

**Expected output:**
```
Server is running on port 5000
Connected to SQLite database
Users table ready
Recipes table ready
```

✅ **IMPORTANT:** Keep this terminal running! Don't close it or press Ctrl+C.

---

## Step 7: Start the Frontend

In Terminal 2 (or right terminal if split):

```bash
cd client
```
Press Enter.

```bash
npm start
```
Press Enter.

**Expected output:**
```
Compiled successfully!

You can now view recipe-book-client in the browser.

  Local:            http://localhost:5500
  On Your Network:  http://192.168.x.x:5500
```

The app should automatically open in your default browser at `http://localhost:5500`

✅ **IMPORTANT:** Keep this terminal running too!

---

## Step 8: Test the Application

### Register an Account

1. In your browser, you should see the login page
2. Click "Register here"
3. Fill in:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Register"

You should be logged in and see an empty recipe page!

### Add Your First Recipe

1. Click "Add Recipe" in the top navigation bar
2. Fill in the form:
   - **Title:** Chocolate Chip Cookies
   - **Description:** Classic homemade cookies
   - **Ingredients:** Click "Add Ingredient" for each:
     - 2 cups flour
     - 1 cup butter
     - 1 cup sugar
     - 2 eggs
     - 1 tsp vanilla
     - 2 cups chocolate chips
   - **Instructions:** 
     ```
     1. Preheat oven to 350°F
     2. Mix butter and sugar
     3. Add eggs and vanilla
     4. Mix in flour
     5. Fold in chocolate chips
     6. Bake for 12 minutes
     ```
   - **Prep Time:** 15
   - **Cook Time:** 12
   - **Servings:** 24
   - **Category:** Dessert
   - **Image URL:** https://images.unsplash.com/photo-1499636136210-6f4ee915583e (or any image URL)

3. Click "Create Recipe"

You should now see your recipe card on the home page!

### Explore Features

Try these actions:
- ❤️ Click the heart to favorite your recipe
- 🔍 Use the search box to search by name
- 📋 Click "View Recipe" to see full details
- ✏️ Click "Edit" to modify your recipe
- ⭐ In edit mode, try changing the rating
- 🗑️ Try the delete button (but you might want to keep it for testing!)

---

## Troubleshooting

### Problem: "Command not found: npm"
**Solution:** Node.js is not installed. Install it from https://nodejs.org/ and restart VS Code.

### Problem: "Port 5500 is already in use"
**Solution:** 
- Close any other applications using port 5500
- Or in the terminal, press Ctrl+C to stop the server, then run: `PORT=5501 npm start`

### Problem: "Port 5000 is already in use"
**Solution:**
- Close any other applications using port 5000
- Or edit `server/.env` and change `PORT=5000` to `PORT=5001`
- Update the proxy in `client/package.json` to match

### Problem: Backend terminal shows errors
**Solution:**
- Make sure you ran `npm install` in the server folder
- Delete the `node_modules` folder and `package-lock.json` in server, then run `npm install` again

### Problem: Frontend terminal shows errors
**Solution:**
- Make sure you ran `npm install` in the client folder
- Delete the `node_modules` folder and `package-lock.json` in client, then run `npm install` again

### Problem: Can't login after creating account
**Solution:**
- Check the backend terminal for errors
- Make sure the database.sqlite file was created in the server folder
- Try registering with a different email

### Problem: Recipe images not showing
**Solution:**
- Make sure the image URL is valid and publicly accessible
- Try using an Unsplash image: https://images.unsplash.com/photo-1506368249639-73a05d6f6488

---

## Understanding the Terminal Windows

You should have **TWO terminals running**:

**Terminal 1 (Backend/Server):**
```
recipe-book-app/server> npm start
Server is running on port 5000
Connected to SQLite database
[Should stay on this message - no new output unless there's an error]
```

**Terminal 2 (Frontend/Client):**
```
recipe-book-app/client> npm start
Compiled successfully!
[Should show this and stay running - will show updates when you save files]
```

⚠️ **DO NOT close these terminals or press Ctrl+C** - this will stop the servers!

---

## Stopping the Application

When you're done testing:

1. Go to **Terminal 1** (backend)
2. Press `Ctrl + C`
3. Type `y` if asked to confirm

4. Go to **Terminal 2** (frontend)
5. Press `Ctrl + C`
6. Type `y` if asked to confirm

To restart later, just follow Steps 6 and 7 again!

---

## Next Steps

Now that everything is working:

1. **Explore the Code:**
   - Look at `client/src/pages/Home.js` to see how recipes are displayed
   - Check `server/controllers/recipeController.js` to see the API logic
   - Examine `server/config/database.js` to understand the database setup

2. **Make Changes:**
   - Try changing colors in the CSS files
   - Add new fields to recipes
   - Modify the layout of recipe cards

3. **Learn More:**
   - Read the main README.md for detailed documentation
   - Check out React documentation: https://react.dev/
   - Learn about Express: https://expressjs.com/

---

## Getting Help

If you're stuck:
1. Check the error messages in the terminal carefully
2. Read the Troubleshooting section above
3. Make sure all steps were followed in order
4. Try restarting VS Code and following the steps again

Happy coding! 🎉
