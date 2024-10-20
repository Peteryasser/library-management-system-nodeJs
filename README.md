﻿📚 Library Management System

A Library Management System built with Node.js, TypeScript, TypeORM, and MySQL, designed to manage books, borrowing, and user reviews. This system allows users to borrow books, manage their borrow history, search for books. It also provides administrative features such as generating reports for popular and borrowed books.

🚀 Main Features

🧑‍💻 User Features
User Registration & Login: Users can sign up, log in, and securely authenticate using JWT (JSON Web Token).

Browse & Search Books: Users can search for books by title, author, or category, and filter based on availability and other criteria.

Borrow & Return Books: Users can borrow books, specifying a duration for borrowing. They can also view their borrowing history.

Email Users: After borrow and return books.

📊 Admin Features
Add, Update and Delete books.

Borrowed Books Report: View a report of all currently borrowed books.

Popular Books Report: View a report of the most popular books based on borrow count.

🛠️ Technical Features
Email Notifications: After borrow and return books.

Pagination: API responses support pagination for large datasets like books or history.

📋 Prerequisites
Make sure you have the following installed:

Node.js (>= 18.x)

MySQL (or a MySQL-compatible database like MariaDB)

Postman (for testing API endpoints, optional) you can see my collection here https://documenter.getpostman.com/view/36991213/2sAXxY48R4

🛠️ Installation & Setup

Clone the repository:

bash

Copy code

git clone https://github.com/your-username/library-management-system-nodeJs.git

cd library-management-system-nodeJs

Install dependencies:

bash

Copy code

npm install

Environment Configuration:

Copy the .env.example file and rename it to .env.

Update the database connection settings and other environment variables in the .env file.

plaintext

Copy code

DB_HOST=localhost

DB_PORT=3000

DB_USERNAME=root

DB_PASSWORD=yourpassword

DB_DATABASE=library_management

JWT_SECRET=your_jwt_secret

EMAIL_USER=your-email@example.com

EMAIL_PASSWORD=your-email-password

Database Migration:

Create the database and run TypeORM migrations to set up the schema.

bash

Copy code

npm run typeorm migration:run

Start the Application:

bash

Copy code

npm run dev

The server will start on http://localhost:3000.

✉️ Email Notifications

The system uses NodeMailer to send emails for important events such as: Borrowing or returning books

For future work: 

Borrowing Reminder: An email reminder is sent to users one day before the return deadline.

Overdue Notification: If a book is overdue, both the user and the admin receive email notifications.

Setting up Email:

To configure email notifications:

In the .env file, add your email credentials:

plaintext

Copy code

EMAIL_USER=your-email@example.com

EMAIL_PASSWORD=your-email-password

Emails will be sent using your provided email service (Gmail, etc.). Ensure that the "less secure apps" option is enabled in your email account, or set up a secure email API (e.g., SendGrid).

🛠 API Endpoints

Here are the main API routes used in the project:

🔑 Authentication

POST /api/auth/register: User registration.

POST /api/auth/login: User login.

📚 Books

GET /api/books: List or search available books with filtering options (author, title).

POST /api/books: Add a new book (Admin only).

PUT /api/books/ : Update a book (Admin only).

DELETE /api/books/ : Remove a book (Admin only).

📖 Borrowing

POST /api/borrow: Borrow a book.

POST /api/return: Return a borrowed book.

GET /api/borrow/history: View the borrowing history of the logged-in user.

📊 Admin Reports

GET /api/reports/borrowed: View a report of currently borrowed books.

GET /api/reports/popular: View a report of the most popular books.

Book search and filtering.

Borrowing and returning logic.

Error handling for invalid requests.

🚀 Deployment 

Hosting the database on Clever Cloud

The project can be deployed using Vercel or any Node.js-compatible hosting provider. (future work)


🏗 Project Structure

.

├── src

│   ├── controllers   # Route controllers for handling API requests

│   ├── entities      # TypeORM entities (User, Book, Borrow, etc.)

│   ├── middleware    # Middleware for authentication (JWT)

│   ├── services      # Business logic and services

│   └── routes        # API routes definitions

├── .env              # Environment variables

├── tsconfig.json     # TypeScript configuration

└── package.json      # NPM dependencies and scripts

📚 Technologies Used

Node.js with Express for server-side logic.

TypeScript for type safety and modern JavaScript features.

TypeORM for database management and schema migrations.

MySQL as the primary database.

JWT (JSON Web Tokens) for authentication.

NodeMailer for sending emails.

🔒 Security

Password Hashing: Passwords are hashed using bcrypt for secure storage.

Authentication: JWT-based authentication ensures secure API access.

Validation: All input is validated to prevent SQL injection and other attacks.
