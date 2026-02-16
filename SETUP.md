# 🚀 Quick Setup Guide

## Before Deploying to Vercel

You need to set up a PostgreSQL database first. Follow these steps:

### 1. Create a Neon Database (Recommended - Free)

1. Visit: https://console.neon.tech/
2. Sign up with GitHub
3. Click "Create a project"
4. Name it: `student-portal` (or any name you prefer)
5. Select a region close to you
6. **Copy the connection string** - it looks like:
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb
   ```

### 2. Update Your Local Environment

1. Open your `.env` file
2. Replace the `DATABASE_URL` line with your Neon connection string:
   ```
   DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb"
   ```
3. Keep your existing `AUTH_SECRET`

### 3. Initialize the Database

Run this command to create the database tables:
```bash
npx prisma migrate dev --name init
```

### 4. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and test that everything works.

### 5. Deploy to Vercel

```bash
# Commit your changes
git add .
git commit -m "Migrate to PostgreSQL for deployment"
git push origin main
```

Then:
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add these environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `AUTH_SECRET`: Copy from your `.env` file
4. Click **Deploy**

### 6. Run Migrations on Production

After deployment, you need to create the database tables in production:

Option A - Using Vercel CLI:
```bash
vercel env pull .env.production
npx prisma migrate deploy
```

Option B - Add to Vercel build command:
In Vercel dashboard, update build command to:
```bash
npx prisma generate && npx prisma migrate deploy && next build
```

## ✅ Done!

Your site should now be live! Visit the URL Vercel provides.

## 🆘 Need Help?

See `DEPLOYMENT.md` for detailed troubleshooting and alternative database providers.
