FROM node:22-alpine

WORKDIR /app

# Install build tools and languages
RUN apk update 

# Copy project files
COPY . .

# Install Node dependencies
RUN npm install

# Expose the server port
EXPOSE 5000

# Start the server
CMD ["node", "Main.js"]