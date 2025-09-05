# 1. 构建阶段
FROM node:14 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # 生成 dist/

# 2. 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]
