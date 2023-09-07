import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const ask = ({ msj }) => {
  return new Promise((resolve) => {
    rl.question(msj, (respuesta) => {
      resolve(respuesta.toUpperCase() === "Y");
    });
  });
};
