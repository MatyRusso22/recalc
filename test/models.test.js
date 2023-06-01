const {seed} = require("../src/seed.js");
const {createHistoryEntry, History, Operation} = require("../src/models.js");

beforeEach(async () => {
  await seed();
});

describe("History", () => {
  test("Deberia poder crear una resta en el history", async () => {
    await createHistoryEntry({
      firstArg: 2,
      secondArg: 2,
      result: 0,
      operationName: "SUB",
    });

    const histories = await History.findAll({
      include: [Operation],
    });

    expect(histories.length).toEqual(1);
    expect(histories[0].firstArg).toEqual(2);
    expect(histories[0].result).toEqual(0);
    expect(histories[0].Operation.name).toEqual("SUB");
  });

  test("Debería persistir todos los argumentos ", async () => {
    const entry = {
      firstArg: 6,
      secondArg: 2,
      result: 4,
      operationName: "SUB",
    };
    await createHistoryEntry(entry);

    const histories = await History.findAll({
      include: [Operation],
    });

    expect(histories.length).toEqual(1);
    expect(histories[0].firstArg).toEqual(6);
    expect(histories[0].secondArg).toEqual(2);
    expect(histories[0].result).toEqual(4);
    expect(histories[0].Operation.name).toEqual("SUB");
  });

  test("Debería devolver todo el historial ", async () => {
    const entry = {
      firstArg: 6,
      secondArg: 2,
      result: 4,
      operationName: "SUB",
    };
    const entry2 = {
      firstArg: 9,
      secondArg: 1,
      result: 8,
      operationName: "SUB",
    };
    await createHistoryEntry(entry);
    await createHistoryEntry(entry2);

    const histories = await History.findAll();

    expect(histories.length).toEqual(2);
    expect(histories[0].firstArg).toEqual(6);
    expect(histories[0].secondArg).toEqual(2);
    expect(histories[0].result).toEqual(4);
    expect(histories[1].firstArg).toEqual(9);
    expect(histories[1].secondArg).toEqual(1);
    expect(histories[1].result).toEqual(8);
  });

  test("Debería borrar todo el historial", async () => {
    const entry = {
      firstArg: 6,
      secondArg: 2,
      result: 4,
      operationName: "SUB",
    };
    const entry2 = {
      firstArg: 9,
      secondArg: 1,
      result: 8,
      operationName: "SUB",
    };
    await createHistoryEntry(entry);
    await createHistoryEntry(entry2);
  
    await History.destroy({ where: {} });
  
    const histories = await History.findAll();
  
    expect(histories.length).toEqual(0);
  });
  
});

test("Debería guardar el atributo 'error' en la base de datos", async () => {
  const entry = {
    firstArg: 6,
    secondArg: 0,
    result: null, // El resultado es nulo porque hay un error de división por cero
    operationName: "DIV",
    error: "Error: División por cero", // Nuevo atributo "error"
  };
  await createHistoryEntry(entry);

  const history = await History.findOne({
    where: {
      firstArg: 6,
      secondArg: 0,
    },
  });

  expect(history.error).toEqual("Error: División por cero");
});
