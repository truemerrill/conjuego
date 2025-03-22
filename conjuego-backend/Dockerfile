FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "dev"]
