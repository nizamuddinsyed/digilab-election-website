# Deployment Instructions

## Production Deployment Guide

### Option 1: Deploy to a VPS or Cloud Server

#### Prerequisites
- Ubuntu/Debian server with Node.js 18+
- PostgreSQL database (or use Neon)
- Domain name (optional)
- SSL certificate (recommended)

#### Steps

1. **Prepare the server**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Install PM2 for process management
npm install -g pm2
```

2. **Clone/Upload your project**:
```bash
# Upload the entire workspace directory to /var/www/election-website/
```

3. **Configure environment variables**:
```bash
cd /var/www/election-website/backend
nano .env
```

Update with production values:
```env
DATABASE_URL=your_production_neon_database_url
JWT_SECRET=your_super_secret_key_change_this
PORT=5000
NODE_ENV=production
```

4. **Initialize database**:
```bash
cd /var/www/election-website/backend
pnpm install
pnpm run init-db
```

5. **Build frontend**:
```bash
cd /var/www/election-website/election-frontend
pnpm install
pnpm run build
```

6. **Start with PM2**:
```bash
cd /var/www/election-website/backend
pm2 start server.js --name election-app
pm2 save
pm2 startup
```

7. **Configure Nginx (optional, for port 80/443)**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Deploy to Heroku

1. **Prepare application**:
Create `Procfile` in the backend directory:
```
web: node server.js
```

Create `package.json` scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "cd ../election-frontend && pnpm install && pnpm run build"
  }
}
```

2. **Deploy**:
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-election-app

# Set environment variables
heroku config:set DATABASE_URL=your_neon_database_url
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option 3: Deploy to Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard
4. Railway will automatically detect and deploy the Node.js application

### Option 4: Deploy to Render

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `cd backend && pnpm install && cd ../election-frontend && pnpm install && pnpm run build`
4. Set start command: `cd backend && pnpm start`
5. Add environment variables in Render dashboard

## Post-Deployment Steps

1. **Change admin password**:
   - Login with admin/admin123
   - Change password immediately

2. **Test all functionality**:
   - Public pages loading correctly
   - Candidate detail pages
   - Language switching
   - Admin login
   - CRUD operations
   - Photo uploads

3. **Monitor logs**:
```bash
pm2 logs election-app
```

4. **Set up backups**:
   - Database backups (Neon has automatic backups)
   - Uploaded images backup

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host/db |
| JWT_SECRET | Secret key for JWT tokens | random_string_min_32_chars |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | production |

## Security Checklist

- [ ] Changed default admin credentials
- [ ] Set strong JWT_SECRET
- [ ] Enabled HTTPS/SSL
- [ ] Configured firewall rules
- [ ] Set up database backups
- [ ] Configured CORS properly
- [ ] Updated security headers
- [ ] Enabled rate limiting (optional)
- [ ] Set up monitoring/alerts

## Troubleshooting

### Database connection fails
- Check DATABASE_URL format
- Verify Neon database is accessible
- Check firewall rules

### Frontend not loading
- Verify frontend was built (`election-frontend/dist` exists)
- Check server logs for errors
- Verify static file serving is working

### Photos not uploading
- Check `public/uploads` directory permissions
- Verify file size limits
- Check disk space

### Admin login fails
- Verify database was initialized
- Check JWT_SECRET is set
- Verify admin user exists in database

## Monitoring

Monitor your application using:
- PM2 monitoring: `pm2 monit`
- Logs: `pm2 logs election-app`
- Neon database dashboard for database metrics

## Maintenance

Regular maintenance tasks:
1. Update dependencies monthly
2. Monitor disk space (especially uploads directory)
3. Review and archive old logs
4. Database optimization queries
5. Security patches

## Support

For deployment assistance or issues, refer to:
- Backend logs: `pm2 logs election-app`
- Database logs: Neon dashboard
- Network issues: Check firewall and DNS settings
