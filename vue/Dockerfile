FROM node:16 as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve the Vue.js app with Nginx
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]