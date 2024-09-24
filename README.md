# GiftCart API

## Overview

**GiftCart** is an innovative e-commerce platform designed to provide users with an intuitive shopping experience, including a unique birthday discount campaign. Customers can register, browse products, manage their shopping cart, and receive personalised discounts via email. The platform aims to enhance customer engagement and increase sales through targeted promotions and a seamless shopping experience.

## Features

- User registration and authentication
- Product browsing and search functionality
- Shopping cart management
- Unique birthday discount campaign
- Email notifications for discounts and updates
- Secure payment processing via Stripe
- API documentation with Swagger

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.
- **PostgreSQL**: A powerful relational database management system used for storing application data.
- **Redis**: An in-memory data structure store used for caching and improving performance.
- **Prisma**: An ORM that simplifies database access and management.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **Nodemailer**: A module for sending emails from Node.js applications.
- **Stripe**: A payment processing platform for handling transactions securely.
- **Bull**: A queue library for managing background jobs and tasks.
- **Swagger**: A tool for documenting APIs, providing a user-friendly interface to explore the API endpoints.
- **Jest**: A testing framework for ensuring code quality through unit and integration tests.

### Additional Libraries

- **bcrypt**: For hashing passwords and ensuring secure authentication.
- **class-validator**: For validating data objects and ensuring data integrity.
- **class-transformer**: For transforming and serialising objects for API responses.
- **date-fns**: For date manipulation and formatting.
- **uuid**: For generating unique identifiers for various entities.

## How to Start and Run the Application

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- Docker (optional, for containerised deployment)
- PostgreSQL (for local development)

### Cloning the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/sarojadhikari076/giftcart-api
cd giftcart-api
```

## Setting Up the Environment Variables

Create a .env file in the root directory and add the following environment variables:

```bash
PORT=9000
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_HOST_USER=your_email_username
EMAIL_HOST_PASSWORD=your_email_password
EMAIL_FROM=your_email_from
DATABASE_URL=postgresql://user:password@db:5432/giftcart
REDIS_URL=redis://redis:6379
NODE_ENV=development
```

## Running the Application

1. Install the dependencies:

```bash
npm install
```

2. Start the application:

```bash
npm run start
```

The application will be running at http://localhost:9000.

## Running With Docker

1. Build the Docker image:

```bash
docker build -t giftcart-api .
```

2. Run the Docker container:

```bash
docker run -p 9000:9000 giftcart-api
```

The application will be running at http://localhost:9000.

## Deploying Migrations

To deploy the migrations, run the following command:

```bash
docker-compose exec app npx prisma migrate deploy
```

## Seeding Sample Data

To seed the database with sample data, run the following command:

```bash
docker-compose exec app npx prisma db seed
```

## Accessing Swagger Documentation

The Swagger documentation can be accessed at http://localhost:9000/api. This provides a user-friendly interface to explore the API endpoints, view request/response formats, and test the API functionality.
