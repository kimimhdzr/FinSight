# 💼 Personal Financial Planning System

A modern, user-friendly web application designed to simplify personal financial management. This platform empowers users to budget smarter, track expenses, access real-time market insights, and receive AI-powered investment recommendations—all in one place.

---

## 🚀 Features

### 🔐 Authentication
- User registration, login, forgot password, and change password

### 👤 Profile Management
- Edit profile information
- Change password
- Upload profile picture

### 📊 Dashboard
- Quick overview of user’s financial health
- Real-time analytics and summaries

### 💸 Budgeting Module
- Budget planner for monthly/yearly goals
- Track expenses and spending habits
- Visual spending insights

### 📰 Market Insights Module
- Local & International financial news
- Integrated with APIs (Alpha Vantage, Yahoo Finance, or Finnhub)

### 🤖 AI Module
- AI-based investment strategy generator
- Personalized financial recommendations

### 📁 Exports & Reports
- Download PDF reports
- Printable financial plans and e-statements

### 🧮 Financial Tools
- Tax estimator  
- Investment calculator  
- Net worth calculator  
- Loan calculator  

---

## 🛠️ Tech Stack

**Frontend:**
- React.js  
- Tailwind CSS / Material UI  
- Axios  
- Recharts / Chart.js

**Backend:**
- Django / Node.js  
- Firebase Authentication  
- Firestore / PostgreSQL  
- Stripe (for premium features, if applicable)

**Third-party APIs:**
- Alpha Vantage / Yahoo Finance / Finnhub  
- OpenAI (for AI investment recommendations)  
- jsPDF (for exports)

---

## 📦 Installation

### Backend Setup

#### Django Backend
```bash
# Navigate to the backend folder
cd backend

# Create a virtual environment (optional but recommended)
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

### Frontend Setup (React)
```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

### ⚙️ Environment Variables
```bash
# Example .env for Backend
SECRET_KEY=your_django_secret_key
DEBUG=True
GOOGLE_APPLICATION_CREDENTIALS=path/to/firebase-adminsdk.json
FIREBASE_PROJECT_ID=your_project_id
```
### Example .env for Frontend
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
### 🧪 Testing
```bash
python manage.py test
```

---


### 📷 Screenshots Preview

| Landing Page | Login Page | Home Page | Profile Page |
|-----------------|-------------------|-------------|-------------|
| ![img1](./ss1.png) | ![img2](./ss2.png) | ![img3](./ss3.png) | ![img3](./ss3.png) |
---


### 📄 License

This project is licensed under the [MIT License](LICENSE).

---

### 👨‍💻 Contacts

📧 [Hakimi Mahadzir]  
🔗 [Linkedin](https://www.linkedin.com/in/hakimi-mahadzir-a16039295/)

📧 [Wan Muhammad Hisham]  
🔗 [Linkedin](https://www.linkedin.com/in/wmhisham/?originalSubdomain=my)

📧 [Tengku Mohamad Haikal]  
🔗 [Linkedin](https://www.linkedin.com/in/tengku-haikal-tengku-abdullah-651769291/)

📧 [Khaira Nafisa ]  
🔗 [Linkedin](https://www.linkedin.com/in/khaira-nafisa-7391aa228/?originalSubdomain=my)

📧 [Norfhazleyn Maryam ]  
🔗 [Linkedin]()


