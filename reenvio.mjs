export const handler = (data) => {
  let newPackage = (data) => {
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
    newPackage.portStatus = divided[17][1];
    newPackage.AnalogImputs = divided[18];

    function longitud() {
      // Obtener los grados y minutos.
      let degrees = Math.floor(Math.abs(newPackage.long));
      let minutes = (Math.abs(newPackage.long) - degrees) * 60;
      return `${degrees.toString().padStart(3, "0")}${minutes.toFixed(4)}`;
    }

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
      let portStatus = newPackage.portStatus;
      if (portStatus === 4) {
        return "FFFFBBFF";
      } else {
        return "FFFF9FFF";
      }
    }

    let speed = (newPackage) => {
      speed = (newPackage.speed / 1.852).toFixed(2);
      return speed.toString().padStart(6, "0");
    };

    function St901Package(newPackage) {
      let SendPackage = [
        "*HQ",
        newPackage.imei,
        "V1",
        newPackage.dateTime.substring(6, 12),
        newPackage.GPSstatus,
        latitud(newPackage),
        newPackage.directionLat,
        longitud(newPackage),
        newPackage.directionLong,
        speed(newPackage),
        newPackage.direction.padStart(3, "0"),
        fecha(newPackage),
        accStatus(newPackage),
        "722",
        "310",
        "06211",
        "15036#",
      ];
      return SendPackage.join(",");
    }

    let send = St901Package(newPackage);
    console.log(send);
    return send;
  };
  let autoleaders = () => {
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
  if (data[0] === "$") {
    try {
      return newPackage(data);
    } catch (error) {
      console.log(error);
    }
  } else if (data[0] === "*") {
    try {
      autoleaders(data);
    } catch (error) {
      console.log(error);
    }
  } else console.log("Paquete no manejado" + data);
};
