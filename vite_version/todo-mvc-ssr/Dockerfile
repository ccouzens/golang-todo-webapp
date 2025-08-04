FROM node:22-slim AS builder
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . ./
RUN pnpm run build:client
RUN pnpm run build:server

FROM node:22-slim
WORKDIR /app
EXPOSE 5173
COPY --from=builder /app/dist/ ./dist/
CMD ["dist/server/server.js"]
