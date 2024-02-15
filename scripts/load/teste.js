const { error } = require("console");
const fs = require("fs");

const n = 10;

const message = new Array(n);
for (let i = 0; i < 10; i++) {
  message[i] = {
    "tipoEvento": "mensagem",
    "codigoCredor": 2,
    "entidadeId": (Math.floor(Math.random() * 11))     
  };
}

const my = JSON.stringify(message);

fs.writeFile("./my.json", my, (error) => {
  if (error) {
    console.log("vixe");
    throw error;
  } else console.log("Sucesso");
});
