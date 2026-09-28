# PIA_SO — Distributed school-management application

An academic web application with a Next.js frontend, a Spring Boot backend, and a MySQL database. The solution includes an HAProxy load balancer and three backend replicas running through Docker Compose.

## What it demonstrates

- Separation of frontend and backend architecture.
- Spring Boot services with MySQL persistence.
- Round-robin load balancing with HAProxy.
- Reproducible containerized execution with Docker Compose.
- Horizontal scaling of the backend service.

## Technologies

`Next.js` `TypeScript` `Spring Boot` `Kotlin` `MySQL` `HAProxy` `Docker`

## Architecture

```text
Browser → Next.js → HAProxy:1129 → Spring Boot API (3 replicas) → MySQL
                              └──── statistics on :8404
```

## Requirements

- Docker Desktop with Compose.
- Ports `3000`, `3306`, `8404`, and `1129` available.

## Run

From the repository root:

```bash
docker compose up --build --scale api=3
```

The application is available at `http://localhost:3000`. The HAProxy statistics dashboard is available at `http://localhost:8404/stats`.

To stop the services:

```bash
docker compose down
```

MySQL data is kept in the `mysql_data` volume until it is explicitly removed.
