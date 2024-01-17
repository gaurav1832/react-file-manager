# File Manager Application

A simple file manager application built using React, Node.js, Express, and MongoDB.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Demo](#demo)
 

## Description

The File Manager Application is a web-based platform that allows users to manage their files and folders. It provides features for user authentication, file upload, folder creation, file and folder deletion, file moving, file renaming, and file preview (for images and PDFs). The application is built using React for the frontend and Node.js, Express, and MongoDB for the backend.

## Features

- User Authentication
  - Sign Up: Create an account using a valid email address and password.
  - Sign In: Log in with a registered email and password.
  - Sign Out: Securely log out of the account.

- File Manager
  - File Upload: Upload images and PDFs.
  - Create Folder: Organize files by creating new folders.
  - Delete File/Folder: Remove files and folders from storage.
  - Move File: Transfer files to different folders.
  - Rename File/Folder: Change the names of files and folders.
  - View Files: Preview uploaded images and PDFs.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) installed and running.
- A text editor or integrated development environment (IDE) for code editing.

## Installation

To set up and run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/file-manager-app.git

2. Navigate to the project directory:
     ```
     cd file-manager-app
     
3. Install the backend dependencies:
    ```
    cd ../frontend
    npm install
4. Install the frontend dependencies:
   ```
   cd ../frontend
   npm install

## Configuration
  Before running the application, you need to configure the backend to connect to your MongoDB database. Follow these steps:

  1. Create a .env file in the backend directory:
     ```
     cd backend
     touch .env

  2. Open the .env file in a text editor and add the following configuration:
      ```
      MONGO_URI=your-mongodb-connection-string
      JWT_SECRET=your-secret-key-for-jwt
      ```
   Replace your-mongodb-connection-string with the connection string to your MongoDB database and your-secret-key-for-jwt with a secret key for JWT (JSON Web Tokens).


## Usage

To run the application, follow these steps:

1. Start the backend server:
    ```
    cd backend
    npm start

2. Start the frontend development server:
    ```
    cd frontend
    npm start
 
The frontend development server will start at http://localhost:3000. You can access the application in your web browser at this address.

## API Endpoints

The backend provides the following API endpoints:

- POST /user/register: Create a new user account.
- POST /user/login: Sign in with an existing account.
- POST /file/upload: Upload a file.
- GET  /file/folders: Get a list of folders.
- GET  /file/folder/:folderId/files: Get a list of files in a folder.
- POST /file/folder: Create a new folder.
- POST /file/deletefolder: Delete a folder
- POST /file/delete: Delete a file.
- PUT  /file/rename/:fileId: Rename a file.


The frontend development server will start at http://localhost:3000. You can access the application in your web browser at this address.


## Demo
You can see a live demo of the File Manager <a href="https://drive.google.com/file/d/1FYWHWJ94hPDV1N7yG_spinCgG3CtK1t2/view?usp=sharing" targer="_blank">here<a/>

## Thank you
  




       


