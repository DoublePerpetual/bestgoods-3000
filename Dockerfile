# BestGoods Zeabur生产部署Dockerfile
# 基于Node.js 18 Alpine镜像，轻量级

FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装生产依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 创建数据目录
RUN mkdir -p data

# 暴露端口
EXPOSE 3076

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3076/health || exit 1

# 启动命令
CMD ["node", "bestgoods-zeabur-fixed.js"]