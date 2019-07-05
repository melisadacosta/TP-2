let local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
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


const precioMaquina = componentes => {
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

console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]));


const cantidadVentasComponente = componente => {
  let cantidadComponentesVendidos = 0;

  for (const venta of local.ventas) {
    for (const comp of venta.componentes) {
      if (componente === comp) {
        cantidadComponentesVendidos++;
      }
    }
  }

  return cantidadComponentesVendidos;
}
console.log(cantidadVentasComponente("Monitor ASC 543"));


const vendedoraDelMes = (mes, anio) => {
  let vendedoraConMasVentas = '';
  let mayorVenta = 0;
  for (const vendedora of local.vendedoras) {
    let ventasVendedora = local.ventas
      .filter(venta => venta.fecha.getMonth() + 1 === mes && venta.fecha.getFullYear() === anio)
      .filter(venta => venta.nombreVendedora === vendedora)
      .reduce((total, venta) => total += precioMaquina(venta.componentes), 0);
    if (ventasVendedora > mayorVenta) {
      mayorVenta = ventasVendedora;
      vendedoraConMasVentas = vendedora;
    }
  }
  return vendedoraConMasVentas;
}
console.log(vendedoraDelMes(1, 2019));


const ventasMes = (month, year) => {
  const ventasMonthAndYear = local.ventas.filter(venta => venta.fecha.getMonth() + 1 === month && venta.fecha.getFullYear() === year);
  let ventasDelMes = 0;
  for (const venta of ventasMonthAndYear) {
    ventasDelMes += precioMaquina(venta.componentes)
  }

  return ventasDelMes;
}
console.log(ventasMes(1, 2019));


const ventaGeneral = elemento => {
  let suma = 0;
  elemento.forEach(venta => {
    suma += precioMaquina(venta.componentes);
  });
  return suma;
}

const ventasVendedora = nombre => {
  let vendedora = [];
  for (let i = 0; i < local.ventas.length; i++) {
    if (local.ventas[i].nombreVendedora === nombre) {
      vendedora.push(local.ventas[i]);
    }
  }
  return ventaGeneral(vendedora);
}
console.log(ventasVendedora("Grace"));


const componenteMasVendido = () => {
  const componentes = ["Monitor GPRS 3000", "Motherboard ASUS 1500", "Monitor ASC 543", "Motherboard ASUS 1200", "Motherboard MZI", "HDD Toyiva", "HDD Wezter Dishital", "RAM Quinston", "RAM Quinston Fury"];
  let comparacion = 0;
  let componenteMasVendido = '';
  for (const comp of componentes) {
    let compMasVendido = cantidadVentasComponente(comp);
    if (compMasVendido > comparacion) {
      comparacion = compMasVendido;
      componenteMasVendido = comp;
    }
  }
  return componenteMasVendido;
}
console.log(componenteMasVendido());


const huboVentas = (mes, anio) => {
  mes = mes - 1;
  const obtengoMesAño = ventas =>
    (ventas.fecha.getMonth() === mes) &&
    (ventas.fecha.getFullYear() === anio);
  const filtroMesAnio = local.ventas.filter(obtengoMesAño);

  return filtroMesAnio.length ? true : false;
}
console.log(huboVentas(3, 2019));


local.ventas.map(v => v.sucursal = "Centro");


local.sucursales = ['Centro', 'Caballito'];


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


ventasSucursal = sucursal => {
  const sucursalVentas = ventas => ventas.sucursal === sucursal;
  const ventaPorSucursal = local.ventas.filter(sucursalVentas);
  return ventaGeneral(ventaPorSucursal);

}
console.log(ventasSucursal("Centro"));


const sucursalDelMes = (mes, anio) => {
  const ventasSucursal = venta => venta.fecha.getMonth() + 1 === mes && venta.fecha.getFullYear() === anio;
  const ventasPorMes = local.ventas.filter(ventasSucursal);
  let masVentasPorMes = 0;
  let nombreSucursal = '';

  const sumaVentas = (ventas) => {
    let ventasTotales = 0;
    ventas.map(venta => {
      ventasTotales += precioMaquina(venta.componentes);
    });
    return ventasTotales;
  }
  for (let sucursal of local.sucursales) {
    const vSucursal = venta => venta.sucursal === sucursal;
    const ventasDeSucursal = ventasPorMes.filter(vSucursal);
    if (sumaVentas(ventasDeSucursal) > masVentasPorMes) {
      masVentasPorMes = sumaVentas(ventasDeSucursal);
      nombreSucursal = sucursal;
    }
  } return nombreSucursal;
}
console.log(sucursalDelMes(1, 2019));


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
      ventaDelMes += precioMaquina(venta.componentes)
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
      ventaDeLaSucursal += precioMaquina(venta.componentes)
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


const render = () => {
  const vendedoraConMasI = () => {
    let masI = 0;
    let vendedoraConMasIngresos = "";
    for (vendedora of local.vendedoras) {
      if (ventasVendedora(vendedora) >= masI) {
        masI = ventasVendedora(vendedora);
        vendedoraConMasIngresos = vendedora;
      }
    }
    return vendedoraConMasIngresos;
  }
  const render = () => {
    let renderFinal =
      (`Reporte \n${renderPorMes()}\n${renderPorSucursal()}\nVendedora que más ingresos generó: ${vendedoraConMasI()}\n\nProducto estrella: ${componenteMasVendido()}`);
    return renderFinal;
  }
  console.log(render());
}
render();
