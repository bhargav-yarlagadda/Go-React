# Task Manager App

A simple task manager application built with **Go Fiber** for the backend and **React** for the frontend. This app allows users to manage tasks efficiently by adding, updating, and deleting tasks. The backend API is built with Go Fiber, providing fast and lightweight server-side processing. The frontend is built with React, offering an interactive and responsive user interface.

## Features

- **Add Tasks**: Add new tasks to the task list with a title and description.
- **Edit Tasks**: Update task details such as title and description.
- **Delete Tasks**: Remove tasks from the task list.
- **Mark as Completed**: Toggle the task completion status.
- **Responsive Design**: The UI adapts to different screen sizes for a seamless user experience.

## Tech Stack

### Backend
- **Go Fiber**: A fast web framework for Go that handles routing and HTTP requests.
- **Go**: The backend language used to build the API.

### Frontend
- **React**: A JavaScript library for building the user interface.
- **Axios**: For making HTTP requests to the backend.
- **Tailwind CSS**: For styling the application with utility-first CSS classes.

## Getting Started

### Prerequisites

- Install [Go](https://golang.org/dl/) (1.18+).
- Install [Node.js](https://nodejs.org/en/) (LTS).
- Install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).


### File Structure

task-manager/
│
├── backend/                # Go Fiber API
│   ├── server.go             # Entry point for the backend
│   └── handlers.g            #router handlers
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # Entry point for React
│   │   └── styles/         # Tailwind CSS files
│   ├── public/
│   └── package.json        # Frontend dependencies
│
└── README.md               # This file

### Clone the Repository

```bash
git clone <your-repository-url>
cd task-manager
```
### Backend Setup
```bash
cd server
go mod tidy
go run server.go
```
### Backend Setup
```bash
cd client
npm install
npm run dev

```
