FROM node:14-alpine as builder
ENV NODE_ENV development
WORKDIR /app
COPY ./ ./
## Install build toolchain, install node deps and compile native add-ons, needed for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python git
RUN npm install
RUN npm run build && rm -rf node_modules
RUN npm install --only=production
RUN rm -rf deploy chart tests && find . -maxdepth 1 -type f -not -name "package.*" -not -name "swagger.*" -delete

FROM node:14-alpine as app
## Copy built node modules and binaries without the dev toolchain
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 8080
USER node

CMD npm run start
