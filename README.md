# GiftCart API

## Overview

GiftCart is an e-commerce platform that provides users with an intuitive shopping experience, including a unique birthday discount campaign. Customers can register, browse products, manage their shopping cart, and receive personalized discounts via email.

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

- **bcrypt**: For hashing passwords.
- **class-validator**: For validating data objects.
- **class-transformer**: For transforming and serializing objects.
- **date-fns**: For date manipulation.
- **uuid**: For generating unique identifiers.

## How to Start and Run the Application

### Cloning the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/sarojadhikari076/giftcart-api
cd giftcart-api
```

### Setting Up the Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

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

### Running the Application

To start the application, run the following commands:

```bash
# Install the dependencies
npm install

# Start the application
npm run start
```

The application will be running at `http://localhost:9000`.

### Running with Docker

To run the application using Docker, execute the following commands:

```bash
# Build the Docker image
docker compose up --build
```

The application will be running at `http://localhost:9000`.
