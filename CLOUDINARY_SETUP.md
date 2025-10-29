# 📸 Cloudinary Setup Guide

## ✅ What's Been Done

The election website now uses **Cloudinary** for permanent photo storage instead of Render's ephemeral storage.

### Changes Made:
1. ✅ Installed `cloudinary` and `multer-storage-cloudinary` packages
2. ✅ Created Cloudinary configuration file
3. ✅ Updated photo upload routes to use Cloudinary
4. ✅ Updated frontend to handle Cloudinary URLs
5. ✅ Removed local file system dependencies

---

## 🔧 Configuration Required

### Add to Render Environment Variables:

Go to **Render Dashboard** → **Your Service** → **Environment**

Add these 3 variables:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret
```

**Get these from:** https://console.cloudinary.com/

---

## 🎯 How It Works

### Upload Flow:
1. Admin uploads photo in dashboard
2. Photo sent to backend API
3. Multer + Cloudinary storage saves to Cloudinary cloud
4. Cloudinary returns full URL (e.g., `https://res.cloudinary.com/...`)
5. URL saved to database
6. Frontend displays image from Cloudinary CDN

### Benefits:
- ✅ **Permanent storage** - Photos never deleted
- ✅ **Fast CDN delivery** - Global edge network
- ✅ **Auto optimization** - Automatic format/quality optimization
- ✅ **Transformations** - Automatic resize to 800x1000 (4:5 ratio)
- ✅ **25GB free tier** - More than enough for election candidates

---

## 📝 Local Development

Add to `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧪 Testing

After deploying:

1. Go to `/admin` on your site
2. Add a new candidate with photo
3. Check that photo appears immediately
4. Verify URL starts with `https://res.cloudinary.com/`
5. Restart Render service - photo should still be there! ✅

---

## 🔍 Troubleshooting

### "Cannot upload photo"
- Check environment variables are set on Render
- Verify Cloud Name, API Key, API Secret are correct

### "Photo not showing"
- Hard refresh browser (Ctrl+Shift+R)
- Check browser console for errors
- Verify photo URL starts with `https://`

### "Cloudinary dashboard shows no images"
- Check folder name: `election-candidates`
- Images uploaded should appear in Media Library

---

## 📊 Cloudinary Dashboard

View uploaded images:
1. Go to https://console.cloudinary.com/
2. Click "Media Library" 
3. Navigate to `election-candidates` folder
4. See all uploaded candidate photos!

---

## ⚡ Next Deploy

After adding env variables to Render:

```bash
# Already done - just push to trigger deploy
git push origin main
```

Render will auto-deploy with Cloudinary integration! 🎉
