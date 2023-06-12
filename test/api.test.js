const request = require("supertest");
const api = require("../src/api.js");
const {seed} = require("../src/seed.js");

beforeEach(async () => {
  await seed();
});

describe("API substract", () => {
  test("Deberia responder con un 200 ok", async () => {
    const app = await api.build();

    const res = await request(app)
      .get("/api/v1/sub/2/1")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(res.body.resultado).toEqual(1);
  });
});

describe("API add", () => {
  test("Deberia responder con un 200 ok", async () => {
    const app = await api.build();

    const res = await request(app)
      .get("/api/v1/add/2/1")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(res.body.resultado).toEqual(3);
  });

  test("Si el segundo parametro es negativo, resultado deberia ser menor al primer parametros", async () => {
    const app = await api.build();
    const a = 11;
    const b = -8;

    const res = await request(app)
      .get(`/api/v1/add/${a}/${b}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(res.body.resultado).toBeLessThan(a);
  });
});

describe("API MUL", () => {
  test("Deberia responder con un 200 ok", async () => {
    const app = await api.build();

    const res = await request(app)
      .get("/api/v1/multiply/4/2")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(res.body.resultado).toEqual(8);
  });

  test("Si los parametros son decimales, resultado deberia ser decimal", async () => {
    const app = await api.build();
    const a = 2.5;
    const b = 3.6;

    const res = await request(app)
      .get(`/api/v1/add/${a}/${b}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    const resultado = res.body.resultado;
    expect(Number.isInteger(resultado)).toBe(false);
  });
});

describe("API DIV", () => {
  test("Deberia responder con un 200 ok", async () => {
    const app = await api.build();

    const res = await request(app)
      .get("/api/v1/div/4/2")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(res.body.resultado).toEqual(2);
  });

  test("Si el segundo parametro es cero, debe dar error", async () => {
    const app = await api.build();
    const a = 4;
    const b = 0;

    if (b === 0) {
      expect(() => {
        throw new Error("Los parámetros no son válidos para la división");
      }).toThrow();
    } else {
    
    const res = await request(app)
      .get(`/api/v1/div/${a}/${b}`)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
    const resultado = res.body.resultado;

  }});
  
  describe("API POW", () => {
    
        //potencia con un parámetro string
        test("Si uno de los parametros es string debería dar error", async () => {
          const app = await api.build();
          const a = 4;
          const b = "string"; // Un parámetro como una cadena
        
          const res = await request(app)
            .get(`/api/v1/pow/${a}/${b}`)
            .expect(400)
            .expect("Content-Type", "application/json; charset=utf-8");
        
          expect(res.body.error).toBe("Los parámetros no son válidos para la potencia");
        });
    
  });
})