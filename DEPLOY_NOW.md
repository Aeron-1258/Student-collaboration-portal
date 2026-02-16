# 🚀 Deployment Checklist (MongoDB Edition)

Your code is ready to deploy! Follow these steps to get your site live with MongoDB.

## ✅ Completed
- [x] Migrated to MongoDB (schema & env)
- [x] Updated documentation
- [x] Committed changes to Git
- [x] Pushed to GitHub

## 📝 Next Steps (Do These Now)

### 1️⃣ Create MongoDB Atlas Account (5 minutes)

1. Open: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Create an account
4. Create a **Shared Cluster** (Free Tier)
5. **Create a Database User**:
   - Go to "Database Access"
   - Add new user (remember password!)
6. **Whitelist IP Address**:
   - Go to "Network Access"
   - Add IP Address
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
7. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Drivers"
   - Copy string (e.g., `mongodb+srv://user:pass@cluster...`)

### 2️⃣ Deploy to Vercel

1. Go to: https://vercel.com/new
2. Import your repository: `Student-Project-collaboration-portal`
3. **Add Environment Variables**:
   - `DATABASE_URL`: Paste your Atlas connection string
   - `AUTH_SECRET`: `xtWb8c4KqOoftPA1uAsOnb1C4HCzGPRAsfcB3Zrg5HQ=`
4. Click **Deploy**

### 3️⃣ Test Your Live Site! 🎉

1. Click the deployment URL
2. Register a new user
3. Create a project

## ❓ Common Questions

**Q: Can I use my local MongoDB Compass database for the live site?**
A: **No.** Your local database only lives on your computer. Vercel needs a cloud database (like MongoDB Atlas) to access your data from the internet.

**Q: Do I need to run migrations on production?**
A: With MongoDB, usually **no**. Prisma + MongoDB works without explicit migration commands (`migrate deploy`). The schema is applied when you generate the client. However, if Vercel build fails, ensure `npx prisma generate` is running (it usually is by default).

## 🆘 Need Help?

See `DEPLOYMENT.md` for more details.
