# Authentication & Admin System - Complete Guide

## ✅ What Was Fixed

### 1. **User Authentication Re-enabled**
   - Uncommented authentication code in `Auth.jsx`
   - Login and signup now work with backend API
   - JWT token-based authentication
   - Protected routes require authentication

### 2. **Admin System Created**
   - Added `isAdmin` field to User model
   - Created admin login endpoint
   - Created admin dashboard with user management
   - Admin can view all users and delete non-admin users

---

## 🔐 Admin Access

### Admin Credentials
```
Email:    admin@farmify.com
Password: admin123
```

### Admin Login URL
```
http://localhost:5173/admin
```

---

## 🎯 Features Implemented

### **User Authentication**
- ✅ User registration with email, password, name, location
- ✅ User login with email and password
- ✅ JWT token generation and validation
- ✅ Protected routes redirect to login
- ✅ Indian states dropdown (28 states)

### **Admin Portal**
- ✅ Separate admin login page (`/admin`)
- ✅ Admin dashboard showing all users (`/admin/dashboard`)
- ✅ Statistics: Total users, Total admins, New users (30 days)
- ✅ Search functionality (by name, email, location)
- ✅ User management: View all users, Delete users
- ✅ Protected admin routes (admin-only access)

---

## 📁 New Files Created

1. **`frontend/src/pages/AdminAuth.jsx`**
   - Admin login page
   - Validates admin credentials
   - Redirects to admin dashboard

2. **`frontend/src/pages/AdminDashboard.jsx`**
   - Lists all registered users
   - Shows user statistics
   - Search and filter users
   - Delete user functionality

3. **`frontend/src/styles/AdminDashboard.css`**
   - Beautiful gradient purple theme
   - Responsive design
   - Table layout for user list
   - Stats cards with hover effects

4. **`backend/createAdmin.js`**
   - Script to create admin user
   - Can be run anytime: `node createAdmin.js`

---

## 🔧 Files Modified

1. **`frontend/src/pages/Auth.jsx`**
   - Re-enabled authentication code
   - Added admin login button
   - Fixed login/signup functionality

2. **`frontend/src/pages/Dashboard.jsx`**
   - Re-enabled authentication check
   - Users must log in to access

3. **`backend/models/User.js`**
   - Added `isAdmin` boolean field (default: false)

4. **`backend/routes/authRoutes.js`**
   - Added admin login endpoint: `POST /api/auth/admin/login`
   - Added get all users: `GET /api/auth/admin/users`
   - Added delete user: `DELETE /api/auth/admin/users/:id`

5. **`frontend/src/App.jsx`**
   - Added `/admin` route
   - Added `/admin/dashboard` route

6. **`frontend/src/pages/Landing.jsx`**
   - Added small "Admin" link in navbar

---

## 🚀 How to Use

### **For Regular Users**
1. Go to http://localhost:5173
2. Click "Get Started" or "Sign In"
3. Create account with email, password, name, state
4. Login to access dashboard

### **For Administrators**
1. Go to http://localhost:5173/admin
2. Login with:
   - Email: `admin@farmify.com`
   - Password: `admin123`
3. View all users in admin dashboard
4. Search users by name, email, or location
5. Delete users (cannot delete other admins)

---

## 🛠️ API Endpoints

### User Authentication
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login user
GET  /api/auth/me          - Get current user (protected)
```

### Admin Authentication
```
POST   /api/auth/admin/login      - Admin login (admin only)
GET    /api/auth/admin/users      - Get all users (admin only)
DELETE /api/auth/admin/users/:id  - Delete user (admin only)
```

---

## 🔒 Security Features

1. **Password Hashing**: Bcrypt with salt rounds (10)
2. **JWT Tokens**: Secure token generation and validation
3. **Admin Protection**: Admin routes check `isAdmin` field
4. **Delete Protection**: Cannot delete admin users
5. **Route Protection**: Private routes require authentication

---

## 📊 Admin Dashboard Features

### Statistics Cards
- **Total Users**: Count of all registered users
- **Administrators**: Count of admin users
- **New Users**: Users registered in last 30 days

### User Table Columns
- Name (with avatar/initial)
- Email
- Location (state)
- Role (Admin/User badge)
- Posts count
- Followers count
- Join date
- Actions (delete button)

### Search & Filter
- Real-time search
- Filters by name, email, or location
- Shows result count

---

## 🎨 Design

### Admin Dashboard Theme
- **Colors**: Purple gradient (`#667eea` to `#764ba2`)
- **Style**: Modern, clean, card-based layout
- **Responsive**: Works on mobile and desktop
- **Icons**: Emoji-based icons for visual appeal

### User Authentication Theme
- **Colors**: Green (`#10b981`) with white cards
- **Style**: Centered card layout
- **Forms**: Clean input fields with validation

---

## 💡 Creating More Admin Users

Run this command in the backend directory:
```bash
cd backend
node createAdmin.js
```

Or manually update a user in MongoDB:
```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isAdmin: true } }
)
```

---

## 🐛 Troubleshooting

### "Access denied. Admin only"
- Make sure you're using admin credentials
- Check if user has `isAdmin: true` in database

### "Invalid credentials"
- Verify email and password are correct
- Admin email: `admin@farmify.com`
- Admin password: `admin123`

### Cannot delete user
- Cannot delete admin users
- Only admins can delete users
- Check if you're logged in as admin

### Authentication not working
- Make sure backend is running on port 3001
- Check MongoDB connection
- Verify JWT_SECRET is set in `.env`

---

## 📝 Testing

### Test User Registration
1. Go to http://localhost:5173/auth
2. Click "Sign Up" tab
3. Fill form and submit
4. Should redirect to dashboard

### Test User Login
1. Go to http://localhost:5173/auth
2. Enter registered email and password
3. Click "Sign In"
4. Should redirect to dashboard

### Test Admin Login
1. Go to http://localhost:5173/admin
2. Enter admin@farmify.com / admin123
3. Should see all users in dashboard
4. Try searching and deleting a user

---

## 🎉 Summary

✅ **Authentication is now fully functional**
✅ **Admin system created with user management**
✅ **Admin can view all users and delete them**
✅ **Beautiful purple-themed admin dashboard**
✅ **Secure JWT-based authentication**
✅ **Ready for production use!**

---

## 📱 Access URLs

- **Landing Page**: http://localhost:5173/
- **User Auth**: http://localhost:5173/auth
- **Dashboard**: http://localhost:5173/dashboard
- **Admin Login**: http://localhost:5173/admin
- **Admin Dashboard**: http://localhost:5173/admin/dashboard

---

Enjoy your fully functional authentication and admin system! 🚀
