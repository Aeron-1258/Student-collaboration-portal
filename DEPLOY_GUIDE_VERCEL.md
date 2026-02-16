# 🌍 Deploy to Vercel: Complete Guide

Since you are moving from Localhost (your computer) to Vercel (the cloud), you need a **Cloud Database**. Follow these exact steps.

---

> **Note on Git:** We have configured `.gitignore` to exclude the local `mongo-data` folder and `start-db.bat` script. This prevents large database files and local scripts from being uploaded to Vercel/GitHub.

---

## 1️⃣ Set Up MongoDB Atlas (Cloud Database)

1.  **Create Account/Login:**
    *   Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
    *   Sign up (Google login is easiest).

2.  **Create a Cluster:**
    *   Click **+ Create** (or "Build a Database").
    *   Select **M0 Free** (Shared).
    *   Provider: **AWS**.
    *   Region: Choose one close to you (e.g., N. Virginia `us-east-1`).
    *   Click **Create Deployment**.

3.  **Create Database User:**
    *   **Username:** `admin` (or whatever you like).
    *   **Password:** `securepassword123` (Make sure to **COPY** this! You will need it).
    *   Click **Create Database User**.

4.  **Network Access (Critical!):**
    *   Go to **Network Access** in the left sidebar.
    *   Click **+ Add IP Address**.
    *   Select **Allow Access from Anywhere** (`0.0.0.0/0`).
    *   Click **Confirm**.

5.  **Get Connection String:**
    *   Go to **Database** in the left sidebar.
    *   Click **Connect** on your cluster.
    *   Select **Drivers** (Node.js).
    *   **Copy the string.** It looks like:
        `mongodb+srv://admin:<db_password>@cluster0.abcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

---

## 2️⃣ Set Up Vercel Environment Variables

1.  **Go to Vercel:**
    *   Open your [Vercel Dashboard](https://vercel.com/dashboard).
    *   Select your project (`student-collaboration-portal` or similar).

2.  **Go to Settings:**
    *   Click the **Settings** tab at the top.
    *   Click **Environment Variables** on the left.

3.  **Add `DATABASE_URL`:**
    *   **Key:** `DATABASE_URL`
    *   **Value:** Paste your MongoDB connection string from step 1.
    *   **IMPORTANT:** Replace `<db_password>` with your actual password!
        *   Example: `mongodb+srv://admin:securepassword123@cluster0...`
    *   **VERY IMPORTANT:** If your password has special characters (like `@`, `:`, etc.), make sure to URL encode them! Or choose a simple password for testing.

4.  **Add `AUTH_SECRET`:**
    *   **Key:** `AUTH_SECRET`
    *   **Value:** `xtWb8c4KqOoftPA1uAsOnb1C4HCzGPRAsfcB3Zrg5HQ=` (or generate a new random string).

---

## 3️⃣ Redeploy

1.  Go to the **Deployments** tab in Vercel.
2.  Click the **three dots** (...) next to your failed deployment.
3.  Click **Redeploy**.
4.  Wait for the build. It should now pass! 🎉
