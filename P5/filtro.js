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

const color = document.getElementById("color");
const grises = document.getElementById("grises");
const ruido = document.getElementById("ruido");

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

function rgb(){
  //-- Mostrar el nuevo valor del deslizador
  valorR.innerHTML = deslizadorR.value;
  valorG.innerHTML = deslizadorG.value;
  valorB.innerHTML = deslizadorB.value;

  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbral_R = deslizadorR.value;
  umbral_G = deslizadorG.value;
  umbral_B = deslizadorB.value;

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_R)
      data[i] = umbral_R;
    if (data[i+1] > umbral_G)
      data[i+1] = umbral_G;
    if (data[i+2] > umbral_B)
      data[i+2] = umbral_B;
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

function gray(){
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data;

  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i+=4){
      R = data[i];
      G = data[i+1];
      B = data[i+2];

  let brillo = (3 * R + 4 * G + B)/8
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
  }
  ctx.putImageData(imgData, 0, 0);
}

function noise(){
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data;

  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i+=4){
      data[i] = data[i] + (Math.random() * (50 - (-30) + (-30)));
      data[i+1] = data[i+1] + (Math.random() * (50 - (-30) + (-30)));
      data[i+2] = data[i+2] + (Math.random() * (50 - (-30) + (-30)));

  ctx.putImageData(imgData, 0, 0);
  }
}

color.onclick = () => {
  //-- Funcion de retrollamada del deslizadorR
  deslizadorR.oninput = () => {
    rgb();
  }

  //-- Funcion de retrollamada del deslizadorG
  deslizadorG.oninput = () => {
    rgb();
  }

  //-- Funcion de retrollamada del deslizadorB
  deslizadorB.oninput = () => {
    rgb();
  }
}

grises.onclick = () => {
  gray();
}

ruido.onclick = () => {
  noise();
}

console.log("Fin...");
