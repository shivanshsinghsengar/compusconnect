# 🎓 Getting Started with CampusConnect

Welcome! This guide will help you get CampusConnect running on your local machine in minutes.

---

## 🚀 Quick Start (5 Minutes)

### 1️⃣ Install Dependencies (1 min)
```bash
npm install
```

### 2️⃣ Set Up Environment (2 min)
```bash
cp .env.example .env
```

Edit `.env` with your credentials (see below for where to get them).

### 3️⃣ Initialize Database (1 min)
```bash
npx prisma generate
npx prisma db push
```

### 4️⃣ Start Development Server (1 min)
```bash
npm run dev
```

**🎉 Done!** Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Getting Your API Keys (15 Minutes Total)

### Database - Neon (3 minutes)
**Free PostgreSQL database in the cloud**

1. Visit [neon.tech](https://neon.tech)
2. Sign up with GitHub
3. Create a new project
4. Copy the connection string
5. Paste in `.env` as `DATABASE_URL`

✅ **Example:**
```env
DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"
```

---

### Authentication - NextAuth (1 minute)

Generate a secret:
```bash
openssl rand -base64 32
```

Add to `.env`:
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<paste-generated-secret>"
```

---

### Google OAuth (5 minutes)
**Required for "Sign in with Google"**

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project (or select existing)
3. Navigate: **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen (if first time):
   - User Type: External
   - App name: CampusConnect
   - User support email: your email
   - Save
6. Create OAuth Client:
   - Application type: Web application
   - Name: CampusConnect
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
   - Create
7. Copy **Client ID** and **Client Secret**

Add to `.env`:
```env
GOOGLE_CLIENT_ID="your-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-secret"
```

---

### Cloudinary (3 minutes)
**For uploading notes (PDF/images)**

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Find these values:
   - Cloud Name
   - API Key
   - API Secret

Add to `.env`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

---

### Google Gemini AI (3 minutes)
**For AI-generated note summaries**

1. Visit [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key in Google AI Studio"
3. Sign in with Google
4. Click "Get API Key"
5. Create new key or use existing
6. Copy the API key

Add to `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key"
```

---

## ✅ Verify Setup

After setting up, test these:

### 1. Database Connection
```bash
npx prisma studio
```
Should open Prisma Studio at http://localhost:5555

### 2. Start Dev Server
```bash
npm run dev
```
Should show:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in Xms
```

### 3. Test Authentication
1. Visit http://localhost:3000
2. Click "Sign Up"
3. Create account with email
4. Try "Sign in with Google"

### 4. Test Notes Upload
1. Go to Notes → Upload Notes
2. Fill in details
3. Upload a PDF or image
4. Check if AI summary generates

---

## 📁 Project Structure

```
campusconnect/
├── app/                      # Next.js App Router
│   ├── (dashboard)/         # Protected pages
│   │   ├── dashboard/       # Main dashboard
│   │   ├── notes/           # Notes features
│   │   ├── placements/      # Placement tracker
│   │   ├── anonymous/       # Anonymous board
│   │   └── profile/         # User profile
│   ├── api/                 # API routes
│   └── auth/                # Auth pages
├── components/              # React components
│   ├── ui/                  # Shadcn UI components
│   ├── sidebar.tsx          # Navigation
│   └── navbar.tsx           # Top bar
├── lib/                     # Utilities
│   ├── prisma.ts           # Database client
│   ├── auth.ts             # NextAuth config
│   ├── gemini.ts           # AI integration
│   └── cloudinary.ts       # File uploads
├── prisma/
│   └── schema.prisma       # Database schema
└── public/                 # Static files
```

---

## 🎯 First Steps After Setup

### Create Your First Content

1. **Upload a Note:**
   - Dashboard → Upload Notes
   - Add title, subject, semester
   - Upload PDF/image
   - See AI summary generate!

2. **Share Interview Experience:**
   - Placements → Share Experience
   - Add company, role, details
   - Help others prepare!

3. **Post Anonymously:**
   - Anonymous Board → Create Post
   - Ask doubts or share thoughts
   - Stay completely anonymous!

---

## 🐛 Troubleshooting

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Database connection failed"
- Check `DATABASE_URL` format
- Ensure database exists
- Verify network connection

### "Google OAuth not working"
- Check redirect URI matches exactly
- Verify credentials are correct
- Clear browser cache

### "Cloudinary upload fails"
- Verify API keys
- Check file size (max 10MB)
- Test with smaller file

### "AI summary not generating"
- Check Gemini API key
- Verify API quota
- Check network connection

---

## 💡 Tips

- **Use Prisma Studio** to view/edit database: `npx prisma studio`
- **Check logs** in terminal for errors
- **Clear Next.js cache** if issues: `rm -rf .next`
- **Restart dev server** after .env changes

---

## 📚 Learning Resources

- **Next.js:** [nextjs.org/learn](https://nextjs.org/learn)
- **Prisma:** [prisma.io/docs](https://prisma.io/docs)
- **Tailwind:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **NextAuth:** [next-auth.js.org](https://next-auth.js.org)

---

## 🤝 Need Help?

- 📖 Check [README.md](./README.md)
- 🚀 See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- ✨ Review [FEATURES.md](./FEATURES.md)
- 🐛 Open an issue on GitHub

---

## 🎉 You're Ready!

Start building your campus community platform!

**Happy Coding! 🚀**
