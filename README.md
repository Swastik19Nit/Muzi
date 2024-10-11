# Muzi - Collaborative Music Streaming Platform

Muzi is a collaborative music streaming platform that allows users to create, manage, and participate in streaming sessions. It aims to enhance the music experience in group environments and live streams by enabling real-time song choices and interactions. The platform ensures each user can manage multiple streams but only have one active stream at a time.

![image](https://github.com/user-attachments/assets/5d1433e4-e40e-42ce-9f9e-5645604622b4)

## Features

- **Collaborative Music Selection**: Users can collaborate to choose songs for live streams or group sessions.
- **Real-time Streaming**: Facilitates live audio and video streaming.
- **Stream Management**: Each user can manage multiple streams within their profile, but only one can be active at a time.
- **Upvoting System**: Users can upvote streams to show appreciation and support for specific content.
- **Role-Based System**: Users can either be Streamers (content creators) or End Users (viewers).
- **Third-Party Authentication**: The platform supports passwordless authentication using Google.

## Tech Stack

- **Backend**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma ORM for database interactions
- **Authentication**: Google OAuth2.0 (OIDC) with options for passwordless login via OTP
- **Containerization**: Docker for development and production environments
