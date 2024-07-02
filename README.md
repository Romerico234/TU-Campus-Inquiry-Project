# Towson University Campus Inquiry Form

This repository contains my Towson University Campus Inquiry Form project for my COSC 484 class. This application serves as a platform for students to submit requests and connect with counselors. Below are the details and setup instructions for the project.

## Technologies Used:
- **MEAN Stack**: MongoDB, Express.js (CORS), Angular, Node.js
- **Bootstrap (Bootswatch)**: Used for styling the application
- **Nodemailer**: Used for sending emails

## Project Overview:
The Towson University Campus Inquiry Form facilitates communication between students and counselors by allowing students to submit inquiries and requests directly through the application. Counselors can then respond to these inquiries.

## Planned Features:
- I am currently in the process of implementing a chatbox feature.

## Setup Instructions:
To run the server locally, follow these steps:

1. **Define Environment Variables**:
   - Create a `.env` file in the `backend` directory.
   - Fill in the following variables:
     ```
     MONGODB_URI="<Your MongoDB URI>"
     DB_NAME="<Your Database Name>"
     PORT=<Your desired port number>
     EMAIL_ADDRESS="<Your Email Address>"
     EMAIL_PASSWORD="<Your Email Password>"
     ```
     **Note**: Ensure that you use an authenticated email address (Outlook or any other service) to avoid any email delivery issues.

2. **Run the Backend**:
   - Navigate to the `backend` directory.
   - Use `nodemon` to start the server:
     ```
     npm install
     cd backend
     nodemon server.js
     ```

3. **Run the Angular Application**:
   - Open a new terminal window.
   - Navigate to the root directory of the project.
   - Start the Angular application:
     ```
     npm install
     ng serve
     ```

4. **Access the Application**:
   - Once both the backend server and Angular application are running, access the application by navigating to `http://localhost:4200` in your browser.