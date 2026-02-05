# Server Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
