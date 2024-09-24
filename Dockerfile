# Use Node.js 20 as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with architecture flag
RUN npm install --only=production --arch=arm64 --legacy-peer-deps

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Copy the wait-for-it.sh script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Copy the rest of your application code
COPY . .

# Ensure prisma directory is copied
COPY prisma ./prisma

RUN npm install @jozefazz/nestjs-redoc --save --legacy-peer-deps

# Install necessary dev dependencies for seeding (typescript, ts-node)
RUN npm install ts-node typescript @types/node --save-dev --legacy-peer-deps

# Generate Prisma client
RUN npx prisma generate

# Run migrations after the database is ready
CMD ["./wait-for-it.sh", "db:5432", "--", "npx", "prisma", "migrate", "deploy"]

# Build the Nest.js application
RUN npm run build

# Expose the port
EXPOSE 9000

# Use Nest.js' built-in dev mode
CMD ["npm", "run", "start:dev"]
