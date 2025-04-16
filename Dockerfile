FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# If using Maven
RUN ./mvnw package -DskipTests

# If using Gradle (uncomment this and comment out the Maven line above if you use Gradle)
# RUN ./gradlew build -x test

EXPOSE 8080

# Replace with your actual JAR file name (check your target or build/libs directory)
CMD ["java", "-jar", "target/HowWasTheWeather-0.0.1-SNAPSHOT.jar"]