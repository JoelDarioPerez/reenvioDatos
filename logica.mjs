import { traccar, meitrack, autoleaders } from "./protocolos.mjs";
import data from "./servidor.mjs";

const meitrackResult = meitrack(data);
const autoleadersResult = autoleaders(data);
const traccarResult = traccar(data);

export const handler = (data) => {
  if (data[0] === "$") {
    try {
      meitrackResult;
    } catch (e) {
      console.log(e);
    }
  } else if (data[0] === "*") {
    try {
      autoleadersResult;
    } catch (e) {
      console.log(e);
    }
  } else if (data[0] === "P") {
    try {
      traccarResult;
    } catch (e) {
      console.log(e);
    }
  }
};
export default handler;
