const textoPedido = `
Mix Europeo
Peso: 250gr
Cantidad: 1
Precio:  $2.360 

Chip banana
Peso: 250gr
Cantidad: 1
Precio:  $1.710 

Chía premium
Peso: 250gr
Cantidad: 1
Precio:  $830 

Sésamo integral premium
Peso: 250gr
Cantidad: 1
Precio:  $490 
Total:
$5.390`;

// Expresión regular para eliminar palabras específicas y precios
const regex = /(Peso:|Cantidad:|Precio:|Total:|\$\d+(?:\.\d{1,2})?)/g;

// Eliminar palabras y precios del texto
const textoModificado = textoPedido.replace(regex, '').trim();

// Dividir el texto en líneas y eliminar las líneas vacías
const lineas = textoModificado
  .split('\n')
  .filter((linea) => linea.trim() !== '');

// Crear el formato deseado
const productosFormateados = [];
let producto = '';
for (const linea of lineas) {
  if (/^\d+/.test(linea)) {
    const partes = linea.split(' ');
    const cantidad = partes.shift();
    producto += ` ${cantidad}`;
  } else {
    producto += ` ${linea}`;
    if (linea.endsWith('gr')) {
      producto += ' '; // Agregar espacio después del peso
    }
  }
  if (producto.endsWith('1') || producto.endsWith('2')) {
    producto += '\n'; // Agregar salto de línea al final del producto
  }
}
productosFormateados.push(producto.trim());

// Imprimir el resultado
console.log(productosFormateados.join('\n'));
