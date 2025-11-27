### Build stage: use Maven with JDK 21
FROM maven:3.9.5-eclipse-temurin-21 AS build

WORKDIR /workspace

# Copy pom first to leverage docker cache
COPY pom.xml .
COPY src ./src

# Build jar package
RUN mvn -B -DskipTests package

### Runtime stage: use a slim JRE
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy jar from build stage
COPY --from=build /workspace/target/*.jar app.jar

EXPOSE 8081

CMD ["java", "-jar", "app.jar"]
