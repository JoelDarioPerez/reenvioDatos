// logica.mjs
import * as protocolos from "./protocolos.mjs";
import * as net from "net";

const NEW_IP = "184.72.135.82";
const NEW_PORT = "9700";
const NEW_APN = "internet.ctimovil.com.ar";
const APN_USER = "clarogprs";
const APN_PASSWORD = "clarogprs999";

// Función para calcular el checksum CRC-CCITT
const crc16_ccitt = (data) => {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

// Función para crear el comando de cambio de IP
const createIPChangeCommand = (deviceId) => {
  const data = `31,${NEW_IP},${NEW_PORT},${NEW_APN},${APN_USER},${APN_PASSWORD}`;
  const commandWithoutChecksum = `@@${(data.length + 12).toString(16).padStart(4, '0')}${deviceId}4155${data}`;
  const checksum = crc16_ccitt(commandWithoutChecksum);
  const command = `${commandWithoutChecksum}${checksum}\r\n`;
  return command;
};

export const handler = (client, data) => {
  let protocolType;
  if (data.startsWith("$$")) {
    protocolType = "meitrack";
  } else if (data.startsWith("*")) {
    protocolType = "autoleaders";
  } else if (data.startsWith("P")) {
    protocolType = "traccar";
  } else {
    console.log("Protocolo desconocido");
    return;
  }

  try {
    let processedData;

    switch (protocolType) {
      case "meitrack":
        processedData = protocolos.meitrack(data);
        const deviceId = data.substring(2, 12); // Ajustar según la documentación del dispositivo
        const ipChangeCommand = createIPChangeCommand(deviceId);
        client.write(ipChangeCommand);
        console.log(`Enviando comando para cambiar IP: ${ipChangeCommand}`);
        break;
      case "autoleaders":
        processedData = protocolos.autoleaders(data);
        break;
      case "traccar":
        processedData = protocolos.traccar(data);
        break;
    }

    // Envía los datos procesados a la dirección y puerto especificados (si es necesario)
    if (processedData) {
      const clientToSend = net.createConnection(WWPORT, WANWAY, () => {
        clientToSend.write(processedData.toString());
        clientToSend.end();
      });

      clientToSend.on("error", (err) => {
        console.error(`Error al enviar datos: ${err.message}`);
      });
    }
  } catch (e) {
    console.log(e);
    console.log("Error en el protocolo");
  }
};

// servidor.mjs
import * as net from "net";
import { handler } from "./logica.mjs";

function gpsTrackerServer(host, port) {
  const server = net.createServer((clientSocket) => {
    console.log(`Cliente conectado desde: ${clientSocket.remoteAddress}:${clientSocket.remotePort}`);

    clientSocket.on("data", (data) => {
      // Procesamos los datos recibidos y obtenemos la respuesta
      handler(clientSocket, data.toString()); // Pasamos 'clientSocket' como argumento
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
