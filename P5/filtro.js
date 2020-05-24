console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizadorR = document.getElementById('R');
const deslizadorG = document.getElementById('G');
const deslizadorB = document.getElementById('B');

//-- Valor del deslizador
const valorR = document.getElementById('valorR');
const valorG = document.getElementById('valorG');
const valorB = document.getElementById('valorB');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

//-- Situar la imagen original en el canvas
//-- No se han hecho manipulaciones todavia
ctx.drawImage(img, 0,0);

//-- Funcion de retrollamada del deslizadorR
deslizadorR.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  valorR.innerHTML = deslizadorR.value;

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbralR = deslizadorR.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbralR)
      data[i] = umbralR;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada del deslizadorG
deslizadorG.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  valorG.innerHTML = deslizadorG.value;


  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbralG = deslizadorG.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 1; i < data.length; i+=4) {
    if (data[i] > umbralG)
      data[i] = umbralG;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Funcion de retrollamada del deslizadorB
deslizadorB.oninput = () => {
  //-- Mostrar el nuevo valor del deslizador
  valorB.innerHTML = deslizadorB.value;


  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbralB = deslizadorB.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 2; i < data.length; i+=4) {
    if (data[i] > umbralB)
      data[i] = umbralB;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

console.log("Fin...");
