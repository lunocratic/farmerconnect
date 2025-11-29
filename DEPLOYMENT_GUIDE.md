# 🚀 Deployment Guide - Vercel (Frontend) + Railway (Backend)

## 📋 Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free)
- MongoDB Atlas (already configured ✅)

---

## 🎯 Part 1: Deploy Backend to Railway

### Step 1: Sign Up for Railway
1. Go to https://railway.app
2. Click **"Login"** → Sign in with **GitHub**
3. Authorize Railway to access your repositories

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **`FarmerConnect`** repository
4. Railway will detect it's a Node.js project

### Step 3: Configure Backend Service
1. Click on the detected service
2. Go to **"Settings"**
3. Set **Root Directory**: `backend`
4. Set **Start Command**: `npm start`

### Step 4: Add Environment Variables
Click **"Variables"** tab and add:

```
MONGO_URI=mongodb+srv://ashokvibes:Luno%406595@arise.jz5pgqh.mongodb.net/farmify?retryWrites=true&w=majority&appName=Arise
JWT_SECRET=farmify_super_secret_jwt_key_2025_production
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

**Important:** You'll update `FRONTEND_URL` after deploying frontend!

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Once deployed, click **"Settings"** → **"Networking"**
4. Click **"Generate Domain"**
5. **Copy your Railway URL**: `https://farmerconnect-production.up.railway.app`

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend Environment Variable
Before deploying, update the file I created:

**File: `frontend/.env.production`**

Replace `your-backend-name` with your actual Railway URL:
```
VITE_API_URL=https://farmerconnect-production.up.railway.app/api
```

### Step 2: Commit Changes
```bash
cd /Users/luno/Study/FarmerConnect
git add .
git commit -m "Add deployment configuration for Vercel and Railway"
git push origin main
```

### Step 3: Sign Up for Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"** → Sign in with **GitHub**
3. Authorize Vercel

### Step 4: Import Project
1. Click **"Add New..."** → **"Project"**
2. Select **`FarmerConnect`** repository
3. Vercel will detect it's a Vite project

### Step 5: Configure Frontend
**Framework Preset:** Vite
**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `dist`
**Install Command:** `npm install`

### Step 6: Add Environment Variable
Click **"Environment Variables"** and add:

**Key:** `VITE_API_URL`
**Value:** `https://farmerconnect-production.up.railway.app/api`

(Use your actual Railway URL)

### Step 7: Deploy
1. Click **"Deploy"**
2. Wait for build (~1-2 minutes)
3. Once complete, you'll get a URL like: `https://farmer-connect.vercel.app`

---

## 🔄 Part 3: Update Backend with Frontend URL

### Go back to Railway:
1. Open your Railway project
2. Click **"Variables"**
3. Update `FRONTEND_URL` with your Vercel URL
4. Example: `https://farmer-connect.vercel.app`
5. Railway will auto-redeploy with new variable

---

## 🔒 Part 4: Update MongoDB Atlas

### Allow Railway IP Addresses:
1. Go to https://cloud.mongodb.com
2. Click **"Network Access"**
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** → `0.0.0.0/0`
5. Click **"Confirm"**

**Note:** For better security, you can whitelist specific Railway IPs later.

---

## ✅ Part 5: Test Your Deployment

### Test Backend:
```bash
curl https://farmerconnect-production.up.railway.app
```

Expected response:
```json
{
  "message": "🌾 Farmify API Server",
  "status": "running",
  "version": "1.0.0"
}
```

### Test Frontend:
1. Open your Vercel URL in browser
2. Try signing up / logging in
3. Create a post with images
4. Test all features

---

## 🎯 Quick Checklist

### Backend (Railway):
- [ ] Project deployed
- [ ] Environment variables added
- [ ] Domain generated
- [ ] Backend URL copied
- [ ] FRONTEND_URL updated with Vercel URL

### Frontend (Vercel):
- [ ] .env.production updated with Railway URL
- [ ] Changes committed to GitHub
- [ ] Project imported to Vercel
- [ ] VITE_API_URL environment variable set
- [ ] Deployment successful

### Database (MongoDB Atlas):
- [ ] IP whitelist updated (0.0.0.0/0)
- [ ] Connection string working

---

## 📱 Your Live URLs

After deployment:
```
Frontend:  https://farmer-connect.vercel.app
Backend:   https://farmerconnect-production.up.railway.app
Admin:     https://farmer-connect.vercel.app/admin
```

---

## 🔧 Troubleshooting

### Backend not connecting to MongoDB:
- Check MongoDB Atlas IP whitelist
- Verify MONGO_URI in Railway variables
- Check Railway logs for errors

### Frontend can't reach backend:
- Verify VITE_API_URL is correct in Vercel
- Check CORS settings in backend
- Verify Railway backend is running

### Authentication issues:
- Clear browser cookies
- Check JWT_SECRET is set in Railway
- Verify tokens are being sent in requests

---

## 🚀 Automatic Deployments

Both Vercel and Railway support **auto-deployment**:

- **Push to GitHub** → Vercel auto-deploys frontend
- **Push to GitHub** → Railway auto-deploys backend

---

## 💰 Free Tier Limits

### Vercel (Free):
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN

### Railway (Free Trial):
- ✅ $5 credit/month
- ✅ ~500 hours runtime
- ✅ 1 GB RAM
- ✅ Sleeps after inactivity

### MongoDB Atlas (Free):
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Perfect for development

---

## 📝 Post-Deployment Tasks

1. **Test all features thoroughly**
2. **Update admin credentials** (change from default)
3. **Share your live URL** with users
4. **Monitor Railway usage** to avoid exceeding free tier
5. **Set up custom domain** (optional)

---

## 🎉 You're Live!

Your Farmify platform is now deployed and accessible worldwide! 🌾

**Next steps:**
- Share with farmers in your community
- Gather feedback
- Add more features
- Scale as needed

---

**Need help?** Check the logs:
- **Vercel:** Deployments → View Function Logs
- **Railway:** Deployment → View Logs
