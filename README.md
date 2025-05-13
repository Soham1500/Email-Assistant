# AI Email Assistant

A full-stack solution combining Spring Boot, Google Gemini AI, and React to create smart email replies directly within Gmail. Features a Chrome extension with a custom button integrated into Gmail's UI.

## Features

- **Smart Reply Generation**: AI-powered email responses using Gemini API
- **Tone Customization**: Generate replies with specific tones (formal, casual, etc.)
- **Gmail Integration**: React-based Chrome extension adds button to Gmail interface
- **REST API**: Spring Boot backend for processing AI requests
- **Secure Communication**: Chrome extension ↔ Spring Boot backend ↔ Gemini API

## Tech Stack

Backend
- Java 17
- Spring Boot 3.x
- WebClient
- Gemini API

Frontend
- React.js
- Chrome Extension API
- HTML/CSS
- Webpack/Babel

## Prerequisites

- Java 17+
- Node.js 18+
- Maven
- Chrome browser
- Gemini API key
- Gmail account

Configure API keys in src/main/resources/application.properties

properties
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=
gemini.api.key=your_api_key_here
server.port=8080

Chrome Extension Setup

Create React app for extension
npx create-react-app gmail-extension
cd gmail-extension

Add Chrome extension manifest (public/manifest.json)

{
  "manifest_version": 3,
  "name": "AI Email Assistant",
  "version": "1.0",
  "permissions": ["activeTab", "scripting"],
  "content_scripts": [{
    "matches": ["https://mail.google.com/*"],
    "js": ["content.js"]
  }],
  "action": {
    "default_popup": "index.html"
  }
}

Create content script (src/content.js)

API Documentation
Endpoint: POST /api/email/generate

Request Body:
{
  "emailContent": "Original email text...",
  "tone": "professional"
}

Response:
{
  "response": "AI-generated email reply text..."
}
