# YouTube Clone - MERN Stack
A professional-grade YouTube clone built with the MERN stack. This project features a robust video streaming engine, channel management, and a highly responsive UI built with Tailwind CSS v4.

## Architecture: MVC (Model-View-Controller)
- This project strictly follows the MVC Design Pattern to ensure clean code, scalability, and easy maintenance:
    - Model: Handles data logic and MongoDB schemas using Mongoose (User, Video, Comment, Channel, WatchLater).
    - View: The frontend React application (Vite) that provides an interactive and responsive user interface.
    - Controller: Contains the business logic for handling requests, interacting with models, and sending responses to the client.
    - Routes: Acts as the traffic cop, directing API calls to the appropriate controllers.

## Features
- Authentication: Secure Login/Signup using JWT and Redux Persist.
- Video Management: Upload, Edit, and Delete videos with Cloudinary integration.
- Channel System: Create and manage multiple channels under one account.
- Social Interactions: Like/Dislike videos, Subscribe to channels, and Commenting system.
- Theming: Advanced Dark Mode support using Tailwind CSS v4.
- Library: "You" Tab featuring "Watch Later" and "Liked Videos" playlists.
- Performance: Route-based Lazy Loading and Suspense for faster initial loads.

## Tech Stack
- Frontend:
    - React.js (Vite)
    - Tailwind CSS v4
    - Redux Toolkit & Redux Persist
    - React Router 
    - Axios

- Backend:
    - Node.js & Express (MVC Architecture)
    - MongoDB & Mongoose
    - Cloudinary SDK

- Authentication:
    - JSON Web Token (JWT)
    
## Installation & Setup
1. Clone the Repository
    - git clone https://github.com/yourusername/youtube-clone.git
    - cd youtube-clone

2. Backend Setup (Server)
    - Navigate to the server folder: cd server
    - Install dependencies: npm install
    - Create a .env file:
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_key
        CLOUDINARY_CLOUD_NAME=your_name
    - Start server: npm start

3. Frontend Setup (Client)
    - Navigate to the client folder: cd client
    - Install dependencies: npm install
    - Start dev server: npm run dev

## Usage Guide
- Once the application is running, here is how you can use the features:

1. Account & Personalization
    - Sign Up/Login: Create an account to unlock all features.
    - Theme Toggle: Click Button to switch between Dark and Light mode.
    - Profile Management: View your account details and email in the user dropdown.

2. Video Interaction
    - Watch Videos: Click on any video thumbnail on the home page to open the Video Player.
    - Socialize: Like or Dislike videos, and leave comments to engage with creators.
    - Subscribe: Click the "Subscribe" button on a video or channel page to follow your favorite creators.

3. Content Creation (MVC in Action)
    - Create Channel: Navigate to "View All Channels" or the User Menu to create your own YouTube channel.
    - Upload Content: Once a channel is created, use the "Create" button in the header to upload a video (MP4) and a thumbnail.
    - Manage Content: Go to your channel page to edit video details (Title/Description) or delete your channel entirely.

4. Your Library
    - Watch Later: Click the "Save" icon on any video to add it to your private "Watch Later" list.
    - You Tab: Visit the "You" tab to see a summary of your Liked Videos, Watch Later list, and your own channels.

## Git Repo Link
https://github.com/Trupal-Gondaliya/YouTube-Clone