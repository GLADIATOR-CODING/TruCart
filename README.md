# TruCart 🛒

> **Compare food delivery prices across Zomato, Swiggy, MagicPin & DigiHaat — save money on every order.**

## 🧠 Problem Statement

Ordering food online? The same item can cost ₹50–₹100 more on one platform compared to another — once you factor in delivery fees, taxes, and platform charges. But nobody has time to open 4 apps and do the math every time.

**TruCart solves this** by comparing prices side-by-side in real time, showing you the cheapest option instantly.

**Who is this for?** Anyone who orders food online regularly and wants to stop overpaying.  
**Why does it matter?** Users typically save ₹50–₹100 per order. That's ₹1,500–₹3,000/month for regular users.

## ✨ Features

- 🔐 **Authentication** — Email/Password + Google Sign-In (Firebase Auth)
- 🏠 **Personalized Home** — User greeting, favorites, category tiles with 3D tilt effect
- 🔍 **Smart Search** — Debounced search with live filtering across restaurants & menu items
- 📊 **Price Comparison** — Side-by-side pricing across 4 platforms with animated "race" visualization
- ❤️ **Favorites** — Add/remove restaurants, synced to Firestore in real-time
- 📈 **Dashboard** — Total savings, comparison history, and favorites overview
- 👤 **Profile** — Edit name, location; view account info
- 🎯 **Onboarding** — First-time user personalization flow
- 💾 **Save Comparisons** — Store price comparisons to Firestore for history tracking
- 🛡️ **Protected Routes** — Auth-guarded pages with redirect
- ⚡ **Performance** — React.lazy code splitting, useMemo, useCallback, debounced inputs
- 🎨 **Glassmorphic UI** — Neumorphic 3D glass design system, Framer Motion animations
- 📱 **Responsive** — Mobile-first design, works on all screen sizes

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite 8 | Build tool |
| React Router 7 | Client-side routing |
| Firebase Auth | Authentication (Email + Google) |
| Cloud Firestore | Database (user data, favorites, history) |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | Animations & page transitions |
| Lucide React | Icon library |

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── CountUp.jsx
│   ├── ErrorBoundary.jsx
│   ├── LoadingSkeleton.jsx
│   ├── MenuItem.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── RestaurantCard.jsx
│   ├── TiltTile.jsx
│   └── Toast.jsx
├── context/          # Global state management
│   ├── AuthContext.jsx
│   └── FavoritesContext.jsx
├── hooks/            # Custom React hooks
│   ├── useCountUp.js
│   └── useDebounce.js
├── pages/            # Route-level page components
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Onboarding.jsx
│   ├── Profile.jsx
│   ├── RestaurantPage.jsx
│   ├── SearchPage.jsx
│   └── Signup.jsx
├── services/         # Firebase configuration & API layer
│   ├── firebase.js
│   └── firestore.js
├── data/             # Static restaurant & menu data
│   └── mockDatabase.js
├── App.jsx           # Root component with providers & routing
├── main.jsx          # Entry point
└── index.css         # Global styles & design system
```

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/trucart.git
   cd trucart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable **Email/Password** and **Google** sign-in methods
   - Create a **Firestore database** (start in test mode)
   - Copy your web app config into `src/services/firebase.js`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:5173](http://localhost:5173)

## ⚛️ React Concepts Used

### Core
- Functional Components, Props, State (`useState`), Side Effects (`useEffect`), Conditional Rendering, Lists & Keys

### Intermediate
- Context API (`AuthContext`, `FavoritesContext`), Controlled Components, React Router (protected routes, params, search params), Lifting State Up

### Advanced
- `useMemo`, `useCallback`, `useRef`, `React.lazy` + `Suspense`, Custom Hooks (`useCountUp`, `useDebounce`), Error Boundaries, Performance Optimization
