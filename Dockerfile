FROM node:25-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -g corepack --force
RUN corepack cache clean
RUN corepack enable pnpm
RUN pnpm install
RUN pnpm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:root /app/dist /usr/share/nginx/html
RUN chown -R nginx:root /run /var /usr /home
USER nginx
CMD ["nginx", "-g", "daemon off;"]