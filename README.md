# Chatter
Chatter is a fullstack Discord-like application, for my professional portfolio.

Overview
This is my first fullstack application, a watered-down, Discord-like chat service. Where users can connect to friends, and can send messages in real-time.

The aim of the project is to gain experience in fullstack development, real-time communication, using REST APIs, authentication flows, and database design.

Tech Stack
Frontend:
 - React.js
 - SCSS
 - Axios

Backend:
 - Node.js + Express
 - JSON Web Tokens (JWT)
 - Socket.io
 - MySQL

Features
  - User Authentication (signup & login)
  - Real-time Messaging (Socket.io)
  - Added friends structure inspired by Discord
  - Persistent message storage
  - Responsive UI
  - REST API for CRUD operations
  - JWT authentication with access & refresh tokens

Project Structure

/client
  /src
    /assets
    /components
      /chat components
    /content
    /data
    /pages
    /scripts
    main.jsx

/server
  /config
  /controllers
  /Logs
  /routes
    /api
  server.js
