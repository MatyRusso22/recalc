import express from "express";
import core from "./core.js";

import {createHistoryEntry, getHistorial, History} from "./models.js";

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send({error: "Uno de los parámetros no es un número"});
  } else {
    const result = core.sub(a, b);

    await createHistoryEntry({
      firstArg: a,
      secondArg: b,
      result,
      operationName: "SUB",
    });
    return res.send({resultado: result});
  }
});

router.get("/add/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send({error: "Uno de los parámetros no es un número"});
  } else {
    const result = core.add(a, b);
    await createHistoryEntry({
      firstArg: a,
      secondArg: b,
      result,
      operationName: "ADD",
    });
    return res.send({resultado: result});
  }
});

router.get("/div/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b) || b === 0) {
    res
      .status(400)
      .send({error: "Los parámetros no son válidos para la división"});
  } else {
    const result = core.div(a, b);
    await createHistoryEntry({
      firstArg: a,
      secondArg: b,
      result,
      operationName: "DIV",
    });
    return res.send({resultado: result});
  }
});

router.get("/multiply/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b)) {
    res
      .status(400)
      .send({error: "Los parámetros no son válidos para el producto"});
  } else {
    const result = core.mul(a, b);
    await createHistoryEntry({
      firstArg: a,
      secondArg: b,
      result,
      operationName: "MUL",
    });
    return res.send({resultado: result});
  }
});

router.get("/pow/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b)) {
    res
      .status(400)
      .send({error: "Los parámetros no son válidos para la potencia"});
  } else {
    const result = core.pow(a, b);
    await createHistoryEntry({
      firstArg: a,
      secondArg: b,
      result,
      operationName: "POW",
    });
    return res.send({resultado: result});
  }
});

router.get("/all", async function (req, res) {
  const historial = await getHistorial();
  return res.send({historial});
});

router.get("/delete-all", async function (req, res) {
  try {
    await deleteHistorial(); // Llamada a la función para eliminar todo el historial
    return res.send("Historial eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el historial:", error);
    return res.status(500).send("Error al eliminar el historial");
  }
});

export default router;
