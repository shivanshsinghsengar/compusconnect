# CampusConnect Setup Guide

Quick setup guide to get CampusConnect running locally.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

### 3. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

---

## 🔑 Getting API Keys

### Google OAuth (Required for sign-in)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID
4. Add redirect: `http://localhost:3000/api/auth/callback/google`

### Cloudinary (Required for file uploads)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Dashboard → Account Details
3. Copy Cloud Name, API Key, API Secret

### Google Gemini (Required for AI summaries)
1. Visit [ai.google.dev](https://ai.google.dev)
2. Get API Key
3. Add to `.env` as `GEMINI_API_KEY`

### Neon Database (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create new database
3. Copy connection string

---

## 📝 Common Issues

### Prisma Client Error
```bash
npx prisma generate
```

### Database Connection Failed
- Check `DATABASE_URL` format
- Ensure database exists
- Verify credentials

### OAuth Not Working
- Check redirect URIs match exactly
- Verify `NEXTAUTH_URL` is correct
- Generate new `NEXTAUTH_SECRET`: `openssl rand -base64 32`

---

## 🎯 Next Steps

After setup:
1. Create an account
2. Upload your first note
3. Share an interview experience
4. Post anonymously

---

Need help? Open an issue on GitHub!
