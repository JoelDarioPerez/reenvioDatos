import { traccar, meitrack, autoleaders } from "./protocolos.mjs";

const meitrackResult = meitrack(data);
const autoleadersResult = autoleaders(data);
const traccarResult = traccar(data);

export const handler = (data) => {
  try {
    if (data === null || data === undefined) {
      return null;
    } else if (data[0] === "$") {
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
  } catch (e) {
    console.log(e);
    return null;
  }
};
export default handler;
