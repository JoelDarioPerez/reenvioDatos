// servidor.mjs
import * as net from "net";
import { handler } from "./logica.mjs";

function gpsTrackerServer(host, port) {
  const server = net.createServer((clientSocket) => {
    console.log(
      `Cliente conectado desde: ${clientSocket.remoteAddress}:${clientSocket.remotePort}`
    );

    clientSocket.on("data", (data) => {
      // Procesamos los datos recibidos y obtenemos la respuesta
      handler(clientSocket, data.toString()); // Pasamos 'clientSocket' como argumento
      // ...
      // Aquí puedes realizar alguna acción con los datos recibidos si lo deseas
    });

    clientSocket.on("end", () => {
      console.log("Cliente cerró la conexión.");
    });

    clientSocket.on("error", (err) => {
      console.log(`Error en la conexión del cliente: ${err.message}`);
    });
  });

  server.on("error", (err) => {
    console.log(`Error en el servidor: ${err.message}`);
  });

  server.listen(port, host, () => {
    console.log(`Servidor escuchando en ${host}:${port}`);
  });
}

const host = "0.0.0.0"; // Escucha en todas las interfaces
const port = 9700; // Puerto del servidor TCP
gpsTrackerServer(host, port);
