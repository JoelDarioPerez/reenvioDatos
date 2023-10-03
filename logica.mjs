// logica.mjs
// logica.mjs
import * as protocolos from "./protocolos.mjs";

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
    switch (protocolType) {
      case "meitrack":
        const meitrackResult = protocolos.meitrack(data);
        // Resto del procesamiento para el protocolo Meitrack
        break;
      case "autoleaders":
        const autoleadersResult = protocolos.autoleaders(data);
        // Resto del procesamiento para el protocolo Autoleaders
        break;
      case "traccar":
        const traccarResult = protocolos.traccar(data);
        // Resto del procesamiento para el protocolo Traccar
        break;
    }

    // Después de procesar los datos, puedes enviar la respuesta al cliente
    client.write(data.toString()); // Esto enviará los datos procesados de vuelta al cliente
  } catch (e) {
    console.log(e);
    console.log("Error en el protocolo");
  }
};
