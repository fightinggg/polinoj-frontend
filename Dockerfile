FROM node:14
COPY . /app
WORKDIR /app
RUN npm i
RUN npm run build

FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html
