# How Was The Weather

A full-stack web application for retrieving weather forecasts and managing user favorite locations. The backend is built with Java Spring Boot, providing RESTful APIs to fetch geolocation and weather data from external services, as well as user management features. The frontend is a modern single-page application (SPA) built with Vite, TypeScript, and styled using Tailwind CSS.

**Live Demo**: [frontend-howwastheweather.onrender.com](https://frontend-howwastheweather.onrender.com)

![Search and Current Weather](HowWasTheWeather/images/forecast-ui1.png "Search and Current Weather")

![Hourly Forecast](HowWasTheWeather/images/forecast-ui2.png "Hourly Forecast")

![Daily Forecast with Clickable Hourly Breakdown](HowWasTheWeather/images/forecast-ui3.png "Daily Forecast with Clickable Hourly Breakdown")

## Features

- **Geocoding**: Convert addresses to latitude/longitude coordinates using the Google Maps Geocoding API.
- **Weather Forecasts**: Retrieve current, hourly, and daily weather forecasts (up to 16 days) from the Open-Meteo API, including temperature, precipitation, wind, UV index, and more.
- **User Management**: Register and authenticate users with securely encoded passwords using JWT.
- **Favorite Locations**: Save, retrieve, and delete favorite locations for authenticated users.
- **Responsive UI**: A clean, modern frontend interface styled with Tailwind CSS.
- **Containerized**: Fully Dockerized for easy deployment and consistent environment.
- **Cloud Deployment**: Deployed on Render for reliable cloud hosting.

## Tech Stack

### Backend

- **Java 17+** with Spring Boot (JDK 23 for Docker deployment)
- **Spring WebFlux**: For reactive, non-blocking HTTP requests
- **WebClient**: For API calls to external services (Google Maps API, Open-Meteo API)
- **Spring Data R2DBC**: Reactive database access for user and favorite location persistence
- **Spring Security**: JWT-based authentication and password encoding
- **PostgreSQL**: Database for storing users and favorite locations
- **JUnit 5 & Mockito**: For unit testing
- **Maven**: Dependency management and build tool
- **Docker**: Containerization

### Frontend

- **Vite**: Fast build tool and development server
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Node.js 20**: JavaScript runtime
- **React**: JavaScript library for building user interfaces
- **Nginx**: Web server for production deployment
- **Docker**: Containerization

## API Endpoints

### Authentication

- **POST /api/login**  
  Authenticate a user and return a JWT token.  
  **Request Body**: `{ "email": "string", "password": "string" }`  
  **Response**: `200 OK` with `{ "token": "jwt-token" }` or `401 Unauthorized` if credentials are invalid.

- **POST /api/signup**  
  Register a new user and return a JWT token.  
  **Request Body**: `{ "email": "string", "password": "string" }`  
  **Response**: `201 Created` with `{ "token": "jwt-token" }` or `400 Bad Request` if email is already in use.

### Favorite Locations

- **POST /api/favorites**  
  Add a new favorite location for the authenticated user.  
  **Request Body**: `{ "name": "string", "latitude": number, "longitude": number }`  
  **Headers**: `Authorization: Bearer <jwt-token>`  
  **Response**: `200 OK` with the saved `FavoriteLocation` or `401 Unauthorized` if not authenticated.

- **GET /api/favorites**  
  Retrieve all favorite locations for the authenticated user.  
  **Headers**: `Authorization: Bearer <jwt-token>`  
  **Response**: `200 OK` with an array of `FavoriteLocation` objects.

- **DELETE /api/favorites/{id}**  
  Delete a favorite location by ID.  
  **Path Parameter**: `id` (Long)  
  **Headers**: `Authorization: Bearer <jwt-token>`  
  **Response**: `204 No Content` on success, `404 Not Found` if the ID doesn't exist.

### Weather Forecast

- **GET /api/forecast/hello**  
  Test endpoint to verify the forecast API is running.  
  **Response**: `200 OK` with `"Hello, world!"`.

- **GET /api/forecast/current**  
  Get current weather for a location.  
  **Query Parameter**: `location` (string, e.g., "New York")  
  **Response**: `200 OK` with a `CurrentWeatherDTO` object or `404 Not Found` if the location is invalid.

- **GET /api/forecast/hourly**  
  Get hourly weather forecast for a location.  
  **Query Parameter**: `location` (string)  
  **Response**: `200 OK` with a `HourlyForecastDTO` object or `404 Not Found` if the location is invalid.

- **GET /api/forecast/daily**  
  Get daily weather forecast for a location.  
  **Query Parameter**: `location` (string)  
  **Response**: `200 OK` with a `DailyForecastDTO` object or `404 Not Found` if the location is invalid.

- **GET /api/forecast/getforecast**  
  Get the full weather forecast (current, hourly, daily) for a location.  
  **Query Parameter**: `location` (string)  
  **Response**: `200 OK` with a `ForecastDTO` object or `404 Not Found` if the location is invalid.

## Prerequisites

- **Java 17+**: For local backend development (JDK 23 for Docker deployment)
- **Node.js 18+**: For frontend development (Node 20 for Docker deployment)
- **Maven**: For backend dependency management
- **PostgreSQL**: Database for storing users and favorite locations
- **Docker & Docker Compose** (optional): For containerized setup
- **API Keys**:
  - Google Maps API key (for geocoding)
  - No key required for Open-Meteo (free tier used)

## Package Requirements

### Backend Dependencies

Main dependencies managed through Maven (`pom.xml`):

- Spring Boot Starter WebFlux
- Spring Boot Starter Security
- Spring Boot Starter Data R2DBC
- Spring Boot Starter Validation
- PostgreSQL Driver
- R2DBC PostgreSQL
- Java JWT (jjwt)
- Project Lombok
- Spring Boot Starter Test (for testing)
- Reactor Test (for reactive testing)

### Frontend Dependencies

Main dependencies managed through npm (`package.json`):

- React & React DOM
- React Router DOM
- Axios (for API requests)
- Tailwind CSS
- TypeScript
- Vite
- ESLint & Prettier (for code formatting)

## Setup

### Option 1: Traditional Setup

#### Database (PostgreSQL)

1. Install PostgreSQL if not already installed.
2. Create a database for the app:
   ```sql
   CREATE DATABASE weather_app;
   ```
3. Ensure your PostgreSQL user has the necessary permissions.

#### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/wesleygeorge/ForecastWebApp.git
   cd forecastwebbapp
   ```
2. Configure environment variables in `src/main/resources/application.properties`:
   ```properties
   google.maps.api.key=<your-google-maps-api-key>
   spring.r2dbc.url=r2dbc:postgresql://localhost:5432/weather_app
   spring.r2dbc.username=<your-postgres-username>
   spring.r2dbc.password=<your-postgres-password>
   spring.sql.init.mode=always
   ```
3. Build and run the backend:
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or another port if configured).

### Option 2: Docker Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/wesleygeorge/ForecastWebApp.git
   cd forecastwebapp
   ```

2. Create a `.env` file in the root directory with your environment variables:

   ```
   GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
   POSTGRES_USER=<db-username>
   POSTGRES_PASSWORD=<db-password>
   POSTGRES_DB=weather_app
   ```

3. Start the application using Docker Compose:

   ```bash
   docker-compose up -d
   ```

   This will start:

   - PostgreSQL database
   - Spring Boot backend
   - React frontend with Nginx

4. Access the application at `http://localhost:80` (or the configured port)

## Deployment

The application is deployed on Render:

- **Frontend URL**: [frontend-howwastheweather.onrender.com](https://frontend-howwastheweather.onrender.com)
- **Backend URL**: [howwastheweather.onrender.com](https://howwastheweather.onrender.com)

### Deployment Steps on Render

1. Create a new Web Service on Render for the backend:

   - Connect your GitHub repository
   - Set the build command to use Docker
   - Configure environment variables (Google Maps API key, database URL, etc.)

2. Create a new Web Service on Render for the frontend:

   - Connect your GitHub repository
   - Set the build command to use Docker
   - Configure the backend API URL as an environment variable

3. Create a PostgreSQL database on Render or use an external database service

## Docker Configuration

### Backend Dockerfile

```dockerfile
FROM eclipse-temurin:23-jdk

WORKDIR /app

COPY . .

# Ensure mvnw is executable
RUN chmod +x ./mvnw

# If using Maven
RUN ./mvnw package -DskipTests

EXPOSE 8080

# Replace with your actual JAR file name
CMD ["java", "-jar", "target/HowWasTheWeather-0.0.1-SNAPSHOT.jar"]
```

### Frontend Dockerfile

```dockerfile
# Build stage
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Example docker-compose.yml

```yaml
version: "3.8"

services:
  database:
    image: postgres:14
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      - SPRING_R2DBC_URL=r2dbc:postgresql://database:5432/${POSTGRES_DB}
      - SPRING_R2DBC_USERNAME=${POSTGRES_USER}
      - SPRING_R2DBC_PASSWORD=${POSTGRES_PASSWORD}
      - GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}
    depends_on:
      - database
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## Usage

- Register or log in.
- Enter an address to get its coordinates and view current weather and hourly or daily forecasts.
- Save favorite locations.
- View and manage your saved locations from the UI.

## Testing

- Backend tests are located in `backend/src/test`. Run them with:
  ```bash
  ./mvnw test
  ```

## Contributing

Feel free to submit issues or pull requests. Ensure all tests pass and follow the existing code style.

## License

MIT
