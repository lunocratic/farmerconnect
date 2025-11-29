# 🌾 Farmify - Smart Agriculture Platform

A modern full-stack web application for farmers and agriculture enthusiasts to connect, share knowledge, and access farming resources.

## ✨ Features

### 🔐 Authentication System
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Admin panel for user management

### 📱 Dashboard & Social Feed
- Create and share posts with the farming community
- Upload multiple images per post (up to 4 images)
- Edit and delete your own posts
- Like and interact with other posts
- Real-time feed updates

### 📚 Resources Hub
- 12 comprehensive agriculture plans
- Detailed farming guides (Vegetables, Rice, Fruits, Dairy, Mushroom, etc.)
- ROI calculations and profitability insights
- Government subsidies information (PM-KISAN, NABARD, MIDH)
- Best season recommendations

### 👥 Community Features
- Follow other farmers
- View user profiles
- Track followers and following

### 🛡️ Admin Dashboard
- User management interface
- View all registered users
- Delete user accounts
- Admin-only access control

## 🚀 Tech Stack

### Frontend
- **React 19.2.0** - UI framework
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.9.6** - Client-side routing
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/FarmerConnect.git
cd FarmerConnect
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_secret_key" >> .env
echo "PORT=3001" >> .env

# Start backend server
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3001/api" > .env

# Start frontend dev server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🔑 Admin Access

Create an admin user:
```bash
cd backend
node createAdmin.js
```

Default admin credentials:
- Email: `admin@farmify.com`
- Password: `admin123`

## 📁 Project Structure

```
FarmerConnect/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS files
│   │   ├── utils/          # Utilities (API, auth)
│   │   ├── context/        # React Context
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json
│
├── backend/
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── server.js           # Express server
│   └── package.json
│
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/admin/users` - Get all users (admin)
- `DELETE /api/auth/admin/users/:id` - Delete user (admin)

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post

### Users
- `GET /api/users/:id` - Get user profile
- `POST /api/users/:id/follow` - Follow/unfollow user

## 🎨 Features in Detail

### Image Upload
- Support for up to 4 images per post
- 5MB file size limit per image
- Base64 encoding for storage
- Responsive image grid display (1-4 image layouts)

### Post Management
- Edit your posts with image support
- Delete posts with confirmation
- Real-time UI updates

### Resources Page
- 12 agriculture plans with detailed information
- ROI calculations (60-300% returns)
- Government subsidy details
- Best season recommendations
- Expandable plan details with modal view

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes on frontend and backend
- Admin role-based access control
- CORS configuration for API security

## 🚀 Deployment

### Deploy to Vercel (Frontend)
```bash
cd frontend
vercel --prod
```

### Deploy to Render (Backend)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with auto-deployment on push

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Agriculture data sourced from government agricultural departments
- Icons and UI inspiration from modern farming platforms
- Community feedback and contributions

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Happy Farming! 🌾**
