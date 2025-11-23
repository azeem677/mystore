# Firebase Deployment Guide for MyStore

## Prerequisites
- Firebase CLI installed globally: `npm install -g firebase-tools`
- Firebase project created at https://console.firebase.google.com
- Logged in to Firebase: `firebase login`

## Deployment Steps

### 1. Initialize Firebase (if not already done)
```powershell
firebase init
```
Select these options:
- Hosting: Configure files for Firebase Hosting
- Choose your Firebase project
- Answer 'N' for setting up GitHub Actions

### 2. Build the Next.js Application
```powershell
npm run build
```
This creates a `.next` folder with the optimized production build.

### 3. Deploy to Firebase Hosting
```powershell
firebase deploy
```

Or use the npm script:
```powershell
npm run deploy
```

## Project Configuration

### next.config.js
- Uses `output: 'standalone'` mode which creates a server that can be deployed to Node.js environments
- Images are optimized with Next.js Image Optimization
- Tailwind CSS is configured for styling

### firebase.json
- Hosting configuration points to static assets
- Configured for Next.js standalone output

## Features Deployed
- ✅ E-commerce product listing
- ✅ Shopping cart functionality (Redux state management)
- ✅ Product details page with dynamic routing
- ✅ Dashboard for admin product management
- ✅ Order tracking
- ✅ Search functionality
- ✅ Responsive design with Tailwind CSS

## Environment Variables
If you have sensitive data, create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=your_backend_url
```

## Troubleshooting

### Build Fails
- Clear cache: `rm -r .next .firebase`
- Ensure all dependencies are installed: `npm install`
- Check Node version: `node --version` (should be 18+)

### Deployment Issues
- Check Firebase project is selected: `firebase projects:list`
- Verify you're logged in: `firebase login --reauth`
- Check deployment logs: `firebase functions:logs`

## Performance Optimization
- Static files are cached with long-term caching headers
- Images use Next.js Image Optimization
- Code splitting and bundling are automatic with Next.js

## Support
For more information:
- Next.js: https://nextjs.org/docs
- Firebase Hosting: https://firebase.google.com/docs/hosting
- Firebase CLI: https://firebase.google.com/docs/cli
