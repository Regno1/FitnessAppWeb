# Fitness App Web

Hey there. This is a fitness tracking application I built using a microservices architecture. The backend runs on Java with Spring Boot, and the frontend is built with React.

I designed this to be fully distributed. It handles user management, tracks fitness activities, and even has an AI service for recommendations. 

### What's inside:
- **configServer**: Centralized configuration for all the services.
- **eureka**: Service discovery so the microservices can find each other.
- **gateway**: The main API gateway that routes requests from the frontend.
- **userservice**: Handles all user data and authentication.
- **activityservice**: Manages the actual fitness tracking and workout logs.
- **aiservice**: Generates smart recommendations.
- **frontend**: A React-based user interface.

The application uses MongoDB for storage and RabbitMQ for messaging between the different services.

---

### How to run it locally

The quickest way to get everything up and running on your own machine is by using Docker. I've included a Docker Compose file that sets up everything you need.

Just make sure you have Docker installed, open your terminal in the project root, and run:

```bash
docker compose up --build -d
```

This might take a few minutes the first time because it needs to build all the Java services and the React frontend, plus pull the MongoDB and RabbitMQ images. Once it's done, all the services will be wired up and ready to go.

---

### Deploying to the cloud

If you want to put this on the internet to show it off, you can actually host it using various free tiers.

- **Databases**: You can use MongoDB Atlas for the database and CloudAMQP for RabbitMQ. Both have generous free tiers.
- **Backend Services**: The Spring Boot microservices can be deployed on platforms like Render, Railway, or Koyeb. Just remember to deploy the Config Server and Eureka Server first so the other services can register with them.
- **Frontend**: The React app is easiest to deploy on Vercel or Netlify.

When you deploy, you'll just need to make sure you set the right environment variables (like your cloud database URIs) on your hosting platform so the services know where to connect.
