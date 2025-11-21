FROM gradle:8-jdk17 AS build
WORKDIR /home/gradle/src

COPY --chown=gradle:gradle . .

RUN ./gradlew bootJar --no-daemon -x test

FROM amazoncorretto:17-alpine-jdk

WORKDIR /app

COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

EXPOSE 1129

ENTRYPOINT ["java", "-jar", "app.jar"]