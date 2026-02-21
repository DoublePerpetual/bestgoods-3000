#!/usr/bin/env node

/**
 * 数据库初始化脚本
 * 用于在克隆仓库后创建SQLite数据库
 */

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

console.log('🚀 开始初始化BestGoods数据库...');

// 数据库路径
const dbPath = path.join(__dirname, 'data/bestgoods.db');
const dbDir = path.dirname(dbPath);

// 确保目录存在
if (!fs.existsSync(dbDir)) {
  console.log(`📁 创建数据库目录: ${dbDir}`);
  fs.mkdirSync(dbDir, { recursive: true });
}

// 删除已存在的数据库
if (fs.existsSync(dbPath)) {
  console.log(`🗑️  删除已存在的数据库: ${dbPath}`);
  fs.unlinkSync(dbPath);
}

// 创建新的数据库
console.log(`🗃️  创建新数据库: ${dbPath}`);
const db = new sqlite3.Database(dbPath);

// 创建表结构
db.serialize(() => {
  console.log('📊 创建表结构...');
  
  // 创建品类表
  db.run(`
    CREATE TABLE categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level1 TEXT NOT NULL,
      level2 TEXT NOT NULL,
      level3 TEXT NOT NULL,
      UNIQUE(level1, level2, level3)
    )
  `);
  
  // 创建产品表
  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      name TEXT NOT NULL,
      brand TEXT,
      price REAL,
      rating REAL,
      review_count INTEGER,
      description TEXT,
      evaluation TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);
  
  // 创建投票表
  db.run(`
    CREATE TABLE votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      upvotes INTEGER DEFAULT 0,
      downvotes INTEGER DEFAULT 0,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);
  
  // 创建评论表
  db.run(`
    CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      username TEXT DEFAULT '匿名用户',
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);
  
  console.log('✅ 表结构创建完成');
  
  // 插入示例数据
  console.log('📝 插入示例数据...');
  
  // 插入示例品类
  const categories = [
    ['个护健康', '剃须用品', '一次性剃须刀'],
    ['医疗保健', '按摩器材', '中频按摩仪'],
    ['数码电子', '手机', '智能手机'],
    ['家用电器', '厨房电器', '电饭煲'],
    ['服装鞋帽', '男装', '衬衫']
  ];
  
  const stmt = db.prepare('INSERT INTO categories (level1, level2, level3) VALUES (?, ?, ?)');
  categories.forEach(cat => {
    stmt.run(cat);
  });
  stmt.finalize();
  
  // 插入示例产品
  const products = [
    [1, '吉列锋速3一次性剃须刀', '吉列', 29.9, 4.5, 1250, '一次性剃须刀，方便快捷', '锋利耐用，适合旅行使用'],
    [2, '康佳中频按摩仪', '康佳', 299.0, 4.2, 890, '家用中频按摩仪，缓解肌肉疲劳', '多种模式，操作简单'],
    [3, '小米14 Pro', '小米', 4999.0, 4.8, 5600, '旗舰智能手机', '性能强劲，拍照出色'],
    [4, '美的电饭煲', '美的', 399.0, 4.6, 3200, '智能电饭煲，多种烹饪模式', '煮饭香，操作方便'],
    [5, '优衣库男士衬衫', '优衣库', 199.0, 4.4, 2100, '纯棉男士衬衫', '舒适透气，版型好']
  ];
  
  const productStmt = db.prepare('INSERT INTO products (category_id, name, brand, price, rating, review_count, description, evaluation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  products.forEach(prod => {
    productStmt.run(prod);
  });
  productStmt.finalize();
  
  // 初始化投票数据
  for (let i = 1; i <= 5; i++) {
    db.run('INSERT INTO votes (category_id, upvotes, downvotes) VALUES (?, 0, 0)', i);
  }
  
  console.log('✅ 示例数据插入完成');
});

db.close(err => {
  if (err) {
    console.error('❌ 数据库关闭错误:', err.message);
  } else {
    console.log('🎉 数据库初始化完成！');
    console.log(`📁 数据库位置: ${dbPath}`);
    console.log('📊 包含:');
    console.log('   - 5个示例品类');
    console.log('   - 5个示例产品');
    console.log('   - 投票系统（初始值0）');
    console.log('   - 评论系统（初始为空）');
    console.log('\n🚀 现在可以运行: npm start 启动服务器');
  }
});