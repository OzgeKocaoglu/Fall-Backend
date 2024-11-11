# Fall Game Backend
This repository contains the backend REST API for the game Fall, designed with Node.js, Express.js, and MongoDB, and containerized with Docker for deployment on AWS.

## Overview
The Fall backend serves as the core infrastructure of the game, managing player data, game logic, and leaderboard functionality. This API is built with a scalable architecture, allowing it to handle a large number of simultaneous requests efficiently.

### Features
- **Player Management:** Handles player registration, profile updates, and retrieval of player information.
- **Game Data Management:** Manages player progress, achievements, and other game-related data.
- **Authentication & Authorization:** Protects routes with JWT-based authentication to ensure secure access.

### Tech Stack
- **Node.js & Express.js:** For building a high-performance, scalable API.
- **MongoDB:** NoSQL database used to store player and game data, ensuring flexible data management.
- **Docker:** Containerizes the application for easier deployment and scalability.

### Getting Started

#### Prerequisites
- **Node.js** (v14+)
- **Docker and Docker Compose**


#### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/fall-game-backend.git
cd fall-game-backend
```

2. Install dependencies:
```
npm install express mongoose nodemon dotenv
```

3. Configure environment variables by creating a .env file:
```
PORT=3000
MONGODB_URI=your_database_uri
SECRET_KEY=your_jwt_secret
```

4. Start the application
```
node index.js
```

The API will be running at http://localhost:3000.

#### Docker Setup

1. Build the Docker image:
```
docker build -t fall-api .
```

2. Run the Docker container:
```
docker run -d -p 3000:3000 --env-file .env fall-api
```

Your containerized API should now be accessible on http://localhost:3000.


### API Endpoints

| Method | Endpoint | Description |
| :---         |     :---:      |          ---: |
| GET   | /api/user/profile    | get user profile    |
| POST     | /api/user/register       |   set user    |


#### Authentication
This API uses JWT (JSON Web Token) for secure access. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

#### Error Handling
Error responses follow standard HTTP codes and are formatted in JSON. Example:

```
{
  "error": "Player not found",
  "status": 404
}

```

### Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature/feature-name).
3. Commit your changes (git commit -am 'Add feature').
4. Push to the branch (git push origin feature/feature-name).
5. Open a Pull Request.

### License
This project is licensed under the MIT License.

MIT License

Copyright (c) 2024 Ozge Kocaoglu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
