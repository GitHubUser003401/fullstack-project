FROM node:22-alpine

WORKDIR /server

# Install build tools and languages
RUN apk update && apk add --no-cache g++ openjdk21-jdk python3

# Set Java environment variable (optional but recommended)
# ENV JAVA_HOME="/usr/lib/jvm/java-21-openjdk"

# Copy project files
COPY . .

# Install Node dependencies
RUN npm install

# Expose the server port
EXPOSE 6060

# Start the server
CMD ["node", "index.js"]