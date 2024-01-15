const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts","root","",{
  port: process.env.DB_PORT,
  host: process.env.HOST,
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("deu tudo certo!");
} catch (err) {
  console.log(`Não foi possível conectar + ${err}`);
}

module.exports = sequelize;
