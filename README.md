# Development Platforms – Course Assignment
This project is an Express.js API built as part of the Development Platforms course assignment. 
The project shows basic backend development concepts such as authentication, database integration, 
and API structuring using the knowledge I’ve learned so far.


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

## Installation and Setup

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

This project includes an exported MySQL database file named database.sql. 
To set up the database, you need to run the following commands in MySQL:

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
(this will register a new user using email and password.)

POST /auth/login
(this will log in a user and return a JWT.)

Articles

GET /articles
(this is the public endpoint that returns a list of all articles.)

POST /articles
(this is a protected endpoint that allows authenticated users to submit a new article, 
but it requires a valid JWT in the Authorisation header.)

---

## Motivation
I went for Option 1,  because I wanted to learn more about backend development and get more experience with authentication, databases, and API structure.
Building a server-side application from start to finish gave me a better understanding of how different backend components work together.

I also really enjoyed implementing JWT authentication and organising the code using controllers, routes, and middleware. 
Seeing the whole process, from user registration to protected endpoints, working correctly was actually kind of fun.


---

## Reflection
I feel like the hardest part of this assignment was configuring and troubleshooting MySQL , especially when dealing with database connection issues and recovery.
(I still had credentials from when I studied NIS, so removing those and reconnecting everything took time) 
I really wanted to throw in the towel several times, but solving these problems gave me a much deeper understanding of how databases and backend services work.
This course showed me the benefits of developing a custom API, such as flexibility and full control over authentication and data handling, compared to using a backend-as-a-service solution like Supabase. 
At the same time, it also demonstrated how SaaS solutions can reduce setup complexity and speed up development.

Overall, this assignment made my backend development skills better and gave me valuable insight into building and maintaining a self-hosted API.
Also i want to add that in a production environment, additional measures such as rate limiting and request throttling would be important to further secure the API against abuse.

