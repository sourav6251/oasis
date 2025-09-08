#stage1
FROM openjdk:21.0.2-jdk-slim-bullseye
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
