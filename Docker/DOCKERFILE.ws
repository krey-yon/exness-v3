FROM oven/bun:1

WORKDIR /usr/src/app

COPY . .

RUN bun install

EXPOSE 8081

CMD ["bun", "start:ws"]