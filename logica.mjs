// logica.mjs

import { traccar, meitrack, autoleaders } from "./protocolos.mjs";

export const handler = (data) => {
  const meitrackResult = meitrack(data);
  const autoleadersResult = autoleaders(data);
  const traccarResult = traccar(data);

  let protocolType;
  if (data[0] === "$$") {
    protocolType = "meitrack";
  } else if (data[0] === "*") {
    protocolType = "autoleaders";
  } else if (data[0] === "P") {
    protocolType = "traccar";
  } else {
    return console.log("Protocolo desconocido");
  }

  try {
    if (data === null || data === undefined) {
      return null;
    } else {
      switch (protocolType) {
        case "meitrack":
          meitrackResult;
          break;
        case "autoleaders":
          autoleadersResult;
          break;
        case "traccar":
          traccarResult;
          break;
      }
    }
  } catch (e) {
    console.log(e);
    return console.log("Error en el protocolo");
  }
};

export default handler;
