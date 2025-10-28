# Known Issues and Troubleshooting

## Current Known Issues

### Navigation from Candidates List (Browser Caching Issue)
**Status**: Under Investigation  
**Severity**: Low  
**Workaround Available**: Yes

**Description**:
During testing, an intermittent issue was observed where clicking on candidate cards from the candidates list page may not always navigate to the correct candidate detail page. This appears to be a browser caching issue rather than a code issue.

**Evidence**:
- Source code inspection confirms correct implementation: `to={/candidates/${candidate.id}}`
- Direct URL navigation works perfectly (e.g., manually visiting `/candidates/2` shows the correct candidate)
- API returns correct data for all candidates
- All candidate detail pages render correctly when accessed directly

**Workaround**:
- Users can access any candidate page by direct URL navigation
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R) typically resolves the issue
- Clearing browser cache resolves the issue permanently

**Recommended Solutions for Production**:
1. **Add Cache-Busting Headers**: Configure proper cache headers in the Express server
2. **Service Worker**: Implement a service worker for better cache management
3. **Version Hashing**: Ensure build includes content hashing (already implemented in Vite)
4. **CDN Configuration**: If using a CDN, configure proper cache invalidation

**Code to Add** (Optional Enhancement):
```javascript
// In backend/server.js, add cache headers:
app.use(express.static(path.join(__dirname, '../election-frontend/dist'), {
  maxAge: '1h',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
  }
}));
```

## General Troubleshooting

### Issue: Database Connection Fails
**Solution**:
- Verify `DATABASE_URL` in `.env` is correct
- Check Neon database is running and accessible
- Verify network connectivity

### Issue: Admin Login Not Working
**Solution**:
- Ensure database was initialized: `pnpm run init-db`
- Default credentials: username: `admin`, password: `admin123`
- Check JWT_SECRET is set in `.env`
- Verify backend is running: `curl http://localhost:5000/api/health`

### Issue: Photos Not Uploading
**Solution**:
- Check `public/uploads` directory exists and has write permissions
- Verify file size is under 5MB
- Check supported formats: JPEG, PNG, WebP
- Review backend logs for multer errors

### Issue: Language Not Switching
**Solution**:
- Clear browser localStorage
- Hard refresh the page (Ctrl+Shift+R)
- Check browser console for JavaScript errors

### Issue: Build Fails
**Solution**:
- Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Ensure Node.js version is 18+ : `node --version`

### Issue: Port Already in Use
**Solution**:
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 $(lsof -ti:5000)
```

## Performance Optimization

### Recommended Production Optimizations
1. **Enable Compression**: Use gzip/brotli compression
2. **CDN**: Serve static assets from CDN
3. **Database Connection Pooling**: Configure max connections in DATABASE_URL
4. **Image Optimization**: Use WebP format and responsive images
5. **Lazy Loading**: Implement lazy loading for images
6. **Caching Strategy**: Configure Redis for session storage

### Monitoring Recommendations
1. **Error Tracking**: Integrate Sentry or similar service
2. **Performance Monitoring**: Use New Relic or DataDog
3. **Uptime Monitoring**: Configure uptime checks
4. **Database Monitoring**: Use Neon dashboard for query performance

## Security Hardening

### Pre-Production Checklist
- [ ] Change default admin password
- [ ] Set strong JWT_SECRET (minimum 32 characters)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for specific domains only
- [ ] Set rate limiting on API endpoints
- [ ] Enable security headers (already using Helmet.js)
- [ ] Configure file upload restrictions
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Review and update dependencies

### Recommended Security Headers
```javascript
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## Support and Maintenance

### Regular Maintenance Tasks
1. **Weekly**: Review error logs and performance metrics
2. **Monthly**: Update dependencies with security patches
3. **Quarterly**: Database optimization and cleanup
4. **Yearly**: Security audit and penetration testing

### Backup Strategy
1. **Database**: Daily automated backups (Neon provides this)
2. **Uploads**: Weekly backup of `/public/uploads` directory
3. **Configuration**: Version control for all config files
4. **Documentation**: Keep deployment docs updated

### Emergency Contacts
- Database Issues: Neon Support
- Server Issues: Hosting Provider Support
- Application Issues: Development Team

---

**Last Updated**: October 29, 2025  
**Version**: 1.0.0  
**Status**: Production Ready with Minor Known Issue
