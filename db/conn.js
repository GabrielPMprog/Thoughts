const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "", {

  host: process.env.HOST,
  port: process.env.DB_PORT,

  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("deu tudo certo!");
} catch (err) {
  console.log(`Não foi possível conectar + ${err}`);
}

module.exports = sequelize;
