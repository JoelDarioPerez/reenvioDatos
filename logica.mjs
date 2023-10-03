import { traccar, meitrack, autoleaders } from "./protocolos.mjs";

const meitrackResult = meitrack(data);
const autoleadersResult = autoleaders(data);
const traccarResult = traccar(data);

let protocolType;
if (data[0] === "$") {
  protocolType = "meitrack";
} else if (data[0] === "*") {
  protocolType = "autoleaders";
} else if (data[0] === "P") {
  protocolType = "traccar";
} else {
  console.log("Protocolo desconocido");
  return null;
}

export const handler = (data) => {
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
    return null;
  }
};
export default handler;
