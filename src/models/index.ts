import { Sequelize } from 'sequelize';
import TodoModel from './todo.model';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config.cjs')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

interface Db {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: any;
}

const db: Db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  Todo: TodoModel(sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};
