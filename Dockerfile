FROM node:14
COPY . /app
WORKDIR /app
RUN npm i
RUN npm run build

FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html
COPY config/nginx.conf etc/nginx/conf.d/default.conf
RUN sed -i 's/https\:\/\/preview.pro.ant.design/http\:\/\/BACKEND_HOST/g' /etc/nginx/conf.d/default.conf
