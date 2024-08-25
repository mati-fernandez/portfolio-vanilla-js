// Esta función se ejecutará cuando se cargue la página
const orderConverter = function () {
  const textoPedido = `Mix Europeo
        Peso: 250gr
        Cantidad: 1
        Precio: $2.360

        Chip banana
        Peso: 250gr
        Cantidad: 1
        Precio: $1.710

        Chía premium
        Peso: 250gr
        Cantidad: 1
        Precio: $830

        Sésamo integral premium
        Peso: 250gr
        Cantidad: 1
        Precio: $490
        Total: $5.390`;

  const regex =
    /([\s\S]*?)\nPeso: (\d+gr)[\s\S]*?Cantidad: (\d+)[\s\S]*?(?=(?:\n\n|$))/g;

  const productosFormateados = [];

  let match;
  while ((match = regex.exec(textoPedido)) !== null) {
    const producto = match[1].trim();
    const peso = match[2];
    const cantidad = match[3];
    productosFormateados.push(`${cantidad} ${producto} ${peso}`);
  }

  console.log('Productos formateados:', productosFormateados);

  // Obtener el elemento HTML donde mostrar el resultado
  const resultadoHTML = document.getElementById('resultado');

  console.log('Elemento HTML resultado:', resultadoHTML);

  // Generar el resultado con saltos de línea
  const resultadoFinal = productosFormateados.join('<br>');

  // Mostrar el resultado en el HTML
  resultadoHTML.innerHTML = resultadoFinal;

  console.log('Resultado final:', resultadoFinal);
};

document.addEventListener('DOMContentLoaded', orderConverter);
