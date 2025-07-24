
# 📧 Smart Email Assistant

An AI-powered application that generates intelligent, context-aware email replies based on user input and tone preferences.

> 💡 Built using **React + Clerk** (Frontend) and **Spring Boot + Gemini API + Docker** (Backend)  
> 🌐 **Live Frontend**: [email-assistant-omega.vercel.app](https://email-assistant-omega.vercel.app)  
> 🛠️ **Live Backend**: [email-assistant-kb9h.onrender.com/api](https://email-assistant-kb9h.onrender.com/api)

---

## 🔥 Project Screenshots

### ✅ Login Page (Live Clerk Auth)

![Login Page](./assets/login-page.png)

### ✅ Backend API Running on Render

![Backend Render](./assets/backend-render.png)

### ✅ Clerk Sign-Up Page

![Sign Up Page](./assets/signUp/signup-page.png)

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
```

### 🚀 Steps

1. Build JAR locally using Maven:
   ```bash
   ./mvnw clean package -DskipTests
   ```
2. Push to GitHub
3. Connect GitHub repo to [Render.com](https://render.com/)
4. Use "Docker" deploy type
5. Set environment variables:
   - `frontend.urls=https://email-assistant-omega.vercel.app`
   - Gemini API key, etc.

✅ Done! Render spins up your backend container.

---

## 🧠 Gemini Integration (Backend)

- Uses Google’s **Gemini AI** (via OpenRouter) for generating context-aware replies.
- Request built using `WebClient` in Spring Boot.
- Example Java snippet:

```java
WebClient client = webClientBuilder.build();
String reply = client.post()
    .uri("https://openrouter.ai/api/v1/chat/completions")
    .header("Authorization", "Bearer " + geminiApiKey)
    .bodyValue(requestBody)
    .retrieve()
    .bodyToMono(String.class)
    .block();
```

---

## 📁 Project Structure

### 📦 Backend (`email-writer-sb`)
```
src/
├── config/
│   └── CorsConfig.java
├── controller/
│   └── EmailController.java
├── dto/
│   └── EmailRequest.java
├── service/
│   └── EmailService.java
├── EmailWriterSbApplication.java
```

### 💻 Frontend (`email-frontend`)
```
src/
├── App.jsx
├── main.jsx
├── components/ (optional split)
└── vite.config.js
```

---

## 🧪 Local Setup

### 📦 Backend

```bash
git clone https://github.com/Soham1500/Email-Assistant.git
cd Email-Backend
./mvnw spring-boot:run
```

Ensure `.env` or `application.properties` contains:
```properties
frontend.urls=http://localhost:5173
openrouter.api.key=YOUR_GEMINI_API_KEY
```

### 💻 Frontend

```bash
cd Email-Frontend
npm install
npm run dev
```

And add `.env`:
```env
VITE_BACKEND_URL=http://localhost:8080/api
```

---

## 📌 To Do / Improvements

- ✍️ Save generated email history per user
- 📩 Allow editing generated replies before sending
- 📬 Gmail API integration to auto-send emails
- 🧠 Fine-tune Gemini prompt for better personalization

---

## 📸 Image Assets Credit

- Login Page: `login-page.png`  
- Render Backend: `backend-render.png`
- Clerk Sign-Up Page: `signup-page.png`

> Make sure these are uploaded in `./assets/` or `./assets/signUp/` folders in your GitHub repo for proper image rendering.

---

## 🤝 Contributing

Pull requests are welcome! Please fork the repo and submit a PR.

---

## 📜 License

MIT License
