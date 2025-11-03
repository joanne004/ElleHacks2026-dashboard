# Setup Instructions for ElleHacks Dashboard

## Prerequisites
1. Node.js installed on your machine
2. MongoDB installed and running on your machine

## Step 1: Start MongoDB
Make sure MongoDB is running on your machine:
```bash
# If you have MongoDB installed locally, start it:
# On Windows:
net start MongoDB

# On Mac/Linux:
mongod
```

If you don't have MongoDB installed, you can:
- Install it locally: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Step 2: Create Backend Environment File
Create a file called `.env` in the `backend` folder with the following content:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/ellehacks

# Server Port
PORT=5000
```

If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

## Step 3: Install Backend Dependencies
```bash
cd backend
npm install
```

## Step 4: Start the Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

## Step 5: Install Frontend Dependencies (in a new terminal)
```bash
cd frontend
npm install
```

## Step 6: Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

## Step 7: Access the Application
1. Open your browser and go to the URL shown by Vite (usually `http://localhost:5173`)
2. You'll see the Login page
3. Click on "Sign up" to create a new account
4. Fill in:
   - First Name
   - Last Name  
   - Email
   - Password
5. Click "Sign Up"
6. You'll be redirected to the Login page
7. Enter your email and password
8. Click "Login"
9. You'll be redirected to the Dashboard Home page!

## Troubleshooting

### If MongoDB connection fails:
- Make sure MongoDB is running: `mongod` or `net start MongoDB`
- Check your MongoDB connection string in `.env`
- For Atlas, ensure your IP is whitelisted

### If backend won't start:
- Make sure you're in the `backend` directory
- Check that all dependencies are installed: `npm install`
- Verify your `.env` file exists

### If frontend can't connect to backend:
- Make sure the backend is running on port 5000
- Check that the API URL in `frontend/src/utils/api.js` is correct

