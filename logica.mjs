// logica.mjs
// logica.mjs
import * as protocolos from "./protocolos.mjs";

export const handler = (data) => {
  let protocolType;
  if (data[0] === "$" && data[1] === "$") {
    protocolType = "meitrack";
  } else if (data[0] === "*") {
    protocolType = "autoleaders";
  } else if (data[0] === "P") {
    protocolType = "traccar";
  } else {
    console.log("Protocolo desconocido");
    return; // Salir de la función si el protocolo es desconocido
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
  } catch (e) {
    console.log(e);
    console.log("Error en el protocolo");
  }
};
