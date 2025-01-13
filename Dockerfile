# Base image with Node.js
FROM node:16

# Install MongoDB
RUN apt-get update && \
    apt-get install -y gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && \
    apt-get install -y mongodb-org supervisor

# Create directories for server, client, and MongoDB data
WORKDIR /app
RUN mkdir -p /app/server /app/client /data/db

# Copy and install server dependencies
COPY server/package*.json /app/server/
WORKDIR /app/server
RUN npm install
COPY server/ /app/server

# Copy and install client dependencies (Vite frontend)
COPY client/package*.json /app/client/
WORKDIR /app/client
RUN npm install
RUN npm i -g serve
COPY client/ /app/client
RUN npm run build

# Copy Supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY check_and_send.sh /app/check_and_send.sh
RUN chmod +x /app/check_and_send.sh

# Expose necessary ports
EXPOSE 3000 8080  27017

# Default command to start Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
