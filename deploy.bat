@echo off
REM Build and push Docker images to Docker Hub (Windows batch script)

REM Configuration
set DOCKER_USERNAME=your-username
set FRONTEND_IMAGE=fullstack-frontend
set BACKEND_IMAGE=fullstack-backend
set TAG=latest

echo 🚀 Building and pushing Docker images...

REM Build images
echo 📦 Building frontend image...
docker build -t %FRONTEND_IMAGE%:%TAG% ./frontend

echo 📦 Building backend image...
docker build -t %BACKEND_IMAGE%:%TAG% ./backend

REM Tag images for Docker Hub
echo 🏷️ Tagging images for Docker Hub...
docker tag %FRONTEND_IMAGE%:%TAG% %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%TAG%
docker tag %BACKEND_IMAGE%:%TAG% %DOCKER_USERNAME%/%BACKEND_IMAGE%:%TAG%

REM Push images to Docker Hub
echo ☁️ Pushing frontend image to Docker Hub...
docker push %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%TAG%

echo ☁️ Pushing backend image to Docker Hub...
docker push %DOCKER_USERNAME%/%BACKEND_IMAGE%:%TAG%

echo ✅ All images pushed successfully!
echo Frontend: %DOCKER_USERNAME%/%FRONTEND_IMAGE%:%TAG%
echo Backend: %DOCKER_USERNAME%/%BACKEND_IMAGE%:%TAG%
pause
