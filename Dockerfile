FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build:atom-network
RUN yarn build:gateway

FROM node:20 AS runner

WORKDIR /app

ENV NODE_ENV production

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo "Asia/Seoul" > /etc/timezone

RUN addgroup --gid 1001 --system nodejs
RUN adduser --system nestjs -u 1001

COPY --from=builder --chown=nestjs:nodejs /app/dist/ ./dist
COPY --from=builder --chown=nestjs:nodejs /app/.yarn ./.yarn
COPY --from=builder --chown=nestjs:nodejs /app/.yarnrc.yml .
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/.env.* .
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json* .
COPY --from=builder /app/yarn.lock* .
COPY --from=builder /app/ecosystem.config.js .

RUN npm install -g pm2@5.4.0
RUN mkdir .pm2
ENV PM2_HOME /app/.pm2
RUN pm2 list
RUN chown -R nestjs:nodejs /app/.pm2

RUN npm install -g bun
RUN bun -v

USER nestjs

EXPOSE 3000

CMD pm2-runtime start ecosystem.config.js