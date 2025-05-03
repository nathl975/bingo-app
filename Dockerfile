FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (default for Vite is 5173)
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev"]