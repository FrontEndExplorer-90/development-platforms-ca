# Development Platforms – Course Assignment

This project is an **Express.js API** built as part of the **Development Platforms** course assignment.  
The application functions as a simple news platform where users can browse news articles, and authenticated users can submit new articles.

The project demonstrates core backend development concepts such as authentication, database integration, and API structuring using modern development practices.

---

## Tech Stack

- Node.js  
- Express.js  
- TypeScript  
- MySQL  
- mysql2  
- JSON Web Tokens (JWT)  
- bcrypt  

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd development-platforms-ca
```
---

### 2. Install dependencies
```bash
npm install
```
---

### 3. Environment variables
Create a .env file in the project root with the following values:

```env 

PORT=3000
DB_HOST=localhost
DB_USER=dp_user
DB_PASSWORD=dp_supersecret
DB_NAME=development_platforms_ca
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1h
```
---

### 4. Database Setup

The project includes an exported MySQL database file named database.sql.
To set up the database, run the following commands in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS development_platforms_ca;
USE development_platforms_ca;
SOURCE database.sql;
```

This will create the required tables (users and articles) and insert example data.

### 5. Running the Project

Start the development server:

```bash
npm run dev

The API will be available at:

http://localhost:3000

```
---

## API Endpoints

Authentication

POST /auth/register
Registers a new user using email and password.

POST /auth/login
Logs in a user and returns a JWT.

Articles

GET /articles
Public endpoint that returns a list of all articles.

POST /articles
Protected endpoint that allows authenticated users to submit a new article.
Requires a valid JWT in the Authorization header.

---

## Motivation
I chose the Express.js API option because I wanted to focus on backend development and gain more experience working with authentication, databases, and API structure. Building a server-side application from scratch allowed me to better understand how different backend components interact in a real-world scenario.

I particularly enjoyed implementing JWT authentication and organising the code using controllers, routes, and middleware. Seeing the full flow - from user registration to protected endpoints - working correctly was very rewarding.

---

## Reflection
The most challenging part of this assignment was configuring and troubleshooting MySQL on a Windows environment, especially when dealing with database connection issues and recovery. While this was frustrating at times, resolving these problems gave me a much deeper understanding of how databases and backend services operate.

This project highlighted the benefits of developing a custom API, such as flexibility and full control over authentication and data handling, compared to using a backend-as-a-service solution like Supabase. At the same time, it also demonstrated how SaaS solutions can reduce setup complexity and speed up development.

Overall, this assignment strengthened my backend development skills and provided valuable insight into building and maintaining a self-hosted API.
Also i want to add that in a production environment, additional measures such as rate limiting and request throttling would be important to further secure the API against abuse.
