FROM ubuntu

# Install nano, sqlite3 and npm
RUN apt update
RUN apt install nano -y
RUN apt install sqlite3 -y
RUN apt install npm -y

# Create a directory for the app
RUN mkdir /app-backend
RUN mkdir /app-backend/database
RUN mkdir /app-backend/api

COPY ./database /app-backend/database
COPY ./api /app-backend/api

COPY package.json /app-backend/package.json

WORKDIR /app-backend

RUN npm install

WORKDIR /app-backend/api

CMD ["node", "server.js"]
