const totalConta = 85;
const taxaGorjeta = 10;

const gorjetaCalculada = totalConta * (taxaGorjeta / 100);
const totalFinal = totalConta + gorjetaCalculada;

console.log(
  "Conta: R$" + totalConta.toFixed(2) +
  ", Gorjeta (" + taxaGorjeta + "%): R$" + gorjetaCalculada.toFixed(2) +
  ", Total: R$" + totalFinal.toFixed(2)
);