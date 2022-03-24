FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
RUN npm install -g firebase-tools
# RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 7070
CMD [ "node", "dist/app.js" ]