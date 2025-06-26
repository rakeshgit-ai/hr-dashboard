# HR Dashboard (Advanced)

## 🔧 Tech Stack

- **React (with Next.js App Router)**
- **Tailwind CSS**
- **JavaScript (ES6+)**
- **State Management:** Zustand
- **Optional Bonus:** Chart.js, NextAuth.js

---

## 🚀 Challenge: Build a Mini HR Performance Dashboard

A dashboard for HR Managers to track employee performance, manage bookmarks, and view detailed insights.

---

## 🎯 Core Features

### 1. 🏠 Dashboard Homepage (`/`)
- Fetches and displays dummy user data.
- User cards show: Full Name, Email, Age, Department, Performance Rating (stars), and actions: View, Bookmark, Promote.

### 2. 🔍 Search & Filter
- Search bar to filter users by name, email, or department (case-insensitive).
- Multi-select filter by department and performance rating.

### 3. 👤 Dynamic User Details Page (`/employee/[id]`)
- Detailed profile: Address, Phone, Bio, Past performance history.
- Performance rating as stars and color-coded badges.
- Tabbed UI: Overview, Projects, Feedback (dynamic loading, mock data).

### 4. 📌 Bookmark Manager (`/bookmarks`)
- Lists all bookmarked employees.
- Allows removing bookmarks, “Promote”, and “Assign to Project” actions.

### 5. 📊 Analytics Page (`/analytics`)
- Chart.js analytics: Department-wise average ratings, bookmark trends (mocked).
- (Optional) Server-side rendering or static generation.

---

## ⚙️ Tech Requirements

- **Next.js App Router**
- **Client-side data fetching**
- **Custom hooks** (Zustand store as `useBookmarkStore`)
- **Reusable components** (UserCard, SearchFilterBar, Button)
- **Responsive design** (Mobile to Desktop)
- **Dark/Light mode** (Tailwind classes)

---

## 🧠 Advanced Expectations

- Proper state management (Zustand)
- Component-level loading & error states
- Modular folder structure (`components/`, `store/`, `app/`)
- Form handling (Feedback tab)
- Responsive and keyboard-accessible

---

## ⭐️ Bonus (Extra Points)

- Authentication (NextAuth.js or mock login)
- “Create User” modal/page with validation
- Pagination or infinite scroll
- Animated tab/content transitions

---

## 📦 Setup Instructions

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
  app/
    page.tsx                # Dashboard
    bookmarks/page.tsx      # Bookmarks Manager
    employee/[id]/page.tsx  # Employee Details
    analytics/page.tsx      # Analytics (if implemented)
    layout.tsx              # App Layout
  components/
    UserCard.tsx
    SearchFilterBar.tsx
  store/
    bookmarkStore.ts        # Zustand store
```

---

## ✅ Features Implemented

- All core features and tech requirements are implemented as per client requirements.
- Zustand is used for global bookmark state.
- Responsive, dark/light mode, and modular codebase.

---

## 📸 Screenshots

_Add screenshots here to showcase the dashboard, bookmarks, and analytics pages._

---

## 📤 Deploy

Deployed on Vercel: [your-vercel-link](https://your-vercel-link.vercel.app)

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)