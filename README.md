# Quiz Builder Application 🎯

Full-stack quiz application with Spring Boot backend and React frontend.

## 🚀 Features
- User authentication with JWT
- Create custom quizzes
- Take quizzes with instant results
- Real-time leaderboard
- Responsive modern UI

## 🛠️ Tech Stack
- **Frontend**: React 18 + Vite
- **Backend**: Spring Boot 3 + Java 21
- **Database**: MySQL 8
- **Security**: JWT Authentication

## 📦 Quick Start

### Prerequisites
- Java 21
- Node.js 20+
- MySQL 8
- Maven 3.9+

### Backend Setup
cd quiz-backend
mvn spring-boot:run

text
Access: http://localhost:8081

### Frontend Setup
cd quiz-frontend
npm install
npm run dev

text
Access: http://localhost:3000

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Quiz Management
- `POST /api/quizzes` - Create quiz
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/{id}` - Get quiz by ID
- `POST /api/quizzes/{id}/submit` - Submit quiz answers
- `GET /api/quizzes/leaderboard` - Get leaderboard

## 📧 Contact
Created by [@NNiteeshk](https://github.com/NNiteeshk)

## 📄 License
MIT License