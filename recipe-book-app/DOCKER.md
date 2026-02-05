# Docker instructions for Recipe Book App

This document explains how to build, tag, push, and run the server and client Docker images.

Images published to Docker Hub:

- `yohimaa/recepie_book_app:server`
- `yohimaa/recepie_book_app:client`

Prerequisites

- Docker / Docker Desktop installed and running
- Logged in to Docker Hub: `docker login`

Build images locally

```bash
# From project root
docker build -t yohimaa/recepie_book_app:server ./server
docker build -t yohimaa/recepie_book_app:client ./client --build-arg REACT_APP_API_URL=http://localhost:5000
```

Tag (optional)

```bash
# If you need a specific tag:
docker tag yohimaa/recepie_book_app:server yohimaa/recepie_book_app:server:latest
docker tag yohimaa/recepie_book_app:client yohimaa/recepie_book_app:client:latest
```

Login and push to Docker Hub

```bash
docker login
docker push yohimaa/recepie_book_app:server
docker push yohimaa/recepie_book_app:client
```

Run with Docker Compose (using Hub images)

If `docker-compose.yml` references the Hub images, run:

```bash
docker-compose pull
docker-compose up -d
```

Run locally building from source

If you prefer to build images as part of compose, run from project root:

```bash
docker-compose up --build -d
```

Important runtime notes

- The server exposes port `5000` and the client (Nginx) serves on `80` inside the container — map these to host ports as desired in `docker-compose.yml` or Docker Desktop.
- The client needs to know the API URL at build time via `REACT_APP_API_URL`. When building locally, set it to the server endpoint the client should call (e.g., `http://localhost:5000` or `http://server:5000` when using Compose service name).
- The SQLite database file is a local file in the `server` directory. When running in Docker, mount a volume to persist data, for example in `docker-compose.yml`:

```yaml
services:
  server:
    volumes:
      - ./server/database.sqlite:/app/database.sqlite
```

Troubleshooting

- If you see CORS or API URL issues, ensure the client was built with the correct `REACT_APP_API_URL` value.
- If ports are already in use, change host ports in `docker-compose.yml` or stop conflicting services.

Automating builds

Consider adding a GitHub Actions workflow to build and push images on push or on a tag. If you'd like, I can scaffold a simple workflow for you.

Contact

If you want me to also add the GitHub Actions workflow or adjust `docker-compose.yml` for persisted volumes and environment variables, say the word and I'll add it.
