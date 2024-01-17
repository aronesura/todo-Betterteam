import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface TodoAttributes {
  id: string;
  task: string;
  status: string;
  image: string;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'id'> {}

interface TodoInstance extends Model<TodoAttributes, TodoCreationAttributes>, TodoAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Todo = (sequelize: Sequelize) =>
  sequelize.define<TodoInstance>('Todo', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    task: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['todo', 'inProgress', 'completed'],
      defaultValue: 'todo',
      validate: {
        isIn: {
          args: [['todo', 'inProgress', 'completed']],
          msg: 'Invalid status.',
        },
      },
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });

export default Todo;
