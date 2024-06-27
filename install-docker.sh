#!/bin/bash

sudo apt-get update

sudo apt-get --yes install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get --yes install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Test Docker as root
sudo docker run hello-world

sudo groupadd --force docker

sudo usermod -aG docker $USER

newgrp docker

# Test docker without root
docker run hello-world
