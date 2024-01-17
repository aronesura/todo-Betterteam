import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config.cjs')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db: any = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-9) === '.model.ts';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(sequelize);

    console.log(model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

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
