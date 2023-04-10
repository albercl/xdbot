import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize({
    database: "xd_bot",
    dialect: "mariadb",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
});

sequelize.sync({ alter: true });

export default sequelize;
