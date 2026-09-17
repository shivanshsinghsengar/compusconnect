# 📝 CampusConnect - Command Reference

Quick reference for all commands you'll need.

---

## 🚀 Development Commands

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Runs on: http://localhost:3000

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

---

## 🗄️ Database Commands

### Generate Prisma Client
```bash
npx prisma generate
```
Run after changing schema.prisma

### Push Schema to Database
```bash
npx prisma db push
```
Creates/updates tables without migrations

### Create Migration
```bash
npx prisma migrate dev --name <migration-name>
```
Example: `npx prisma migrate dev --name add_user_fields`

### Open Prisma Studio
```bash
npx prisma studio
```
Visual database editor at http://localhost:5555

### Reset Database
```bash
npx prisma migrate reset
```
⚠️ Deletes all data!

### Format Schema
```bash
npx prisma format
```

---

## 🔧 Setup Commands

### Copy Environment Template
```bash
cp .env.example .env
```

### Generate NextAuth Secret
```bash
openssl rand -base64 32
```

### Create .env File (Windows)
```powershell
Copy-Item .env.example .env
```

---

## 🧹 Maintenance Commands

### Clear Next.js Cache
```bash
rm -rf .next
```
Windows:
```powershell
Remove-Item -Recurse -Force .next
```

### Clear Node Modules & Reinstall
```bash
rm -rf node_modules
npm install
```
Windows:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Update Dependencies
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

---

## 🐛 Debugging Commands

### Check TypeScript Errors
```bash
npx tsc --noEmit
```

### Check Prisma Schema
```bash
npx prisma validate
```

### View Database URL
```bash
# Unix/Mac
echo $DATABASE_URL

# Windows PowerShell
$env:DATABASE_URL
```

### Test Database Connection
```bash
npx prisma db pull
```

---

## 📦 Deployment Commands

### Build & Test Locally
```bash
npm run build
npm start
```

### Deploy to Vercel (CLI)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Push to Git
```bash
git add .
git commit -m "Your message"
git push origin main
```

---

## 🔄 Git Commands

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### Create New Branch
```bash
git checkout -b feature/your-feature
```

### Push New Branch
```bash
git push -u origin feature/your-feature
```

### Switch Branch
```bash
git checkout main
```

### Pull Latest Changes
```bash
git pull origin main
```

---

## 🧪 Testing Commands

### Run Type Check
```bash
npm run build
```

### Lint & Fix
```bash
npm run lint
```

---

## 📝 Package Management

### Add New Package
```bash
npm install package-name
```

### Add Dev Dependency
```bash
npm install -D package-name
```

### Remove Package
```bash
npm uninstall package-name
```

### List Installed Packages
```bash
npm list --depth=0
```

---

## 🔐 Environment Commands

### View All Environment Variables (Development)
```bash
# Unix/Mac
printenv | grep DATABASE

# Windows PowerShell
Get-ChildItem Env: | Where-Object {$_.Name -like "*DATABASE*"}
```

### Set Environment Variable (Temporary)
```bash
# Unix/Mac
export VARIABLE_NAME=value

# Windows PowerShell
$env:VARIABLE_NAME="value"
```

---

## 🚑 Emergency Commands

### If Server Won't Start
```bash
rm -rf .next
rm -rf node_modules
npm install
npx prisma generate
npm run dev
```

### If Database Issues
```bash
npx prisma generate
npx prisma db push
```

### If Build Fails
```bash
# Check TypeScript errors
npx tsc --noEmit

# Check dependencies
npm install

# Clear cache
rm -rf .next
npm run build
```

---

## 💡 Useful Combinations

### Fresh Start
```bash
rm -rf .next node_modules
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Pre-Deployment Check
```bash
npm run lint
npm run build
npm start
```

### Database Reset & Reseed
```bash
npx prisma migrate reset
npx prisma db push
npm run dev
```

---

## 📊 Monitoring Commands

### Check Port Usage
```bash
# Unix/Mac
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

### Kill Process on Port 3000
```bash
# Unix/Mac
kill -9 $(lsof -t -i:3000)

# Windows PowerShell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
```

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Install | `npm install` |
| DB push | `npx prisma db push` |
| Generate client | `npx prisma generate` |
| Open DB GUI | `npx prisma studio` |
| Lint | `npm run lint` |
| Clean cache | `rm -rf .next` |

---

## 📱 Scripts in package.json

Current available scripts:
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "postinstall": "prisma generate"
}
```

---

**Tip:** Add these to your terminal aliases for faster access!

```bash
# Add to ~/.bashrc or ~/.zshrc
alias ndev="npm run dev"
alias nbuild="npm run build"
alias pstudio="npx prisma studio"
alias pgen="npx prisma generate"
alias ppush="npx prisma db push"
```

---

**Happy developing! 🚀**
