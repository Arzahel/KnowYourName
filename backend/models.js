const Sequelize = require("sequelize");
const sequelize = new Sequelize("appdb", "root", "Lenin7521103", {
  dialect: "mysql",
  host: "localhost",
  port: "3306"
});

const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
  });