# Deployment Guide 🚀

Complete guide for deploying CryptoQuest to various platforms.

## Table of Contents
- [Vercel (Recommended)](#vercel-deployment)
- [Netlify](#netlify-deployment)
- [Replit](#replit-deployment)
- [GitHub Pages](#github-pages-deployment)
- [Docker](#docker-deployment)

---

## Vercel Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

### Manual Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Build**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Netlify Deployment

### Drag & Drop

1. Build locally:
   ```bash
   npm run build
   ```

2. Drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Git Integration

1. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Connect Repository**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select repository
   - Netlify auto-detects Vite configuration

3. **Deploy**
   - Click "Deploy site"
   - Live at `https://your-site.netlify.app`

---

## Replit Deployment

### From GitHub

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl" → "Import from GitHub"
3. Enter your repository URL
4. Replit auto-configures Vite

### Run Configuration

Replit should auto-detect, but if needed create `.replit`:

```
run = "npm run dev"

[nix]
channel = "stable-22_11"

[deployment]
build = ["npm", "run", "build"]
deploymentTarget = "static"
```

### Deploy

1. Click "Deploy" button in Replit
2. Choose "Static" deployment
3. Your app will be live at `https://your-repl.replit.app`

---

## GitHub Pages Deployment

### Setup GitHub Actions

1. **Create workflow** `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_BASE_URL: /${{ github.event.repository.name }}/
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

2. **Update `vite.config.ts`**:

```typescript
export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE_URL || '/',
  // ... rest of config
}));
```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Push to main branch to deploy

---

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Build & Run

```bash
# Build image
docker build -t cryptoquest .

# Run container
docker run -p 8080:80 cryptoquest

# Access at http://localhost:8080
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## Environment Variables

CryptoQuest runs entirely client-side and requires **no environment variables** for basic functionality.

### Optional Variables (Future Features)

If adding backend integration:

```env
# API Configuration
VITE_API_URL=https://api.example.com

# Supabase (for cloud sync)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Analytics (optional)
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

### Setting Variables by Platform

**Vercel:**
- Project Settings → Environment Variables

**Netlify:**
- Site Settings → Environment Variables

**Replit:**
- Tools → Secrets

**GitHub Pages:**
- Repository Settings → Secrets and variables → Actions

---

## Performance Optimization

### Pre-deployment Checklist

- [ ] Run production build locally: `npm run build`
- [ ] Test production preview: `npm run preview`
- [ ] Check bundle size: Inspect `dist/` folder
- [ ] Verify all routes work (SPA routing)
- [ ] Test on mobile devices
- [ ] Check browser console for errors

### Build Optimization Tips

1. **Minimize Bundle Size**
   - Vite automatically code-splits
   - Lazy load routes if needed
   - Check for duplicate dependencies

2. **Asset Optimization**
   - Images are optimized by Vite
   - Fonts are locally hosted (Google Fonts)

3. **Caching Strategy**
   - Vite adds content hashes to filenames
   - Configure proper cache headers in hosting

---

## Monitoring & Analytics

### Add Google Analytics

```typescript
// src/lib/analytics.ts
export const trackPageView = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'GA_TRACKING_ID', {
      page_path: url,
    });
  }
};

// In App.tsx, add route change tracking
```

### Error Tracking with Sentry

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE,
});
```

---

## Troubleshooting

### Common Issues

**404 on page refresh**
- Ensure SPA routing is configured (all paths → index.html)
- Vercel/Netlify handle this automatically
- For nginx, use `try_files $uri /index.html`

**Blank page after deployment**
- Check browser console for errors
- Verify `base` path in vite.config.ts
- Check for CORS issues if using external APIs

**Slow initial load**
- Enable gzip compression
- Check bundle size with `npm run build`
- Consider code splitting for large routes

---

## Security Considerations

### HTTPS
- All modern platforms (Vercel, Netlify) provide free SSL
- **Required** for WebCrypto API to work

### Content Security Policy (Optional)

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com;
               font-src 'self' fonts.gstatic.com;">
```

### Security Headers

Configure in hosting platform:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Post-Deployment

### Testing Production
1. Test all routes
2. Verify crypto operations work (requires HTTPS)
3. Check mobile responsiveness
4. Test offline behavior (PWA if implemented)

### Updating
```bash
git add .
git commit -m "Update message"
git push origin main
```

Platforms will auto-deploy on push.

---

## Support

If you encounter deployment issues:
1. Check platform-specific documentation
2. Review build logs
3. Open an issue on GitHub

---

**Happy Deploying! 🚀**
