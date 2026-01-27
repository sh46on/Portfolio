# Firebase Deployment Guide

Complete step-by-step guide to deploy your portfolio on Firebase Hosting.

## Prerequisites

- Node.js installed
- Portfolio built and tested locally
- Firebase account (free tier is sufficient)

## Step 1: Build Your Project

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Step 2: Install Firebase CLI

```bash
npm install -g firebase-tools
```

Verify installation:
```bash
firebase --version
```

## Step 3: Login to Firebase

```bash
firebase login
```

This opens your browser for Google authentication.

## Step 4: Initialize Firebase

Navigate to your project directory:
```bash
cd sharon-portfolio
```

Initialize Firebase:
```bash
firebase init hosting
```

### Configuration Prompts:

**1. "Are you ready to proceed?"**
```
Yes
```

**2. "Please select an option:"**
```
Use an existing project (or create a new one)
```

**3. Select or create your Firebase project**
```
Select existing or create new
```

**4. "What do you want to use as your public directory?"**
```
build
```

**5. "Configure as a single-page app?"**
```
Yes
```

**6. "Set up automatic builds with GitHub?"**
```
No
```

**7. "File build/index.html already exists. Overwrite?"**
```
No
```

## Step 5: Deploy

```bash
firebase deploy
```

Your site will be deployed to:
```
https://your-project-id.web.app
```

## Step 6: Custom Domain (Optional)

### Add Custom Domain:

1. Go to Firebase Console
2. Navigate to Hosting
3. Click "Add custom domain"
4. Enter your domain (e.g., sharonvarghese.com)
5. Follow DNS configuration instructions

### Update DNS Records:

Add these records to your domain provider:

```
Type: A
Name: @
Value: (Firebase provides IPs)

Type: TXT
Name: @
Value: (Firebase verification code)
```

Wait for DNS propagation (can take up to 48 hours).

## Firebase Configuration File

The initialization creates `firebase.json`:

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## Continuous Deployment

### Using GitHub Actions:

Create `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

Add Firebase service account key to GitHub Secrets.

## Useful Commands

### View Hosting URL
```bash
firebase hosting:channel:list
```

### Deploy to Preview Channel
```bash
firebase hosting:channel:deploy preview
```

### Rollback to Previous Version
```bash
firebase hosting:clone source-site-id:channel-id target-site-id:channel-id
```

### View Deployment History
Check Firebase Console > Hosting > Release History

## Performance Optimization

### Enable Compression

Firebase automatically serves compressed assets. Verify:

```bash
curl -H "Accept-Encoding: gzip" -I https://your-site.web.app
```

### Cache Configuration

The configuration above caches static assets for 1 year.

### CDN Distribution

Firebase Hosting automatically uses Google's CDN for global distribution.

## Monitoring

### View Analytics

1. Firebase Console > Analytics
2. Monitor page views, user engagement
3. Track performance metrics

### Check Lighthouse Scores

```bash
npm install -g lighthouse
lighthouse https://your-site.web.app --view
```

Target scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Troubleshooting

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deploy Fails

```bash
firebase logout
firebase login
firebase deploy --debug
```

### Resume Not Downloading

Ensure `resume.pdf` is in `public/` folder before building:

```bash
# Verify file exists
ls -la public/resume.pdf

# Rebuild
npm run build

# Check build folder
ls -la build/resume.pdf

# Deploy
firebase deploy
```

### 404 Errors

Check `firebase.json` has correct rewrites configuration for SPA.

### Slow Load Times

1. Check image optimization
2. Verify CDN is active
3. Review Network tab in DevTools
4. Use Lighthouse audit

## Cost Estimation

Firebase Hosting Free Tier:
- 10 GB storage
- 360 MB/day bandwidth
- Custom domain supported

This is more than sufficient for a portfolio site.

Typical portfolio usage:
- ~5 MB total size
- ~100 visitors/day = ~500 MB/day bandwidth
- Well within free tier limits

## Security

### Enable HTTPS

Firebase automatically provisions SSL certificates for:
- Default domains (*.web.app, *.firebaseapp.com)
- Custom domains (automatic Let's Encrypt)

### Security Headers

Add to `firebase.json`:

```json
{
  "headers": [
    {
      "source": "**",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Support

- Firebase Documentation: https://firebase.google.com/docs/hosting
- Firebase CLI Reference: https://firebase.google.com/docs/cli
- Community: https://firebase.google.com/support

## Quick Reference

```bash
# Build
npm run build

# Deploy
firebase deploy

# Deploy specific hosting site
firebase deploy --only hosting:site-name

# View current projects
firebase projects:list

# Switch project
firebase use project-id

# Check hosting details
firebase hosting:sites:list
```

---

**Your portfolio is now live and globally distributed! 🚀**
