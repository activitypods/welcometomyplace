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

RUN apk add --update --no-cache autoconf bash libtool automake python3 py3-pip alpine-sdk openssh-keygen yarn nano

RUN yarn global add serve

ADD frontend /app/frontend

WORKDIR /app/frontend

# Install packages and immediately remove cache to reduce layer size
# See https://making.close.com/posts/reduce-docker-image-size
RUN yarn install && yarn cache clean

RUN yarn run build

EXPOSE 4000

CMD serve -s build -l 4000