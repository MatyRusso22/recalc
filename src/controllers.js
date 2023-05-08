import express from "express";
import core from "./core.js";

const router = express.Router();

router.get("/sub/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send("Uno de los parámetros no es un número");
  } else {
    const result = core.sub(a, b);
    return res.send({result});
  }
});

router.get("/add/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send("Uno de los parámetros no es un número");
  } else {
    const result = core.add(a, b);
    return res.send({result});
  }
});

router.get("/div/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b) || b === 0) {
    res.status(400).send("Los parámetros no son válidos para la división");
  } else {
    const result = core.div(a, b);
    return res.send({result});
  }
});

router.get("/multiply/:a/:b", async function (req, res) {
  const params = req.params;
  const a = Number(params.a);
  const b = Number(params.b);

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send("Los parámetros no son válidos para el producto");
  } else {
    const result = core.mul(a, b);
    return res.send({result});
  }
});

export default router;
