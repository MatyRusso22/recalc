import {Sequelize, DataTypes} from "sequelize";

const inTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize({
  dialect: "sqlite",
  logging: !inTest,
  storage: inTest ? ":memory:" : "./db.sqlite3",
});

export const History = sequelize.define("History", {
  firstArg: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  secondArg: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  result: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
});

export const Operation = sequelize.define("Operation", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Operation.hasMany(History);
History.belongsTo(Operation);

export async function createHistoryEntry({
  firstArg,
  secondArg,
  operationName,
  result,
}) {
  const operation = await Operation.findOne({
    where: {
      name: operationName,
    },
  });

  return History.create({
    firstArg,
    secondArg,
    result,
    OperationId: operation.id,
  });
}

export async function getHistorial() {
  return History.findAll();
}

export async function deleteHistorial() {
  await History.destroy({
    where: {},
    truncate: true
  });
}

export function createTables() {
  return Promise.all([
    History.sync({force: true}),
    Operation.sync({force: true}),
  ]);
}

class History extends Model {}
History.init(
  {
    firstArg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    secondArg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    error: {
      type: DataTypes.TEXT, // Agrega el nuevo atributo "error" del tipo texto
    },
  },
  {
    sequelize,
    modelName: "History",
  }
);

// Resto del código del modelo...

module.exports = { History, Operation };
