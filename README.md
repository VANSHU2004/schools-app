# 🏫 Schools Management App

A **full-stack Next.js + MySQL** web application to manage schools with features like:
- 📋 List of schools with search, filter, and pagination
- ➕ Add new schools with form validation (React Hook Form)
- 🖼️ Image upload and storage
- 🔍 School detail view in a modal (with animations & blur background)
- ✅ Frontend + Backend validation (unique email & contact numbers)
- ⚡ Skeleton loaders for sleek UI
- 🎨 Tailwind CSS for responsive styling

---

## 🚀 Tech Stack
- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** MySQL (hosted on Railway)
- **Form Handling:** React Hook Form
- **Deployment:** Vercel + Railway (cloud DB)

---

## 🛠️ Features
- **Search & Filter:** Instantly find schools by name, city, or state
- **Pagination:** Optimized display for large data sets
- **Add School Form:**
  - Validates required fields
  - Unique email & contact enforced
  - Uploads and stores school image
- **School Details:** Click on a school card to view details in a modal
- **Responsive UI:** Works across mobile, tablet, and desktop
- **Clean UX:** Skeleton loading states + empty state message

---

## ⚡ Getting Started

### 1. Clone Repo
```bash
git clone https://github.com/VANSHU2004/schools-app.git
cd schools-app
```

2. Install Dependencies

```bash
Copy code
npm install
```
3. Setup Environment Variables
Create .env.local file:

```env
Copy code
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASS=your-db-password
DB_NAME=schools_db
```
4. Run Locally
```bash
Copy code
npm run dev
```
Visit http://localhost:3000.

5. Deploy
Frontend: Vercel

Database: Railway / PlanetScale

💡 Future Enhancements
Edit & Delete school records

JWT-based authentication

Role-based access (Admin / Teacher)

Export data (CSV / Excel)

Dark mode 🌙

👨‍💻 Author
Made with ❤️ by Atul Sharma
