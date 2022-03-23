# Doctors-MicroService

API Doctors

## Members
 - AZIZE Younes
 - MENDACI Zahir

# Install, Configure & Run

```bash
# Without Docker

# Install NPM dependencies.
npm install;

# Compile Typescript code
npm run build

# Run the app
npm start;
```

```bash
# With Docker

# Switch to the branch "docker"

docker build . -t doctors-docker

docker network create patients-doctors

docker container run --network patients-doctors --name doctors -p 7070:7070 -d doctors-docker

```

