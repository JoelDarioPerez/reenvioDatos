export const traccar = (data) => {
  const valores = {};
  const regex = /(?:\?|&)([^&=]+)=([^&]+)/g; // Expresión regular para buscar pares clave-valor

  let match;
  while ((match = regex.exec(data))) {
    const key = match[1];
    const value = match[2];
    valores[key] = value;
  }

  const longitud = () => {
    // Obtener los grados y minutos.
    let degrees = Math.floor(Math.abs(valores.lon));
    let minutes = (Math.abs(valores.lon) - degrees) * 60;
    return `${degrees.toString().padStart(3, "0")}${minutes.toFixed(4)}`;
  };

  function latitud() {
    // Obtener los grados y minutos.
    let degrees = Math.floor(Math.abs(valores.lat));
    let minutes = (Math.abs(valores.lat) - degrees) * 60;
    return `${degrees.toString().padStart(2, "0")}${minutes
      .toFixed(4)
      .padStart(7, "0")}`;
  }

  const hora = () => {
    const fechaActual = new Date();
    const horaActual = fechaActual.getHours().toString().padStart(2, "0");
    const minutosActuales = fechaActual
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const segundosActuales = fechaActual
      .getSeconds()
      .toString()
      .padStart(2, "0");
    return `${horaActual}${minutosActuales}${segundosActuales}`;
  };
  const fecha = () => {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate().toString().padStart(2, "0");
    const mesActual = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const anioActual = fechaActual.getFullYear().toString().slice(-2);
    return `${diaActual}${mesActual}${anioActual}`;
  };

  const speed = () => {
    let speed = valores.speed / 1.852;
    let velocidad = speed.toFixed(2);
    return velocidad.padStart(3, "0");
  };

  valores.directionLat = valores.lat >= 0 ? "S" : "N";
  valores.directionLong = valores.lon >= 0 ? "W" : "E";

  function St901Package() {
    let SendPackage = [
      "*HQ",
      valores.id,
      "V1",
      hora(),
      "A",
      latitud(),
      valores.directionLat,
      longitud(),
      valores.directionLong,
      speed(),
      "000",
      fecha(),
      "FFFFBBFF",
      "722",
      "310",
      "06211",
      "15036#",
    ];
    return SendPackage.join(",");
  }
  return St901Package(data);
};
export const meitrack = (data) => {
  let divided = data.split(",");
  let newPackage = {};
  newPackage.header = divided[0];
  newPackage.imei = divided[1];
  newPackage.commmandType = divided[2];
  newPackage.eventCode = divided[3];
  newPackage.lat = parseFloat(divided[4]);
  newPackage.directionLat = newPackage.lat >= 0 ? "N" : "S";
  newPackage.long = parseFloat(divided[5]);
  newPackage.directionLong = newPackage.long >= 0 ? "E" : "W";
  newPackage.dateTime = divided[6];
  newPackage.GPSstatus = divided[7];
  newPackage.NumberOfSats = divided[8];
  newPackage.gsmSingal = divided[9];
  newPackage.speed = divided[10];
  newPackage.direction = divided[11];
  newPackage.presition = divided[12];
  newPackage.altitude = divided[13];
  newPackage.mileage = divided[14];
  newPackage.runTime = divided[15];
  newPackage.GsmInformation = divided[16];
  newPackage.portStatus = divided[17];
  newPackage.AnalogImputs = divided[18];

  function longitud() {
    // Obtener los grados y minutos.
    let degrees = Math.floor(Math.abs(newPackage.long));
    let minutes = (Math.abs(newPackage.long) - degrees) * 60;
    return `${degrees.toString().padStart(3, "0")}${minutes.toFixed(4)}`;
  }
  const imei = (newPackage) => {
    if (newPackage.imei === "013227009650882") {
      return "013226004207938";
    } else if (newPackage.imei === "013226004207938") {
      return "353517090332210";
    } else return newPackage.imei;
  };
  function latitud() {
    // Obtener los grados y minutos.
    let degrees = Math.floor(Math.abs(newPackage.lat));
    let minutes = (Math.abs(newPackage.lat) - degrees) * 60;
    return `${degrees.toString().padStart(2, "0")}${minutes
      .toFixed(4)
      .padStart(7, "0")}`;
  }

  function fecha() {
    let yy = newPackage.dateTime.substring(0, 2);
    let mm = newPackage.dateTime.substring(2, 4);
    let dd = newPackage.dateTime.substring(4, 6);
    return `${dd}${mm}${yy}`;
  }

  function accStatus() {
    let portStatus = newPackage.portStatus[1];
    if (portStatus === 4) {
      return "FFFFBBFF";
    } else {
      return "FFFF9FFF";
    }
  }

  function St901Package() {
    let SendPackage = [
      "*HQ",
      imei(newPackage),
      "V1",
      newPackage.dateTime.substring(6, 12),
      newPackage.GPSstatus,
      latitud(),
      newPackage.directionLat,
      longitud(),
      newPackage.directionLong,
      (newPackage.speed / 1.852).toFixed(2),
      newPackage.direction,
      fecha(),
      accStatus(),
      "722",
      "310",
      "06211",
      "15036#",
    ];
    return SendPackage.join(",");
  }

  let send = St901Package();
  console.log(send + "paquete meitrack");
};
export const autoleaders = (data) => {
  let paquete = {};
  let paqueteSplit = data.split(",");
  paquete.header = paqueteSplit[0];
  paquete.id = paqueteSplit[1];
  paquete.v1 = paqueteSplit[2];
  paquete.time = paqueteSplit[3];
  paquete.GPSstatus = paqueteSplit[4];
  paquete.lat = paqueteSplit[5];
  paquete.latDirection = paqueteSplit[6];
  paquete.long = paqueteSplit[7];
  paquete.longDirection = paqueteSplit[8];
  paquete.speed = paqueteSplit[9];
  paquete.direction = paqueteSplit[10];
  paquete.date = paqueteSplit[11];
  paquete.status = paqueteSplit[12];

  console.log(paquete + "paquete autoleaders");
  return paquete;
};
