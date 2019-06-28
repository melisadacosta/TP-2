let local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
    // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
    { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
    { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
    { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
  ],

  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
  ]
};

// precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la 
// máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioMaquina = function (...componentes) {

  let suma = 0;

  componentes.forEach(c => {
    local.precios.forEach(comp => {
      if (comp.componente === c) {
        suma += comp.precio;
      }
    });
  });

  return suma;

}


console.log(precioMaquina("Monitor GPRS 3000", "Motherboard ASUS 1500")); // 320 ($200 del monitor + $120 del motherboard)


// vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el 
// nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, 
// sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. 
// El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).


const vendedoraDelMes = (mes, anio) => {
  let ventasMesAnio = [];

  for (let i = 0; i < local.ventas.length; i++) {
    if (local.ventas[i].fecha.getMonth() === mes && local.ventas[i].fecha.getFullYear() === anio) {
      ventasMesAnio.push(local.ventas[i]);
      console.log(ventasMesAnio);
    }
  }

  let precio = 0;

  ventasMesAnio.forEach(comp => {
    comp.componentes.forEach(c => {
      precio += precioMaquina(c);
    });
  });
  console.log(precio);

  let vendedoraMes = "";

//   ventasMesAnio.forEach(vend => {
//     vend.nombreVendedora.forEach(v =>{
//       console.log(v)
//     });
//   });

// console.log(vendedoraMes);

}

//ventas por mes
//ventas por vendedora
//ventas por mes por vendedora (mes año vendedora)
//obtener total por ventas por vendedora

console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)


//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = nombre =>{
  let vendedora = [];

  for(let i = 0; i < local.ventas.length; i++){
    if(local.ventas[i].nombreVendedora === nombre){
      vendedora.push(local.ventas[i]);
    }
  }

  let ventaTotalVendedora = 0;

  vendedora.forEach(venta =>{
    venta.componentes.forEach(v=>{
      ventaTotalVendedora += precioMaquina(v)
    });
  });
  
  return ventaTotalVendedora;
  
}

console.log( ventasVendedora("Grace") ); // 900

