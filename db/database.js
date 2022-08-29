import { config } from "../config.js";
import SQ from 'sequelize';


const {host, port, user, database, password} = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false,
    //logging: false, 데이터베이스 터미널에 로그남는 거 꺼줌.
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});