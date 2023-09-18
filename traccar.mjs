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
  console.log(St901Package(data));
  return St901Package(data);
};
