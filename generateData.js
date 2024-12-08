const mongoose = require('mongoose');
const Assignment = require('./model/assignment');
const assignmentsData = require('./data.json');

// 替换为你从 MongoDB Atlas 获取的连接字符串
const mongoDB_URI = 'mongodb+srv://Shella:Asdf1480@cluster0.hyvci.mongodb.net/assignments?retryWrites=true&w=majority';

// 连接 MongoDB Atlas
mongoose.connect(mongoDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to MongoDB Atlas.');
  insertData(); // 成功连接后插入数据
}).catch((err) => {
  console.error('Connection error', err);
});

// 插入数据
const insertData = async () => {
  try {
    await Assignment.insertMany(assignmentsData);
    console.log('Data has been inserted successfully!');
    mongoose.connection.close(); // 插入完成后关闭连接
  } catch (err) {
    console.error('Error inserting data:', err);
  }
};