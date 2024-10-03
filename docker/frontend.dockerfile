FROM node:20-alpine

ARG REACT_APP_NAME
ARG REACT_APP_DESCRIPTION
ARG REACT_APP_LANG
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_BACKEND_CLIENT_ID
ARG REACT_APP_POD_PROVIDER_BASE_URL
ARG REACT_APP_MAPBOX_ACCESS_TOKEN

RUN node -v
RUN npm -v

WORKDIR /app/frontend

RUN apk add --update --no-cache autoconf bash libtool automake python3 py3-pip alpine-sdk openssh-keygen yarn nano

RUN yarn global add serve

# Install packages first so that Docker doesn't run `yarn install` if the packages haven't changed
# See https://making.close.com/posts/reduce-docker-image-size
ADD frontend/package.json /app/frontend
ADD frontend/yarn.lock /app/frontend
RUN yarn install && yarn cache clean

ADD frontend /app/frontend

RUN yarn run build

EXPOSE 4000

CMD serve -s build -l 4000
