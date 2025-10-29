# 🚀 Render Deployment Guide

## Quick Setup

### **Render Configuration:**

**Root Directory:** `backend`  
**Build Command:** `pnpm install`  
**Start Command:** `node server.js`

### **Environment Variables:**

Add these in Render Dashboard → Environment:

```env
DATABASE_URL=postgresql://user:password@host.neon.tech/db?sslmode=require
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
PORT=10000
NODE_ENV=production
```

---

## 📂 Project Structure (Render Deployment)

```
backend/
├── public/              # Frontend build files (served by Express)
│   ├── index.html
│   └── assets/
├── uploads/             # Uploaded candidate photos
├── routes/              # API routes
├── db/                  # Database config
├── middleware/          # Auth middleware
└── server.js            # Express server
```

---

## 🔄 Deployment Workflow

### **When You Make Changes:**

#### **Backend Only:**
```bash
# Just commit and push
git add backend/
git commit -m "Update backend"
git push
# Render auto-deploys
```

#### **Frontend Changes:**
```bash
# Run the prepare script
./prepare-deploy.sh

# Commit and push
git add .
git commit -m "Update frontend"
git push
# Render auto-deploys with new frontend
```

---

## 🛠️ How It Works

1. **Frontend is pre-built** locally using `prepare-deploy.sh`
2. **Build files are copied** to `backend/public/`
3. **Committed to GitHub** (backend/public is NOT in .gitignore)
4. **Render deploys** the backend folder
5. **Express serves** both API and frontend from one server

---

## 📝 Render Settings

### **Web Service Configuration:**

| Setting | Value |
|---------|-------|
| **Name** | minimax-election |
| **Environment** | Node |
| **Region** | Choose closest to your users |
| **Branch** | main |
| **Root Directory** | `backend` |
| **Build Command** | `pnpm install` |
| **Start Command** | `node server.js` |

### **Auto Deploy:**
✅ Enable "Auto-Deploy" - Deploys automatically on git push

---

## 🔍 Troubleshooting

### **"ENOENT: no such file or directory"**
✅ **Fixed!** Frontend files are now in `backend/public/`

### **500 Error on API calls**
- Check Render logs
- Verify DATABASE_URL is correct
- Ensure JWT_SECRET is set

### **Photos not loading**
- Photos are stored in `backend/uploads/`
- Make sure uploads directory exists (it has .gitkeep)

---

## 📊 Monitoring

Check your deployment:
- **Render Dashboard** → Logs
- **Health Check:** `https://your-app.onrender.com/api/health`
- **API Test:** `https://your-app.onrender.com/api/candidates`

---

## 🎯 Next Steps

1. ✅ Backend deployed on Render
2. 🔜 Update frontend API URL (if deploying to Netlify)
3. 🔜 Or use Render URL directly for everything

**Your Render URL:** `https://your-service-name.onrender.com`
