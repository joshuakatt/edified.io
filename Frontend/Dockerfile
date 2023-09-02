# Use an official Node runtime as a base image
FROM --platform=linux/amd64 node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy all other files into the container
COPY . .

# Build the app
RUN npm run build

# Run the app when the container launches
CMD ["npm", "start"]
