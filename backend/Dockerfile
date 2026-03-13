# --- Estágio de build ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiar apenas o pom.xml primeiro para aproveitar cache de dependências
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copiar o código-fonte e construir o JAR
COPY src ./src
RUN mvn package -DskipTests -q

# --- Estágio de execução ---
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/logitrack-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
