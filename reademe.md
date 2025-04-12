# E-Commerce Website (MERN Stack)

## 📌 Project Overview
This is a **full-fledged eCommerce website** built using the **MERN (MongoDB, Express, React, Node.js) stack** with **Redux** for state management. The frontend is built with **Vite + Tailwind CSS**.

---

## 🏗️ Tech Stack
### **Frontend:**
- React (Vite)
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios
- React Toastify

### **Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Stripe/Razorpay (for payments)
- Multer (for file uploads)
- Cloudinary (for image storage)

### **Deployment:**
- Frontend: Vercel / Netlify
- Backend: Render / Vercel
- Database: MongoDB Atlas

---

## 📂 Folder Structure

### **Backend (`/server` folder)**
```
server/
│-- controllers/      # API logic (auth, products, orders, etc.)
│-- models/           # Mongoose models (User, Product, Order, Cart, etc.)
│-- routes/           # API endpoints
│-- middleware/       # Auth, error handling
│-- config/           # Database and environment config
│-- utils/            # Helper functions (JWT, email service, etc.)
│-- server.js         # Main entry file
```

### **Frontend (`/client` folder)**
```
client/
│-- src/
│   │-- components/
│   │   │-- layout/
│   │   │   │-- Navbar.jsx
│   │   │   │-- Footer.jsx
│   │   │-- ui/
│   │   │   │-- Button.jsx
│   │   │   │-- Loader.jsx
│   │-- pages/
│   │   │-- HomePage.jsx
│   │   │-- ProductListPage.jsx
│   │   │-- ProductDetailPage.jsx
│   │   │-- CartPage.jsx
│   │   │-- CheckoutPage.jsx
│   │   │-- ProfilePage.jsx
│   │   │-- OrdersPage.jsx
│   │-- features/       # Redux slices (auth, cart, orders, etc.)
│   │-- api/            # API calls with Axios
│   │-- store.js        # Redux store
│   │-- App.js          # Main app file
│   │-- index.js        # ReactDOM render
│-- public/
│-- package.json
```

---

## 📜 API Endpoints
### **Auth APIs:**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user (JWT-based)
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Send OTP via email
- `POST /api/auth/reset-password` - Reset password with OTP

### **Product APIs:**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product details
- `POST /api/products/add` - Add new product (Admin)
- `PUT /api/products/update/:id` - Update product (Admin)
- `DELETE /api/products/delete/:id` - Delete product (Admin)

### **Cart & Wishlist APIs:**
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/remove/:id` - Remove from wishlist

### **Order & Checkout APIs:**
- `POST /api/order/create` - Create new order
- `GET /api/order/:id` - Get order details
- `GET /api/order/all` - Get all user orders
- `POST /api/payment` - Payment processing (Stripe/Razorpay)

### **User Profile APIs:**
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/update-profile` - Update profile
- `POST /api/user/address` - Add/manage addresses
- `GET /api/user/saved-cards` - Get saved payment methods

---

## 🚀 Development Plan
### **📌 Phase 1: Backend Development**
✅ Set up Express server & connect to MongoDB
✅ Create authentication (JWT, bcrypt)
✅ Develop product & cart APIs
✅ Implement orders & payment integration
✅ Create admin panel (basic functionality)

### **📌 Phase 2: Frontend Development**
✅ Set up Vite + Tailwind + Redux
✅ Implement authentication pages (Login, Signup, Forgot Password)
✅ Build HomePage, Product Listing, Product Detail Page
✅ Add Cart & Checkout functionalities
✅ Implement user profile & order history
✅ Connect backend APIs using Axios

### **📌 Phase 3: Optimization & Deployment**
✅ Secure API routes with authentication middleware
✅ Optimize Redux state management
✅ Deploy backend on Render/Vercel
✅ Deploy frontend on Vercel/Netlify

---

## 📝 Redux State Management
### **Store the following in Redux:**
✅ **Auth State** – User details, login status
✅ **Cart State** – Items, total amount
✅ **Wishlist State** – Saved products
✅ **Products State** – All products data
✅ **Orders State** – Order details, status

---

## 🛠️ Setup Instructions
### **Backend Setup**
```bash
cd server
npm install
npm start  # Runs on port 5000
```

### **Frontend Setup**
```bash
cd client
npm install
npm run dev  # Runs on localhost:5173
```

---

## 🎯 Final Notes
- This project can be **expanded** with more admin functionalities.
- Consider adding **search & filters**, **pagination**, and **reviews with ratings**.
- Payment methods can include **Stripe, Razorpay, or PayPal**.

---

🚀 **This README ensures you have everything in one place while developing your eCommerce website.** Happy Coding! 🎉
