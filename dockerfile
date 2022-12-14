FROM node:16.17.0-slim

WORKDIR /app
VOLUME [ "/src" ]
VOLUME [ "/test" ]

COPY ../package* /app

RUN ls

RUN npm install
RUN npm install chai

ENTRYPOINT [ "npm", "run", "test:cov"]