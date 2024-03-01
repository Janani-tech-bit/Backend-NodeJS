module.exports = {
  HOST: "192.168.29.20",
  USER: "root",
  PASSWORD: "password123",
  DB: "test",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
