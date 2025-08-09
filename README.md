# Food Delivery WebApp

A full-stack MERN (MongoDB, Express, React, Node.js) food delivery platform with Stripe payment integration, order tracking, and an admin dashboard.

## Features

- **User Side**
  - Browse food menu and categories
  - Add/remove items to cart
  - Place orders with address input
  - Stripe payment integration
  - View and track past orders
  - Login/logout functionality

- **Admin Panel**
  - Add, edit, and delete food items
  - View and manage orders

- **Backend**
  - RESTful API for food, user, cart, and order management
  - JWT authentication middleware
  - Stripe payment session creation and verification
  - MongoDB for data storage

## Project Structure

```
Food Dev/
│
├── Backend/      # Node.js + Express + MongoDB backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/          # Uploaded food images
│   ├── .env              # (Not committed) Environment variables
│   └── server.js
│
├── Frontend/     # React user-facing frontend (Vite)
│   ├── src/
│   ├── public/
│   └── .gitignore
│
├── admin/        # React admin dashboard (Vite)
│   ├── src/
│   ├── public/
│   └── .gitignore
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- Stripe account (for payment integration)

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/<your-username>/<your-repo>.git
   cd Food\ Dev
   ```

2. **Backend**
   - Copy `Backend/.env.example` to `Backend/.env` and fill in your MongoDB URI and Stripe secret key.
   - Install dependencies and start the server:
     ```sh
     cd Backend
     npm install
     npm run server
     ```

3. **Frontend**
   - Install dependencies and start the app:
     ```sh
     cd ../Frontend
     npm install
     npm run dev
     ```

4. **Admin Panel**
   - Install dependencies and start the admin dashboard:
     ```sh
     cd ../admin
     npm install
     npm run dev
     ```

## Environment Variables

**Never commit your `.env` files!**  
Example for `Backend/.env`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
``
