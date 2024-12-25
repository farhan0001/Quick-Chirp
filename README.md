
# Quick Chirp - Full Stack Project

## Overview
Quick Chirp is a full-stack application inspired by Twitter. Designed to showcase modern, scalable web development practices, it uses **React** for the frontend and **Spring Boot** for the backend. The application replicates core functionalities of a social media platform, allowing users to:

- Create accounts
- Post chirps (tweets)
- Follow other users
- View a real-time feed

This project serves as a comprehensive demonstration of full-stack development skills, combining intuitive user interfaces with a robust backend architecture.

## Features
- **User Authentication**: Secure user registration and login using JWT authentication.
- **Tweet Management**: Create, edit, delete, and view chirps.
- **Real-Time Feed**: See the latest posts from users you follow.
- **Chirp Creation**: Post short messages (chirps) with ease.
- **Follow System**: Follow and unfollow other users to personalize your feed.

## Tech Stack
### Frontend
- **React**: For building a dynamic and responsive user interface.
- **Redux**: For state management.
- **Axios**: For API communication.
- **Tailwind CSS**: For modern and responsive styling.
- **Google OAuth Integeration**: For modern login ease.

### Backend
- **Spring Boot**: For creating a robust and scalable REST API.
- **Spring Security 6**: For authentication and authorization.
- **MySQL**: As the relational database for persistent user and chirp data storage.

## System Architecture
The project follows a **3-tier architecture**:
1. **Frontend**: Handles user interaction and communicates with the backend via REST APIs.
2. **Backend**: Processes business logic and provides API endpoints.
3. **Database**: Stores user information, chirps, and follower data.

## Installation and Setup
### Prerequisites
- Node.js
- Java JDK
- MySQL

### Steps to Run
#### Backend (Spring Boot)
1. Clone the repository.
2. Navigate to the backend folder **server**.
3. Update the `application.properties` file with your MySQL credentials.
4. Run the following commands:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

#### Frontend (React)
1. Navigate to the frontend folder **client**.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

#### Access the Application
- Open your browser and navigate to `http://localhost:3000`.

## Screenshots

1. Authentication Page

![Authentication Page](app_screenshots/Authentication_Page.png)

2. Sign in Modal

![Sign in](app_screenshots/Signin_Modal.png)

3. Sign up Modal

![Sign up](app_screenshots/Signup_Modal.png)

4. Home Page

![Home Page](app_screenshots/Home_Page.png)

5. Chirp Reply Modal

![Chirp Reply](app_screenshots/Chirp_Reply_Modal.png)

6. Subscription Modal

![Subscription Modal](app_screenshots/Subscription_Modal.png)

7. Profile Page

![Profile Page](app_screenshots/Profile_Page.png)

8. Edit Profile Modal

![Edit Profile](app_screenshots/Edit_Profile_Modal.png)

## Contact
- **Email**: farhanquamar2021@gmail.com