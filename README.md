# 🗳️ Election Candidates Website

A modern, full-stack election candidates platform built with React, TypeScript, and Node.js. Features bilingual support (German/English), admin panel, and a beautiful minimalist design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

## ✨ Features

### Public Website
- 🌍 **Bilingual Support** - Full German and English translations
- 🎨 **Modern Minimalist Design** - Premium, professional aesthetic
- 📱 **Fully Responsive** - Optimized for all devices
- 🔍 **Search & Filter** - Find candidates easily
- 📄 **Candidate Profiles** - Detailed pages with photos, bios, and goals
- ⚖️ **GDPR Compliant** - Privacy policy and legal notice pages

### Admin Panel
- 🔐 **JWT Authentication** - Secure login system
- ✏️ **CRUD Operations** - Manage candidates easily
- 📸 **Photo Upload** - Multer-powered image handling
- 📊 **Dashboard Stats** - Track active/inactive candidates
- 🌐 **Bilingual Content** - Manage German and English content separately

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Heroicons** for icons
- **Vite** for blazing-fast builds

### Backend
- **Node.js** with Express 5
- **PostgreSQL** (Neon) database
- **JWT** authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **Helmet.js** for security headers
- **CORS** enabled

## 📋 Prerequisites

- Node.js >= 18.0.0
- pnpm (recommended) or npm
- PostgreSQL database (or Neon account)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/minimax-election-website.git
cd minimax-election-website
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
pnpm install
```

**Frontend:**
```bash
cd election-frontend
pnpm install
```

### 3. Configure Environment Variables

**Backend:** Create `backend/.env`
```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-key-change-in-production
PORT=5000
NODE_ENV=development
```

See `.env.example` for reference.

### 4. Initialize Database

```bash
cd backend
pnpm run init-db
```

This creates:
- `candidates` table
- `admin_users` table  
- Default admin user (username: `admin`, password: `admin123`)

### 5. Start the Application

**Quick Start (from root):**
```bash
./quick-start.sh
```

This will:
1. Build the frontend
2. Start the backend server
3. Serve both at http://localhost:5000

**Or manually:**

**Backend:**
```bash
cd backend
node server.js
```

**Frontend (development):**
```bash
cd election-frontend
pnpm run dev
```

## 📁 Project Structure

```
minimax-election-website/
├── backend/
│   ├── db/              # Database configuration
│   ├── middleware/      # Auth middleware
│   ├── routes/          # API routes
│   ├── uploads/         # Photo storage
│   └── server.js        # Express server
├── election-frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # Language context
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── i18n/        # Translations
│   └── dist/            # Build output
└── public/              # Static assets
```

## 🌐 API Endpoints

### Public
- `GET /api/candidates` - Get all active candidates
- `GET /api/candidates/:id` - Get candidate by ID

### Admin (Requires JWT)
- `POST /api/auth/login` - Admin login
- `POST /api/auth/verify` - Verify JWT token
- `POST /api/candidates` - Create candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `GET /api/candidates/stats` - Get statistics

## 🔐 Default Admin Credentials

```
Username: admin
Password: admin123
```

**⚠️ IMPORTANT:** Change these in production!

## 🎨 Design Features

- ✅ Minimalist monochrome palette (gray-900, white, gray-50)
- ✅ Large, bold typography (text-9xl hero headings)
- ✅ Generous spacing (py-32 sections)
- ✅ Smooth animations (500ms durations)
- ✅ Clean white candidate cards with hover effects
- ✅ Responsive grid layouts
- ✅ Professional admin interface

## 📄 Pages

- **Homepage** - Hero, features, candidate preview
- **Candidates** - Grid view with search
- **Candidate Detail** - Full profile with bio and goals
- **Privacy Policy** - GDPR-compliant (DE/EN)
- **Legal Notice** - Impressum (DE/EN)
- **Admin Login** - Secure authentication
- **Admin Dashboard** - Manage candidates

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
1. Set environment variables on your hosting platform
2. Build frontend: `cd election-frontend && pnpm run build`
3. Start server: `cd backend && node server.js`
4. Server serves both API and static files on port 5000

## 📝 License

MIT License - feel free to use this project for your elections!

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for democratic elections**
