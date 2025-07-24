# 📧 Smart Email Assistant

An AI-powered application that generates intelligent, context-aware email replies based on user input and tone preferences.

> 💡 Built using **React + Clerk** (Frontend) and **Spring Boot + Gemini API + Docker** (Backend)  
> 🌐 **Live Frontend**: [email-assistant-omega.vercel.app](https://email-assistant-omega.vercel.app)  
> 🛠️ **Live Backend**: [email-assistant-kb9h.onrender.com/api](https://email-assistant-kb9h.onrender.com/api)

---

## 🔥 Project Screenshots

### ✅ Login Page (Live Clerk Auth)
![Login Page](https://raw.githubusercontent.com/Soham1500/Email-Assistant/main/Email-Frontend/src/assets/login-page.png)

### ✅ Backend API Running on Render
![Backend Render](https://raw.githubusercontent.com/Soham1500/Email-Assistant/main/Email-Frontend/src/assets/backend-render.png)

### ✅ Clerk Sign-Up Page
![Sign Up Page](https://raw.githubusercontent.com/Soham1500/Email-Assistant/main/Email-Frontend/src/assets/signUp/signup-page.png)

---

## ⚙️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React (Vite), Material UI, Clerk Auth, Axios, Framer Motion |
| Backend    | Spring Boot 3, Java 23, WebClient, Gemini API |
| Auth       | Clerk.dev |
| Deployment | Vercel (Frontend), Render (Backend - Dockerized) |
| AI Model   | Google Gemini via OpenRouter API |
| Database   | PostgreSQL (Render Free Tier) |

---

## 🚀 Live Demo

👉 Try the app here:  
**🔗 [https://email-assistant-omega.vercel.app](https://email-assistant-omega.vercel.app)**  
Login using Clerk and start generating email replies with AI.

---

## ✨ Features

- 🔐 **Secure Auth** via Clerk (Sign in / Sign out)
- 🧠 **AI-powered replies** using Google Gemini
- 🎨 **Tone Selector** (Professional, Friendly, Casual)
- 💡 **Dark Mode Toggle**
- 📤 **Copy to Clipboard** functionality
- 🚀 **Live Deployed** with working Render + Vercel

---

## 🧠 How it Works

1. User logs in via Clerk.
2. Enters:
   - Original email content
   - Topic (optional)
   - Desired tone
3. Frontend calls secure Spring Boot backend with Clerk JWT token.
4. Backend uses Gemini API to generate an appropriate email reply.
5. The reply is shown and can be copied.

---

## 🐳 Deploying Backend to Render using Docker

### 🧱 Dockerfile (Spring Boot)

```dockerfile
FROM eclipse-temurin:23-jdk-alpine
VOLUME /tmp
COPY target/email-writer-sb-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
