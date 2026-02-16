# 🚨 Fix Your Vercel Deployment

You are seeing "Server Error" because your Vercel app cannot connect to your MongoDB database.

**This is normal!** You just need to change one setting in MongoDB Atlas.

## Step 1: Allow Access from Anywhere (Critical!)

1. Go to **[MongoDB Atlas](https://cloud.mongodb.com/)** and log in.
2. On the left sidebar, click **Network Access**.
3. You will see an IP Address listed there.
4. Click **Edit** (pencil icon).
5. Click the button that says **"Allow Access from Anywhere"** (or type `0.0.0.0/0`).
6. Click **Confirm**.

**Why?** Vercel's servers change IP addresses constantly. If you don't allow "Anywhere", Vercel gets blocked.

## Step 2: Check Environment Variables

1. Go to your project dashboard on **[Vercel](https://vercel.com/)**.
2. Click **Settings** -> **Environment Variables**.
3. Make sure you have these two variables:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your full connection string from Atlas (e.g. `mongodb+srv://user:password@cluster...`) |
| `AUTH_SECRET` | `xtWb8c4KqOoftPA1uAsOnb1C4HCzGPRAsfcB3Zrg5HQ=` |

## Step 3: Redeploy (Important!)

After changing these settings, you must redeploy for them to take effect.

1. Go to the **Deployments** tab in Vercel.
2. Click the **three dots (...)** next to your latest deployment.
3. Click **Redeploy**.

## ✅ Done!
Wait for the deployment to finish, then try signing in again. use a **new email** just in case.
