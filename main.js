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

const precioMaquina = (...componentes) => {

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
  mes = mes - 1;
  masVentasHechas = 0;
  let vendedoraConMasVentas = [];
  for (let i = 0; i < local.ventas.length; i++) {
    if ((local.ventas[i].fecha.getMonth() === mes) && (local.ventas[i].fecha.getFullYear() === anio)) {
      ventasMesAnio.push(local.ventas[i]);
      console.log(ventasMesAnio);
    }
  }

  // let precio = 0;

  // ventasMesAnio.forEach(comp => {
  //   comp.componentes.forEach(c => {
  //     precio += precioMaquina(c);
  //   });
  // });
  // console.log(precio);

  // let vendedoraMes = "";



  local.vendedoras.forEach(vendedora => {
    let ventasHechasPorVendedora = 0;
    ventasMesAnio.forEach(venta => {
      if (venta.nombreVendedora === vendedora) {
        ventasHechasPorVendedora += precioMaquina(venta.componentes)
      }
    })
    if (ventasHechasPorVendedora >= masVentasHechas) {
      masVentasHechas = ventasHechasPorVendedora;
      vendedoraConMasVentas.push({ vendedora: vendedora, cantidadVendido: ventasHechasPorVendedora })
    }
  })

  const masVentas = vendedoraConMasVentas.filter(v => v.cantidadVendido === masVentasHechas)

  return masVentas.forEach(nombre => {
    console.log(nombre.vendedora);

  })
}



//ventas por mes
//ventas por vendedora
//ventas por mes por vendedora (mes año vendedora)
//obtener total por ventas por vendedora

console.log(vendedoraDelMes(2, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)


//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = nombre => {
  let vendedora = [];

  for (let i = 0; i < local.ventas.length; i++) {
    if (local.ventas[i].nombreVendedora === nombre) {
      vendedora.push(local.ventas[i]);
    }
  }

  let ventaTotalVendedora = 0;

  vendedora.forEach(venta => {
    venta.componentes.forEach(v => {
      ventaTotalVendedora += precioMaquina(v)
    });
  });

  return ventaTotalVendedora;

}

console.log(ventasVendedora("Grace")); // 900


// huboVentas(mes, anio): que indica si hubo ventas en un mes determinado.
//  El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio) => {
  mes = mes - 1;
  const obtengoMesAño = ventas =>
    (ventas.fecha.getMonth() === mes) &&
    (ventas.fecha.getFullYear() === anio);
  const filtroMesAnio = local.ventas.filter(obtengoMesAño);

  return filtroMesAnio.length ? true : false;
}


console.log(huboVentas(3, 2019)); // false


// Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen
//  el nombre de la sucursal en la cual se realizó. Por ejemplo: { fecha: new Date(2019, 1, 1),
//    nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }. 
//    Por este cambio, se pide:

// En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es
//    la sucursal original).

local.ventas.map(v => v.sucursal = "Centro");

// Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

local.sucursales = ['Centro', 'Caballito'];

// Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el 
// patrón: fecha, nombreVendedora, componentes, sucursal


const nuevasVentas = [
  { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Motherboard MZI", "RAM Quinston Fury"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "RAM Quinston"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 8), nombreVendedora: "Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 5), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 1), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "HDD Wezter Dishital"], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro" },
];
let ventasTotal = local.ventas.concat(nuevasVentas);
local.ventas = ventasTotal;

// Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas
//  por una sucursal sin límite de fecha.


ventasSucursal = sucursal => {
  const sucursalVentas = ventas => ventas.sucursal === sucursal;
  const ventaPorSucursal = local.ventas.filter(sucursalVentas);

  let cantidadDeVentas = 0;

  ventaPorSucursal.forEach(venta => {
    venta.componentes.forEach(v => {
      cantidadDeVentas += precioMaquina(v)
    });
  });

  return cantidadDeVentas;
}

console.log(ventasSucursal("Centro")); // 4195

// Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma
//  funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que
//   ambas funciones reutilicen código y evitemos repetir?



// Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, 
// (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. 
// No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el 
// que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio) => {
  const obtengoMesAño = ventas =>
    (ventas.fecha.getMonth() === mes) &&
    (ventas.fecha.getFullYear() === anio);
  const filtroMesAnio = local.ventas.filter(obtengoMesAño);

  let cantidadVentaPorSucursal = 0;
  let cantidadTotalDeVentas = 0;
  const sucursalConMasVentas = [];
  local.sucursales.forEach(sucursal => {
    filtroMesAnio.forEach(ventaSucursal => {
      if (ventaSucursal.sucursal === sucursal) {
        cantidadVentaPorSucursal += precioMaquina(ventaSucursal.precio)
      }
    })

    if (cantidadVentaPorSucursal >= cantidadTotalDeVentas) {
      cantidadTotalDeVentas = cantidadVentaPorSucursal;
      sucursalConMasVentas.push({ sucursal: sucursal, cantidadVendido: cantidadVentaPorSucursal, })
    }


  });

  const masVentas = sucursalConMasVentas.filter(suc => suc.cantidadVendido === cantidadTotalDeVentas);

  return masVentas;

}
console.log(sucursalDelMes(1, 2019)); // "Centro"


//  Para tener una mejor muestra de como está resultando el local, queremos desarrollar
//   un reporte que nos muestre las ventas por sucursal y por mes. Para esto, necesitamos
//    crear las siguientes funciones:

//  renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año


const renderPorMes = () => {

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "diciembre"]
  ventasTotales = [];

  for (let i = 0; i < meses.length; i++) {
    const obtengoMes = ventas =>
      (ventas.fecha.getMonth() === i);
    const filtroMes = local.ventas.filter(obtengoMes);

    let ventaDelMes = 0;
    filtroMes.forEach(venta => {
      venta.componentes.forEach(v => {
        ventaDelMes += precioMaquina(v)
      });
    });

    ventasTotales.push({ mes: meses[i], year: 2019, ventas: ventaDelMes })
  }
  let resultado = `Ventas por mes: \n`
  ventasTotales.forEach(venta => {
    if (venta.ventas > 0) {
      resultado += `Total de ${venta.mes} ${venta.year}: ${venta.ventas} \n`
    }
  })
  return resultado;
}
console.log(renderPorMes());



const renderPorSucursal = () => {
  let ventasDeSucursales = [];

  local.sucursales.forEach(sucursal => {
    const obtengoSucursal = local.ventas.filter(venta => venta.sucursal === sucursal)
    let ventaDeLaSucursal = 0

    obtengoSucursal.forEach(venta => {
      venta.componentes.forEach(v => {
        ventaDeLaSucursal += precioMaquina(v)
      });
    });
      
    ventasDeSucursales.push({ sucursal: sucursal, ventas: ventaDeLaSucursal })
  });
  let resultado = `Ventas por sucursal: \n`
  ventasDeSucursales.forEach(venta => {
    resultado += `Total de ${venta.sucursal}: ${venta.ventas} \n`
  })
  return resultado;
}

console.log(renderPorSucursal());

// render(): Tiene que mostrar la unión de los dos reportes anteriores, 
// cual fue el producto más vendido y la vendedora que más ingresos generó

const render = () => {


  renderPorMes();
  renderPorSucursal();
}

console.log(render());
// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
// Vendedora que más ingresos generó: Grace

