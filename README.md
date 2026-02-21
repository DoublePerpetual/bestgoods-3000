# BestGoods - 全球最佳商品评选网站

## 🚀 快速开始

### 本地运行
```bash
# 1. 进入项目目录
cd bestgoods-complete-backup-20260221_0307

# 2. 安装依赖
npm install

# 3. 启动服务器
node bestgoods-complete-website.js

# 4. 访问网站
# 首页: http://localhost:3000/
# 详情页示例: http://localhost:3000/category/个护健康/剃须用品/一次性剃须刀
```

### Docker运行
```bash
# 构建镜像
docker build -t bestgoods .

# 运行容器
docker run -p 3000:3000 bestgoods
```

### Zeabur部署
1. 上传整个目录到Zeabur
2. Zeabur会自动构建和部署
3. 访问Zeabur提供的域名

## 📋 项目特性

### ✅ 已实现的5个生产需求
1. **应用于所有19万+品类** - 有数据的可点击，无数据的不可点击
2. **显示完整的评选理由** - 数据库中的完整段落内容
3. **点赞点踩初始值0** - 投票系统初始状态正确
4. **评论初始为空** - 评论系统初始状态正确
5. **生产就绪，功能正常** - 所有功能经过测试验证

### 🎯 Zeabur生产修复（已应用）
- ✅ 异步/await 处理完整
- ✅ 完善的错误处理
- ✅ 内存泄漏防护（评论限制1000条）
- ✅ 数据库优雅关闭
- ✅ 安全头和 CORS 配置

### 📊 数据规模
- **49个**一级分类
- **3,270个**二级分类
- **195,651个**三级分类
- **4,580个**已评选产品
- **14个**品牌

## 🔧 技术栈

### 后端
- **Node.js** + **Express.js** - Web服务器
- **SQLite3** - 数据库（轻量级，无需额外服务）
- **内存存储** - 投票和评论数据（生产环境可替换为Redis）

### 前端
- **Tailwind CSS** - 样式框架
- **Font Awesome** - 图标系统
- **原生JavaScript** - 无框架依赖

### 部署
- **Docker** - 容器化部署
- **Zeabur** - 云平台部署
- **3000端口** - 统一端口配置

## 📁 项目结构

```
bestgoods-complete-backup-20260221_0307/
├── bestgoods-complete-website.js    # 主程序文件（100%原始备份）
├── data/
│   └── bestgoods.db                 # SQLite数据库（4,580个产品）
├── package.json                     # 依赖配置
├── Dockerfile                       # 生产环境Docker配置
├── README.md                        # 本文件
├── README_COMPLETE.md               # 完整项目文档
├── ZEABUR_FIXES_APPLIED.md          # Zeabur修复记录
├── DEPLOY_TO_ZEABUR.md              # Zeabur部署指南
└── API_DOCUMENTATION.md             # API接口文档
```

## 🌐 API接口

### 健康检查
```bash
GET /health
```
返回服务器状态和数据库统计

### 投票系统
```bash
POST /api/vote
Content-Type: application/json

{
  "productId": "product_1_1",
  "priceId": 1,
  "dimensionId": 1,
  "voteType": "like"
}
```

### 评论系统
```bash
POST /api/comment
Content-Type: application/json

{
  "level1": "个护健康",
  "level2": "剃须用品",
  "level3": "一次性剃须刀",
  "content": "评论内容"
}
```

### 获取统计
```bash
GET /api/stats
```

## ⚠️ 重要原则

### UI设计原则
1. **永远不要修改首页UI** - 保持100%备份还原
2. **永远不要修改详情页UI** - 保持100%备份还原
3. **永远不要设计新的UI页面** - 只使用原始备份文件
4. **只实现功能需求** - 不改变视觉设计

### 开发原则
1. **使用原始备份文件** - `bestgoods-complete-website.js`
2. **保持端口统一** - 只使用3000端口
3. **应用Zeabur修复** - 确保生产环境稳定性
4. **完善错误处理** - 所有操作都有错误处理

## 🐛 故障排除

### 常见问题
1. **3000端口无法访问**
   ```bash
   # 检查端口占用
   lsof -i :3000
   
   # 停止占用进程
   kill <PID>
   ```

2. **数据库连接失败**
   - 检查 `data/bestgoods.db` 文件是否存在
   - 检查文件权限：`ls -la data/bestgoods.db`
   - 确保有足够的存储空间

3. **内存不足**
   - 评论系统已限制为1000条，自动清理最旧评论
   - 增加服务器内存分配

### 日志检查
```bash
# 查看服务器启动日志
node bestgoods-complete-website.js

# 健康检查
curl http://localhost:3000/health

# 查看统计信息
curl http://localhost:3000/api/stats
```

## 🔄 更新和维护

### 代码更新
1. 修改代码后测试功能
2. 确保UI设计不被修改
3. 部署到测试环境验证
4. 部署到生产环境

### 数据备份
1. 定期备份 `data/bestgoods.db` 文件
2. 使用SQLite工具导出数据
3. 存储备份到安全位置

### 监控告警
1. 监控健康检查端点
2. 监控内存使用情况
3. 监控错误率

## 📞 支持

### 文档
- **完整文档**: `README_COMPLETE.md`
- **API文档**: `API_DOCUMENTATION.md`
- **部署指南**: `DEPLOY_TO_ZEABUR.md`
- **修复记录**: `ZEABUR_FIXES_APPLIED.md`

### 测试
- **本地测试**: `http://localhost:3000/`
- **健康检查**: `http://localhost:3000/health`
- **详情页示例**: `http://localhost:3000/category/个护健康/剃须用品/一次性剃须刀`

### 问题反馈
1. 查看服务器日志
2. 检查健康检查端点
3. 验证数据库连接
4. 检查端口配置

## 🎉 验证清单

### 功能验证
- [ ] 首页可以正常访问
- [ ] 详情页可以点击打开
- [ ] 投票系统初始值为0
- [ ] 评论系统初始为空
- [ ] 所有分类正确显示

### 生产验证
- [ ] Zeabur 5大修复已应用
- [ ] 错误处理完善
- [ ] 内存泄漏防护生效
- [ ] 数据库优雅关闭
- [ ] 安全头配置正确

### UI验证
- [ ] 首页UI 100%备份还原
- [ ] 详情页UI 100%备份还原
- [ ] 零设计修改

---

**版本**: 2026-02-21 03:07 生产就绪版本  
**状态**: ✅ 所有功能正常，Zeabur修复已应用  
**原则**: UI设计100%按照原始备份还原，零修改