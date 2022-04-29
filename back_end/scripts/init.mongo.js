/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo TechForum scripts/init.mongo.js
 */

db.users.remove({});
db.segments.remove({});
db.blogs.remove({});
db.comments.remove({});

const userDB = [
  {
      username: 'Alice',
      password: '123456',
      phone: '12345678',
      email: 'Alice@163.com',
      blogs: []
  },
  {
      username: 'Bob',
      password: '123456',
      phone: '87654321',
      email: 'Bob@163.com',
      blogs: []
  }
];

const blogDB = [
  {
    username: "Alice",
    segments: [],
    title: "HTML tutorial",
    type: "Front_End",
    publishDate: "2022/4/25 15:59"
  },
  {
    username: "Alice",
    segments: [],
    title: "CSS tutorial",
    type: "Front_End",
    publishDate: "2022/4/25 15:59"
  },
  {
    username: "Alice",
    segments: [],
    title: "Angular tutorial",
    type: "Front_End",
    publishDate: "2022/4/25 15:59"
  },
  {
    username: "Alice",
    segments: [],
    title: "React tutorial",
    type: "Front_End",
    publishDate: "2022/4/25 15:59"
  },
  {
    username: "Bob",
    segments: [],
    title: "Mongodb tutorial",
    type: "Back_End",
    publishDate: "2022/4/25 15:59"
  },
  {
    username: "Bob",
    segments: [],
    title: "MYSQL tutorial",
    type: "Back_End",
    publishDate: "2022/4/25 15:59"
  },
  {
    username: "Bob",
    segments: [],
    title: "Redis tutorial",
    type: "Back_End",
    publishDate: "2022/4/25 15:59"
  },
  {
    username: "Bob",
    segments: [],
    title: "java tutorial",
    type: "Back_End",
    publishDate: "2022/4/25 15:59"
  }
];

db.users.insertMany(userDB);
db.blogs.insertMany(blogDB);
