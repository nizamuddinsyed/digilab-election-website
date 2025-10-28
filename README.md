# Election Candidates Website 2025

A modern, full-stack election candidates website with admin panel, bilingual support (German/English), and complete CRUD functionality.

## Features

### Public Website
- Professional hero section with election branding
- Responsive candidate showcase grid
- Individual candidate detail pages
- Bilingual support (German/English)
- Modern, minimalist design
- Mobile-first responsive layout

### Admin Panel
- Secure JWT authentication
- Dashboard with statistics
- Full CRUD operations for candidates
- Photo upload functionality
- Bilingual content management
- Form validation and error handling

### Technical Stack
- **Frontend**: React 18 + TypeScript + TailwindCSS + React Router
- **Backend**: Node.js + Express 5
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT
- **File Upload**: Multer
- **Styling**: Modern Minimalism Premium design system

## Installation

### Prerequisites
- Node.js 18+ and pnpm
- PostgreSQL database (Neon)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables in `.env`:
```env
DATABASE_URL=postgresql://username:password@host:port/database_name
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=production
```

4. Initialize database:
```bash
pnpm run init-db
```

5. Start backend server:
```bash
pnpm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd election-frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Build for production:
```bash
pnpm run build
```

The built files will be in `dist/` directory.

## Production Deployment

The application is configured to serve both API and frontend from a single Express server on port 5000.

### Starting the Application

From the backend directory:
```bash
pnpm start
```

The server will:
- Serve the API at `/api/*`
- Serve uploaded images at `/uploads/*`
- Serve the React frontend for all other routes

### Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (production/development)

## Default Admin Credentials

**Username**: admin  
**Password**: admin123

**IMPORTANT**: Change these credentials immediately after first login in production!

## Database Schema

### Candidates Table
- id (SERIAL PRIMARY KEY)
- name (VARCHAR 255)
- position (VARCHAR 255)
- bio_de (TEXT) - German biography
- bio_en (TEXT) - English biography
- goals_de (TEXT) - German goals
- goals_en (TEXT) - English goals
- email (VARCHAR 255)
- social_links (JSONB)
- photo_url (VARCHAR 500)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Admin Users Table
- id (SERIAL PRIMARY KEY)
- username (VARCHAR 100 UNIQUE)
- password_hash (VARCHAR 255)
- email (VARCHAR 255 UNIQUE)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- last_login (TIMESTAMP)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

### Candidates (Public)
- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get single candidate

### Candidates (Admin - Protected)
- `POST /api/candidates` - Create candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `GET /api/candidates/admin/stats` - Get statistics

## File Structure

```
/workspace/
├── backend/
│   ├── db/
│   │   ├── db.js
│   │   └── schema.sql
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── candidates.js
│   ├── scripts/
│   │   └── initDb.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── election-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── contexts/
│   │   │   └── LanguageContext.tsx
│   │   ├── i18n/
│   │   │   └── translations.ts
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── CandidatesPage.tsx
│   │   │   ├── CandidateDetailPage.tsx
│   │   │   ├── AdminLoginPage.tsx
│   │   │   └── AdminDashboard.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── dist/ (production build)
│   ├── tailwind.config.js
│   └── package.json
└── public/
    └── uploads/
```

## Design System

The application follows the **Modern Minimalism Premium** design system:

- **Colors**: 90% neutral grays/whites, 8% blue accents, 2% green accents
- **Typography**: Poppins (headings) + Inter (body)
- **Spacing**: Generous whitespace with 48-96px section gaps
- **Shadows**: Subtle layered depth system
- **Transitions**: Smooth 250-300ms interactions
- **Touch Targets**: Minimum 56px for accessibility

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected admin routes
- Input validation
- SQL injection prevention
- File upload restrictions
- CORS configuration
- Helmet.js security headers

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

All rights reserved © 2025

## Support

For issues or questions, please contact the development team.
