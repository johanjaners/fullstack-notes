# Fullstack Notes

Small fullstack notes app built in a few hours.

-   **Backend**: .NET 9 Web API, EF Core, SQL Server in Docker
-   **Frontend**: React + Vite
-   **Database**: SQL Server container with EF migrations

## How to run

### 1. Start database

```bash
docker-compose up -d
```

### 2. Run backend

```bash
cd Notes.Api
dotnet run
```

API will be available at `http://localhost:5012`.

### 3. Run frontend

```bash
cd notes-ui
npm install
npm run dev
```

Vite will start on `http://localhost:5173`.

## What it does

The app lets you create and delete notes from the frontend; notes are stored in SQL Server and visible via Swagger (`/swagger`).

-   `GET /api/notes` – list all notes
-   `POST /api/notes` – create a new note
-   `DELETE /api/notes/{id}` – delete a note

## Architecture

```
React (Vite) → REST API (/api/notes) → EF Core → SQL Server (Docker)
```

## What's next

With more time, I would add:

-   Update endpoint (PUT)
-   Input validation
-   Better UI styling and routing
-   Unit tests
