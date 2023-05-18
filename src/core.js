function add(a, b) {
  return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Uno de los parámetros no es un número');
  }
    return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir por 0");
  }
  return a / b;
}

function pow(a, b) {
  // no entiendo porque dice que esta funcion tiene un bug,
  //el usuario ingresa dos numeros
  //el primer numero puede ser la base y el segundo el exponente
  // es cierto que se podria dar esta informacion al usuario... pero mucha carpinteria

  return Math.pow(a, b);
}

export default {
  add: add,
  sub: subtract,
  mul: multiply,
  div: divide,
  pow: pow,
};
