# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

RUN npx browserslist@latest --update-db

# Bundle the app source inside the Docker image
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=development

# Run the app when the container launches
CMD ["npm", "start"]
