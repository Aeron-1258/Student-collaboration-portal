# 🚀 Deployment Checklist

Your code is ready to deploy! Follow these steps to get your site live.

## ✅ Completed
- [x] Migrated from SQLite to PostgreSQL
- [x] Updated Prisma schema
- [x] Created deployment documentation
- [x] Committed changes to Git
- [x] Pushed to GitHub

## 📝 Next Steps (Do These Now)

### 1️⃣ Create Neon Database (5 minutes)

1. Open: https://console.neon.tech/
2. Click **"Sign up"** (use GitHub for easy login)
3. Click **"Create a project"**
4. Name: `student-portal`
5. Region: Choose closest to you
6. Click **"Create project"**
7. **COPY the connection string** - looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb
   ```
   ⚠️ **Save this!** You'll need it in the next steps.

### 2️⃣ Update Local Environment

1. Open `.env` file in your project
2. Replace the `DATABASE_URL` line with your Neon connection string:
   ```env
   DATABASE_URL="postgresql://your-connection-string-here"
   AUTH_SECRET="xtWb8c4KqOoftPA1uAsOnb1C4HCzGPRAsfcB3Zrg5HQ="
   ```

### 3️⃣ Initialize Database

Run this command in your terminal:
```bash
npx prisma migrate dev --name init
```

This creates the database tables in your Neon database.

### 4️⃣ Test Locally (Optional but Recommended)

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- Register a new user
- Login
- Create a project

If everything works, proceed to deployment!

### 5️⃣ Deploy to Vercel

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your repository: `Student-Project-collaboration-portal`
4. Click **"Import"**
5. **IMPORTANT**: Before clicking Deploy, add Environment Variables:
   - Click **"Environment Variables"**
   - Add `DATABASE_URL`: Paste your Neon connection string
   - Add `AUTH_SECRET`: Copy from your `.env` file
6. Click **"Deploy"**

### 6️⃣ Wait for Deployment (2-3 minutes)

Vercel will build and deploy your site. You'll see a progress screen.

### 7️⃣ Run Production Migrations

After deployment completes, you need to create the database tables in production.

**Option A - Quick Method (Recommended)**:
1. In Vercel dashboard, go to your project
2. Click **Settings** → **General**
3. Scroll to **"Build & Development Settings"**
4. Change **"Build Command"** to:
   ```bash
   npx prisma generate && npx prisma migrate deploy && next build
   ```
5. Go to **Deployments** tab
6. Click the **"..."** menu on the latest deployment
7. Click **"Redeploy"**

**Option B - Using Vercel CLI**:
```bash
npm i -g vercel
vercel login
vercel link
npx prisma migrate deploy
```

### 8️⃣ Test Your Live Site! 🎉

1. Click the deployment URL Vercel provides
2. Test the features:
   - [ ] Register a new user
   - [ ] Login
   - [ ] Create a project
   - [ ] View projects
   - [ ] Send join requests

## 🎊 Success!

Your site is now live and accessible to anyone!

## 📚 Documentation

- **Quick Start**: See `SETUP.md`
- **Detailed Guide**: See `DEPLOYMENT.md`
- **What Changed**: See the walkthrough artifact

## 🆘 Having Issues?

Common problems and solutions:

**"Can't reach database server"**
- Check that `DATABASE_URL` is set correctly in Vercel
- Verify your Neon database is active

**"Environment variable not found"**
- Make sure you added both `DATABASE_URL` and `AUTH_SECRET` in Vercel
- Redeploy after adding environment variables

**Build fails**
- Check the build logs in Vercel dashboard
- Ensure environment variables are set correctly

**Database tables not created**
- Make sure you ran the migration (Step 7)
- Check Neon dashboard to see if tables exist
