/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(process.cwd(), '.env.local');

console.log('🔍 Checking environment configuration...');

if (!fs.existsSync(envLocalPath)) {
    console.error('❌ .env.local file not found!');
    console.log('   Please create .env.local in the root directory.');
    process.exit(1);
} else {
    console.log('✅ .env.local file found.');
}

// Try to read the file content to check for DATABASE_URL
const content = fs.readFileSync(envLocalPath, 'utf8');
const hasDatabaseUrl = content.includes('DATABASE_URL=');
const hasAuthSecret = content.includes('AUTH_SECRET=');

const mongoose = require('mongoose');

// ... (existing checks)

if (hasDatabaseUrl) {
    console.log('✅ DATABASE_URL is defined in .env.local');

    // Extract the URL (simple parsing for the test)
    const dbUrlMatch = content.match(/DATABASE_URL="([^"]+)"/);
    if (!dbUrlMatch) {
        console.log("Could not parse DATABASE_URL from file for testing.");
        process.exit(0);
    }
    const dbUrl = dbUrlMatch[1];

    console.log(`🔌 Testing connection to: ${dbUrl}`);

    mongoose.connect(dbUrl, { serverSelectionTimeoutMS: 5000 })
        .then(() => {
            console.log('✅ Successfully connected to MongoDB!');
            console.log('\n🎉 Local environment is fully operational!');
            console.log('   Run "npm run dev" to start the development server.');
            process.exit(0);
        })
        .catch(err => {
            console.error('❌ Failed to connect to MongoDB:', err.message);
            console.log('   Make sure your MongoDB server is running (check start-db.bat).');
            process.exit(1);
        });

} else {
    console.warn('⚠️ DATABASE_URL not found in .env.local');
    console.log('   Please add DATABASE_URL to .env.local');
    process.exit(1);
}

