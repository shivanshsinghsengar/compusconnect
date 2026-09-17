# CampusConnect

**Version:** 1.1.1  
**A comprehensive platform for college students to share notes, track placements, and connect anonymously.**

![CampusConnect](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)

---

## 🚀 Features

### Phase 1 (MVP) ✅
- **Authentication**: Email/Password + Google OAuth
- **User Profiles**: Name, College, Branch, Year
- **Notes Sharing**:
  - Upload PDF/Images
  - Subject, Semester, Description
  - ✨ AI-Generated Summaries (Google Gemini)
  - Like, Bookmark, Download
  - View count tracking
  - Subject-wise colored cards
- **Dashboard**: Greeting, Stats, Recent Activity

### Phase 2 ✅
- **Placement Tracker**:
  - Share interview experiences (Company, Role, Difficulty, Rounds, Tips)
  - Personal application tracker
  - Status tracking (Applied, OA, Interview, Offer, Rejected)
- **Anonymous Board**:
  - Post Doubt / Confession / Career
  - Upvote system
  - Comment and reply
  - Complete anonymity

### Phase 3 (Future)
- AI Chatbot
- Leaderboard
- Dark Mode
- Admin tools

---

## 🎨 Design Philosophy

CampusConnect features a unique warm, friendly design:

- **Warm cream background** (#FDF8F3) - not pure white
- **Soft lavender sidebar** (#E6E6FA)
- **Pastel accent colors**: Mint, Peach, Soft Purple, Sky Blue
- **Colored left borders** on note cards (subject-wise)
- **Floating cards** with gentle shadows
- Modern, slightly playful yet professional feel

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn UI |
| **Backend** | Next.js API Routes |
| **Database** | PostgreSQL (Neon) with Prisma ORM |
| **Authentication** | NextAuth.js |
| **File Upload** | Cloudinary |
| **AI** | Google Gemini API |
| **Deployment** | Vercel + Neon |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or Neon account)
- Google OAuth credentials
- Cloudinary account
- Google Gemini API key

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campusconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Project Structure

```
campusconnect/
├── app/
│   ├── (dashboard)/          # Protected routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── notes/            # Notes features
│   │   ├── placements/       # Placement tracker
│   │   ├── anonymous/        # Anonymous board
│   │   └── profile/          # User profile
│   ├── api/                  # API routes
│   ├── auth/                 # Authentication pages
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # Shadcn UI components
│   ├── sidebar.tsx           # Navigation sidebar
│   └── navbar.tsx            # Top navigation
├── lib/
│   ├── prisma.ts             # Database client
│   ├── auth.ts               # NextAuth config
│   ├── gemini.ts             # AI integration
│   └── cloudinary.ts         # File upload
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

---

## 🔐 Authentication Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

---

## ☁️ Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables
   - Deploy

3. **Set up Neon Database**
   - Create account at [neon.tech](https://neon.tech)
   - Create a new database
   - Copy connection string to `DATABASE_URL`

4. **Run database migrations**
   ```bash
   npx prisma db push
   ```

---

## 📝 Database Schema

### Core Models
- **User**: Authentication and profile
- **Note**: Study materials with AI summaries
- **Placement**: Interview experiences
- **Application**: Personal job tracker
- **AnonymousPost**: Anonymous discussions
- **Comment**: Post comments
- **Like**: Note likes
- **Bookmark**: Saved notes

See `prisma/schema.prisma` for complete schema.

---

## 🎯 Key Features Explained

### AI-Generated Summaries
When a note is uploaded, Google Gemini automatically generates a 3-4 sentence summary highlighting key topics and concepts.

### Anonymous Board
Posts are completely anonymous - user names are never displayed, ensuring privacy for doubts, confessions, and career discussions.

### Placement Tracker
- **Interview Experiences**: Share and learn from others' interview journeys
- **Application Tracker**: Keep track of your own applications with status updates

### Subject-wise Color Coding
Notes are color-coded by subject for easy visual identification:
- Mathematics → Sky Blue
- Physics → Mint
- Chemistry → Peach
- Computer Science → Soft Purple

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Shivansh Singh Sengar**

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn for the beautiful UI components
- Google for Gemini AI API
- Vercel for hosting
- Neon for database

---

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Made with ❤️ for college students**
