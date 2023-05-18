import core from "../src/core.js";


describe("Subtract", () => {
  test("Deberia 2 - 2 = 0", () => {
    expect(core.sub(2, 2)).toBe(0);
  });

  test("Deberia 6 - 4 = 2", () => {
    expect(core.sub(6, 4)).toBe(2);
  });
});

describe("Prueba de la función suma", () => {
  // Suma de numeros naturales
  test("La suma de 2 + 3 debe ser igual a 5", () => {
    expect(core.add(2, 3)).toBe(5);
  });

  // Suma con numeros negativos
  test("La suma de -1 + 1 debe ser igual a 0", () => {
    expect(core.add(-1, 1)).toBe(0);
  });

  // Suma de numeros con coma
  test("La suma de 0.1 + 0.2 debe ser igual a 0.3", () => {
    expect(core.add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe("Prueba de la funcion division", () => {
  //Division de numeros naturales
  test("La division de 4 / 2 debe ser igual a 2", () => {
    expect(core.div(4, 2)).toBe(2);
  });

  //Division de un numero negativo y un numero natural
  test("La division de -4 / 2 debe ser igual a -2", () => {
    expect(core.div(-4, 2)).toBe(-2);
  });

  //Division de dos numeros negativos
  test("La division de -4 / -2 debe ser igual a 2", () => {
    expect(core.div(-4, -2)).toBe(2);
  });

  //Division por cero
  test("La division de un numero por cero, debe arrojar error", () => {
    expect(() => core.div(4, 0)).toThrow("No se puede dividir por 0");
  });
});

describe("Prueba de la funcion producto", () => {
  //producto de numeros enteros positivos
  test("El producto de 4 * 2 debe ser igual a 8", () => {
    expect(core.mul(4, 2)).toBe(8);
  });

  //Producto de numeros positivos con numero negativos debe ser menor que 0
  test("El producto de un número positivo por un número negativo debe ser menor a 0", () => {
    expect(core.mul(-4, 2)).toBeLessThan(0);
  });

  //producto de dos numeros negativos debe ser mayor que 0
  test("El producto de dos números negativos debe ser mayor a 0", () => {
    expect(core.mul(-10, -5)).toBeGreaterThan(0);
  });

  test('Debería lanzar un error al intentar usar un parámetro que no es un número', () => {
    expect(() => core.mul(2, "A")).toThrow('Uno de los parámetros no es un número');
  });
});

describe("Prueba de la funcion potencia", () => {
  //potencia de numeros enteros positivos
  test("4^ 2 debe ser igual a 16", () => {
    expect(core.pow(4, 2)).toBe(16);
  });

  //potencia con base negativa y exponente positivo
  test("-4^ 2 debe ser igual a 16", () => {
    expect(core.pow(-4, 2)).toBe(16);
  });
});
