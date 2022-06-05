FROM node:14-buster-slim

RUN echo "deb http://deb.debian.org/debian bullseye main contrib non-free" >> /etc/apt/sources.list && \
    apt update -y && \
    apt install -y unrar curl && \
    apt clean && \
    rm -rf /var/lib/apt/lists

RUN useradd -m -s /bin/bash app && \
    mkdir -p /app && \
    chown -R app:app /app

USER app

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV LANG C.UTF-8

CMD [ "node", "index.js" ]
