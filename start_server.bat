@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"

echo Checking environment...
node -v
npm -v

if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

echo Starting development server...
echo Access the website at: http://localhost:3000
npm run dev
pause
