# Farmify Backend API

Node.js REST API server for Farmify with MongoDB Atlas integration.

## 🚀 Server Status

✅ **Running on**: `http://localhost:5000`  
✅ **Database**: MongoDB Atlas (Connected)  
✅ **Environment**: Development

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

- **POST** `/api/auth/register` - Register new user
  ```json
  {
    "name": "John Farmer",
    "email": "john@example.com",
    "password": "password123",
    "location": "Punjab, India"
  }
  ```

- **POST** `/api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET** `/api/auth/me` - Get current user (Protected)
  - Header: `Authorization: Bearer <token>`

### Post Routes (`/api/posts`)

- **GET** `/api/posts` - Get all posts (feed)
  - Query params: `?page=1&limit=10`

- **POST** `/api/posts` - Create new post (Protected)
  ```json
  {
    "content": "My farming update...",
    "tags": ["rice", "harvest"],
    "category": "general"
  }
  ```

- **PUT** `/api/posts/:id/like` - Like/unlike post (Protected)

- **GET** `/api/posts/:id/comments` - Get post comments

- **POST** `/api/posts/:id/comments` - Add comment (Protected)
  ```json
  {
    "content": "Great post!"
  }
  ```

### User Routes (`/api/users`)

- **GET** `/api/users/:id` - Get user profile

- **PUT** `/api/users/profile` - Update profile (Protected)
  ```json
  {
    "name": "Updated Name",
    "location": "Gujarat, India",
    "bio": "Organic farmer",
    "preferences": {
      "emailNotifications": true,
      "weatherAlerts": true,
      "language": "hi"
    }
  }
  ```

## 🗄️ Database Models

### User
- name, email, password (hashed)
- location, avatar, bio
- followers[], following[]
- postsCount
- preferences (notifications, language)

### Post
- author (ref: User)
- content, images[]
- likes[], likesCount
- commentsCount, sharesCount
- tags[], category
- timestamps

### Comment
- post (ref: Post)
- author (ref: User)
- content
- likes[], likesCount
- timestamps

## 🔐 Authentication

Uses JWT (JSON Web Tokens) for authentication:
- Token expires in 30 days
- Include in requests: `Authorization: Bearer <your_token>`

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Auth**: JWT + bcryptjs
- **Validation**: express-validator
- **Dev Tool**: nodemon

## 📦 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 🚦 Running the Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 📝 Notes

- Password is automatically hashed before saving
- All protected routes require valid JWT token
- CORS enabled for frontend integration
- Validation on all input fields
- Error handling middleware included

## 🔗 Connect Frontend

Update frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

**Status**: ✅ Server running successfully with MongoDB Atlas connection!
