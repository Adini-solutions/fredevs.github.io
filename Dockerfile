# Build de la SPA y servido con nginx (reemplaza a GitHub Pages).
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY public ./public
COPY src ./src
# ID de medición de GA4 (G-XXXXXXX). Vacío = sin analytics.
ARG REACT_APP_GA_ID=
ENV REACT_APP_GA_ID=$REACT_APP_GA_ID
RUN npm run build && rm -f build/404.html

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
