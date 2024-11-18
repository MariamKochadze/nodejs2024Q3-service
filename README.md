# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

1. Clone repository from https://github.com/mariariazanova/nodejs2024Q3-service. If you are using HTTPS: git clone https://github.com/mariariazanova/nodejs2024Q3-service.git

```
git clone {repository URL}
```

## Installing NPM modules

1. Move to directory nodejs2024Q3-service.
2. Switch to the correct branch

```
git switch part2
```

3. Install all dependencies.

```
npm install
```

## Running application

1. Create a copy of file .env.example with name .env in the same directory (/.env).
2. Before starting, you need to run Docker (for example, open Docker Desktop)

```
npm run start:docker-detached
```


## Testing

After application is running (app SHOULD BE RUNNING!) open new terminal:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Checking app functionality

You'll that images are pulled from Docker Hub:

[+] Running 23/3

✔ app 8 layers [⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled 3.0s

✔ postgres 13 layers [⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled 3.0s

Then network node-postgres-bridge and 2 volumes are created, 2 containers (app and postgres) are run (wait until their status is Started):

[+] Running 2/5
- Network node-postgres-bridge        Created                                                                                                                                     1.2s
- Volume "nodejs2024q3-service_logs"  Created                                                                                                                                     1.1s
- Volume "nodejs2024q3-service_db"    Created                                                                                                                                     1.1s

  ✔ Container postgres                  Started 0.7s

  ✔ Container app                       Started 0.9s


Link to my page on Docker Hub https://hub.docker.com/u/mariariazanova


Open API documentation is available via link http://localhost:4000/doc/


Containers, images (with their size), volumes (with their content) can be seen for example in Docker Desktop (see some attached photo in PR description).


To check that containers auto restart after crash:
1. In docker-compose.yml change command for postgres container from command: postgres -c port=${DB_INT_PORT} -c logging_collector=on -c log_destination=stderr -c log_directory=/logs -c log_statement=all
to incorrect command: /bin/false
2. Run app
```
npm run start:docker-detached
```
3. See information about docker images (run several times one by one): 
```
docker ps
```
4. The result will be like this (look at status of postgres container - container tries to restart):

PS C:\Users\m.ryazanova\nodejs\node-rsschool\hm-part2-2\nodejs2024Q3-service> docker ps

| CONTAINER ID | IMAGE                         | COMMAND                | CREATED       | STATUS                                | PORTS                  | NAMES    |
| ------------ |-------------------------------|------------------------|---------------|---------------------------------------|------------------------|----------|
| a2b1cb2acf13 | nodejs2024q3-service-app      | "docker-entrypoint.s…" | 5 seconds ago | Up 3 seconds                          | 0.0.0.0:4000->4000/tcp | app      |
| 6799c99604f9 | nodejs2024q3-service-postgres | "docker-entrypoint.s…" | 5 seconds ago | Restarting (1) Less than a second ago |                        | postgres |

PS C:\Users\m.ryazanova\nodejs\node-rsschool\hm-part2-2\nodejs2024Q3-service> docker ps

| CONTAINER ID | IMAGE                         | COMMAND                | CREATED       | STATUS                                | PORTS                  | NAMES    |
| ------------ |-------------------------------|------------------------|---------------|---------------------------------------|------------------------|----------|
| a2b1cb2acf13 | nodejs2024q3-service-app      | "docker-entrypoint.s…" | 6 seconds ago | Up 5 seconds                          | 0.0.0.0:4000->4000/tcp | app      |
| 6799c99604f9 | nodejs2024q3-service-postgres | "docker-entrypoint.s…" | 6 seconds ago | Restarting (1) Less than a second ago |                        | postgres |

5. Return correct command back, run 
```
npm run start:docker-detached
```

```
docker ps
```

and observe that both containers are up.
6. The same scenario can be used to check app container (change command for app).


To check that application is restarting upon changes implemented into src folder:
1. Open app container in Docker Desktop on tab Logs or run continuous logs in console:
```
docker logs -f app
```

2. Change something in one of the files inside src.
3. Observe that logs are changing:

[2:02:19 PM] File change detected. Starting incremental compilation...


To check vulnerabilities scanning:

```
npm run docker-scan:app
```

```
npm run docker-scan:postgres
```


### Checking formatting

```
npm run lint
```

```
npm run format
```


