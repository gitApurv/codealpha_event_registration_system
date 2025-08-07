# Event Registration System API

A robust backend API for a full-featured event registration platform. This system allows administrators to manage events and enables users to register for them, with secure authentication and role-based access control.

## Features ✨

- **User Authentication**: Secure user registration and login system using **JSON Web Tokens (JWT)**.
- **Password Hashing**: Passwords are encrypted using **bcrypt.js** before being stored.
- **Role-Based Access Control**: Differentiates between regular `users` and `admins` to protect sensitive routes.
- **Event Management (Admin)**: Admins have full CRUD (Create, Read, Update, Delete) capabilities for events.
- **Event Discovery (Public)**: Anyone can view a list of all available events and see the details for a specific event.
- **User Registration**: Authenticated users can register for events and cancel their registrations.
- **Personalized Dashboard**: Users can view a list of all events they have registered for.
- **Scalable Architecture**: Organized into a clean structure of models, views, and controllers for easy maintenance.

## Tech Stack 💻

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt.js
- **Environment Variables**: Dotenv

## API Endpoints 📍

The base URL for all endpoints is `/api`. All `Private` and `Admin` routes require a `Bearer Token` in the `Authorization` header.

### Authentication Routes

| HTTP Method | Endpoint          | Access | Description                   |
| :---------- | :---------------- | :----- | :---------------------------- |
| `POST`      | `/users/register` | Public | Register a new user.          |
| `POST`      | `/users/login`    | Public | Log in a user to get a token. |

### Event Routes

| HTTP Method | Endpoint      | Access        | Description                    |
| :---------- | :------------ | :------------ | :----------------------------- |
| `GET`       | `/events`     | Public        | Get a list of all events.      |
| `POST`      | `/events`     | Private/Admin | Create a new event.            |
| `GET`       | `/events/:id` | Public        | Get details of a single event. |
| `PUT`       | `/events/:id` | Private/Admin | Update an existing event.      |
| `DELETE`    | `/events/:id` | Private/Admin | Delete an event.               |

### Registration Routes

| HTTP Method | Endpoint                                  | Access  | Description                                   |
| :---------- | :---------------------------------------- | :------ | :-------------------------------------------- |
| `POST`      | `/registrations/events/:eventId/register` | Private | Register the logged-in user for an event.     |
| `GET`       | `/registrations/my`                       | Private | Get all registrations for the logged-in user. |
| `DELETE`    | `/registrations/:id`                      | Private | Cancel a specific registration by its ID.     |
