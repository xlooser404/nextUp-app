# nextUP - Modern Task Management App


nextUP is a sleek, full-stack web application designed for modern task management. It provides a seamless and secure experience for users to register, log in, and manage their daily tasks through a clean, intuitive, and beautifully designed user interface.

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/d2b98f4f556ed3687e34571a1e11710337923470/home2.png)

---

## ✨ Features

-   **Secure User Authentication:** Full registration and login flow using JWT (JSON Web Tokens) for secure sessions.
-   **Email Verification:** Ensures users sign up with a valid email address.
-   **Password Reset:** A secure "forgot password" flow that emails a unique reset link to the user.
-   **Full CRUD for Tasks:** Create, Read, Update, and Delete your personal tasks.
-   **Advanced Filtering & Sorting:** Easily find the tasks that matter most by filtering by status (e.g., *In Progress*, *Completed*) and priority (*Low*, *Medium*, *High*), or sort them by date or priority.
-   **Modern & Responsive UI:** A stunning, eye-catching design built with Tailwind CSS and brought to life with smooth animations from Framer Motion.
-   **State Management:** Centralized and predictable state management on the frontend using Zustand.

---

## 🛠️ Tech Stack

-   **Frontend:**
    -   **Framework:** React (Vite)
    -   **Styling:** Tailwind CSS
    -   **Animations:** Framer Motion
    -   **Icons:** Lucide React
    -   **State Management:** Zustand
    -   **API Communication:** Axios
    -   **Notifications:** React Hot Toast
-   **Backend:**
    -   **Framework:** Node.js with Express
    -   **Database:** MongoDB with Mongoose
    -   **Authentication:** JSON Web Tokens (JWT)
    -   **Security:** `bcryptjs` for password hashing, `crypto` for token generation.
    -   **Emailing:** Nodemailer
-   **Development:**
    -   `nodemon` for automatic server restarts.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:
-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a connection string from MongoDB Atlas.

### Installation & Setup

The project is structured with a separate `backend` and `frontend`. You will need to install dependencies and configure environment variables for both.

#### **1. Backend Setup**

First, navigate to the backend directory and install the required packages.

```bash
# Navigate to the backend folder
cd backend

# Install all dependencies
npm install express cookie-parser nodemailer bcryptjs dotenv jsonwebtoken mongoose crypto

# Install nodemon as a development dependency
npm install --save-dev nodemon
```

Next, create a `.env` file in the `/backend` directory. This file will store your secret keys and database connection string. Copy the contents of `.env.example` into it and fill in your values.

**/backend/.env.example**
```env
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string_here

# JWT Secret Key (choose a long, random string)
JWT_SECRET=your_super_secret_jwt_key

# Frontend URL (for password reset links)
CLIENT_URL=http://localhost:5173

# Email Credentials (for Nodemailer - example for Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

#### **2. Frontend Setup**

Now, open a **new terminal window** and navigate to the frontend directory to install its dependencies.

```bash
# Navigate to the frontend folder
cd frontend

# Install all dependencies
npm install

# The following packages will be installed:
# Tailwind CSS, PostCSS, Autoprefixer (for styling)
# Framer Motion (for animations)
# Lucide React (for icons)
# Zustand (for state management)
# Axios (for API calls)
# React Hot Toast (for notifications)
```


---

## 🏃 Running the Application

To run the application, you need to start both the backend and frontend servers simultaneously in their respective terminal windows.

**In your first terminal (for the backend):**
```bash
cd backend
npm run dev  # Assuming you have a "dev": "nodemon server.js" script in your package.json
```
Your backend server should now be running on `http://localhost:5000`.

**In your second terminal (for the frontend):**
```bash
cd frontend
npm run dev
```
Your frontend development server will start, and you can now open your browser and navigate to `http://localhost:5173`.

##  UI/UX designs

# Signup Form

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/d2b98f4f556ed3687e34571a1e11710337923470/signup.png)


# verify-email

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/d2b98f4f556ed3687e34571a1e11710337923470/verify-email.png)

# Login Page

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/d2b98f4f556ed3687e34571a1e11710337923470/llogin.png)

# Reset-password page 

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/d2b98f4f556ed3687e34571a1e11710337923470/reset-password.png)

# Reset-password page - 2 

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/d2b98f4f556ed3687e34571a1e11710337923470/reset-password-2.png)

# Create new password

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/1e6e9330576187cc89b8fe5826f4f536567bfe43/choose%20password.png)

# Home Page

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/d2b98f4f556ed3687e34571a1e11710337923470/home.png)

# Home page with task 

![Image Alt](https://github.com/xlooser404/nextUp-app/blob/d2b98f4f556ed3687e34571a1e11710337923470/home2.png)

# Add task Function 


 






