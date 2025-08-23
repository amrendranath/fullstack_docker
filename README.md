# Full-Stack Application (Node.js + Flask + MongoDB)

This is a full-stack web application with a Node.js/Express frontend, Flask backend, and MongoDB database, all containerized with Docker.

## 🏗️ Architecture

```
Frontend (Node.js/Express) → Backend (Flask/Python) → Database (MongoDB)
        Port 3000                    Port 5000              Port 27017
```

## 📁 Project Structure

```
fullstack-app/
├── frontend/                   # Node.js/Express frontend
│   ├── views/                 # EJS templates
│   │   ├── form.ejs          # Main form page
│   │   └── success.ejs       # Success page
│   ├── public/               # Static files
│   ├── server.js             # Express server
│   ├── package.json          # Node.js dependencies
│   ├── Dockerfile            # Frontend Docker config
│   └── .env                  # Frontend environment variables
├── backend/                   # Flask backend
│   ├── app.py                # Flask application
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Backend Docker config
│   └── .env                  # Backend environment variables
├── docker-compose.yml        # Docker Compose configuration
├── init-mongo.js            # MongoDB initialization script
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🚀 Features

- **Frontend (Node.js/Express)**:

  - EJS templating engine
  - Responsive form interface
  - AJAX data fetching
  - Error handling
  - Health check endpoint

- **Backend (Flask)**:

  - RESTful API endpoints
  - CORS enabled
  - MongoDB integration
  - JSON and form data support
  - Health check endpoint

- **Database (MongoDB)**:
  - Persistent data storage
  - Automatic initialization
  - Sample data seeding

## 🛠️ Prerequisites

- Docker and Docker Compose
- Git
- Node.js (for local development)
- Python 3.11+ (for local development)

## 📦 Quick Start with Docker

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd fullstack-app
   ```

2. **Start all services**:

   ```bash
   docker-compose up --build
   ```

3. **Access the application**:

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

4. **Stop all services**:
   ```bash
   docker-compose down
   ```

## 🔧 Local Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev  # Uses nodemon for auto-reload
```

### Backend Development

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## 🌐 API Endpoints

### Backend (Flask) - Port 5000

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| GET    | `/`          | API information      |
| GET    | `/health`    | Health check         |
| GET    | `/api`       | Get all submissions  |
| POST   | `/submit`    | Submit new data      |
| GET    | `/api/count` | Get submission count |

### Frontend (Express) - Port 3000

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | `/`                | Main form page         |
| GET    | `/form`            | Form page              |
| POST   | `/submit`          | Submit form to backend |
| GET    | `/api/submissions` | Proxy to backend API   |
| GET    | `/success`         | Success page           |
| GET    | `/health`          | Health check           |

## 🔄 Data Flow

1. User fills form on frontend (Node.js/Express)
2. Frontend sends data to Flask backend via HTTP request
3. Flask backend validates and stores data in MongoDB
4. Backend returns success/error response
5. Frontend displays appropriate message to user

## 🐳 Docker Images

### Building Images Locally

```bash
# Build frontend image
docker build -t fullstack-frontend ./frontend

# Build backend image
docker build -t fullstack-backend ./backend
```

### Pushing to Docker Hub

```bash
# Tag images
docker tag fullstack-frontend your-username/fullstack-frontend:latest
docker tag fullstack-backend your-username/fullstack-backend:latest

# Push images
docker push your-username/fullstack-frontend:latest
docker push your-username/fullstack-backend:latest
```

## 📊 Health Monitoring

All services include health check endpoints:

- Frontend: `GET /health`
- Backend: `GET /health`
- MongoDB: Built-in health checks in docker-compose

## 🛡️ Security Features

- Non-root users in Docker containers
- CORS properly configured
- Input validation
- Environment variable usage for sensitive data

## 🔧 Environment Variables

### Frontend (.env)

```
PORT=3000
FLASK_BACKEND_URL=http://backend:5000
```

### Backend (.env)

```
MONGODB_URI=mongodb://mongo:27017/user_submission_db
FLASK_ENV=production
```

## 🧪 Testing

### Test Frontend

```bash
curl http://localhost:3000/health
```

### Test Backend

```bash
curl http://localhost:5000/health
curl http://localhost:5000/api
```

### Test Full Flow

1. Visit http://localhost:3000
2. Fill and submit the form
3. Verify data appears in "Show All Submitted Data"

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 5000, and 27017 are available
2. **Docker issues**: Try `docker-compose down && docker-compose up --build`
3. **Database connection**: Check if MongoDB container is running
4. **CORS issues**: Verify CORS is enabled in Flask backend

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongo
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Flask community for excellent documentation
- Express.js team for the robust framework
- MongoDB for reliable database solutions
- Docker for containerization capabilities
