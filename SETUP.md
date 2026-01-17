# Backend Onboarding & Setup Guide

This guide details how to set up the backend and database for the SamChurch project.

## Prerequisites

Ensure you have the following installed on your machine:

1.  **Node.js**: (Version 18 or higher recommended)
2.  **PostgreSQL**: A running PostgreSQL instance.
3.  **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`.

## 1. Environment Setup

Create a `.env` file in the root directory of the project. You can base it on the following template:

```env
# Connection string for your PostgreSQL database
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL="postgresql://postgres:password@localhost:5432/samchurch?schema=public"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your local PostgreSQL credentials.

## 2. Installation

Install the project dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 3. Database Setup

Once your PostgreSQL database is running and the `.env` file is configured, initialize the database schema using Prisma:

```bash
npx prisma migrate dev --name init
```

This command will:
1.  Connect to your database.
2.  Create the necessary tables defined in `prisma/schema.prisma`.
3.  Generate the Prisma Client.

## 4. Running the Development Server

Start the application:

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Troubleshooting

-   **Database Connection Issues**: Double-check your `DATABASE_URL` in the `.env` file. Ensure the PostgreSQL service is running and accepting connections.
-   **Prisma Errors**: If you encounter synchronization issues, try running `npx prisma generate` to refresh the Prisma Client.
