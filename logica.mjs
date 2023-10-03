// logica.mjs
import * as protocolos from "./protocolos.mjs";
import * as net from "net";

const WANWAY = "hwc9760.gpsog.com";
const WWPORT = 9760;

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
        // Resto del procesamiento para el protocolo Meitrack
        break;
      case "autoleaders":
        processedData = protocolos.autoleaders(data);
        // Resto del procesamiento para el protocolo Autoleaders
        break;
      case "traccar":
        processedData = protocolos.traccar(data);
        // Resto del procesamiento para el protocolo Traccar
        break;
    }

    // Envía los datos procesados a la dirección y puerto especificados
    const clientToSend = net.createConnection(WWPORT, WANWAY, () => {
      clientToSend.write(processedData.toString());
      clientToSend.end();
    });

    clientToSend.on("error", (err) => {
      console.error(`Error al enviar datos: ${err.message}`);
    });

    // También puedes realizar alguna acción adicional si es necesario
    // Por ejemplo, guardar los datos procesados en una base de datos, etc.
  } catch (e) {
    console.log(e);
    console.log("Error en el protocolo");
  }
};
