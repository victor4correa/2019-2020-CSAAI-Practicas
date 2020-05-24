console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");
//-- Obtener Sonidos
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");
const sonido_tanto = new Audio("pong-tanto.mp3")
//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");
var pointP1 = 0;
var pointP2 = 0;

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  SAQUE: 1,
  JUGANDO: 2,
}

//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;

//-- Pintar todos los objetos en el canvas
function draw() {

  //-- Dibujar el texto de comenzar
  if (estado == ESTADO.INIT) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Pulsa Start!", 30, 350);
  }
  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if (estado == ESTADO.JUGANDO) {
    bola.draw();
  }

  //-- Dibujar las raquetas
  raqI.draw();
  raqD.draw();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Estilo de la linea: discontinua
  //-- Trazos de 10 pixeles, y 10 de separacion
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 0);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  //------ Dibujar el tanteo
  ctx.font = "100px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(pointP1, 200, 80);
  ctx.fillText(pointP2, 340, 80);

    //-- Dibujar el texto de sacar
  if (estado == ESTADO.SAQUE) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Saca!", 30, 350);
  }

  //-- Dibujar el texto de comenzar
  if (estado == ESTADO.INIT) {
    ctx.font = "40px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Pulsa Start!", 30, 350);
  }
}

//---- Bucle principal de la animación
function animacion()
{

  //-- Actualizar las posiciones de los objetos móviles

  //-- Actualizar la raqueta con la velocidad actual
  raqI.update();
  raqD.update();

  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= canvas.width) {
    //-- Hay colisión. Cambiar el signo de la bola
    estado = ESTADO.SAQUE;
    bola.x_ini = raqD.x-5;
    bola.y_ini = raqD.y+15;
    bola.init();
    bola.vx = 0;
    bola.vy = 0;
    pointP1 += 1;
    sonido_tanto.currentTime = 0;
    sonido_tanto.play();
  }else if (bola.x <= 0){
    //-- Hay colisión. Cambiar el signo de la bola
    estado = ESTADO.SAQUE;
    bola.x_ini = raqI.x+11;
    bola.y_ini = raqI.y+15;
    bola.vx = 0;
    bola.vy = 0;
    bola.init();
    pointP2 += 1;
    sonido_tanto.currentTime = 0;
    sonido_tanto.play();
  }else if(bola.y >= canvas.height || bola.y <=0){
    bola.vy = bola.vy * -1;
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
  }


  //-- Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
      bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
    bola.vx = bola.vx * -1;
    bola.vy = raqI.v;
    sonido_raqueta.currentTime = 0;
    sonido_raqueta.play();
  }else if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width) &&
  bola.y >= raqD.y && bola.y <=(raqD.y + raqD.height)){
    bola.vx = bola.vx * -1;
    bola.vy = raqD.v;
    sonido_raqueta.currentTime = 0;
    sonido_raqueta.play();
  }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola.update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();

  //-- Arrancar la animación
  window.requestAnimationFrame(animacion);
}

//-- Inicializa la bola: Llevarla a su posicion inicial
const bola = new Bola(ctx);

//-- Crear las raquetas
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);

//-- Cambiar las coordenadas de la raqueta derecha
raqD.x_ini = 540;
raqD.y_ini = 300;
raqD.init();



//-- Retrollamada de las teclas
window.onkeydown = (e) => {
  //-- En el estado inicial no se
//-- hace caso de las teclas
if (estado == ESTADO.INIT){
    return;
}

  switch (e.key) {
    case "a":
      if(raqI.y >= canvas.height - 40){
        raqI.y = canvas.height - 40;
      }else{
        raqI.v = raqI.v_ini;
      }
      break;
    case "q":
      if(raqI.y <= 20){
        raqI.y = 10;
      }else{
      raqI.v = raqI.v_ini * -1;
    }
      break;
    case "p":
      if(raqD.y <= 20){
        raqD.y = 10;
      }else{
      raqD.v = raqD.v_ini * -1;
    }
      break;
    case "l":
      if(raqD.y >= canvas.height - 40){
        raqD.y = canvas.height - 40;
      }else {
      raqD.v = raqD.v_ini;
    }
      break;
    case "s":

    //-- El saque solo funciona en el estado de SAQUE
      if (estado == ESTADO.SAQUE) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

        //-- Llevar bola a su posicion incicial
        bola.init();

        //-- Darle velocidad
        bola.vx = (Math.random() * (5 - 3) + 3);
        bola.vy = (Math.random() * (5 - 3) + 3);

        //-- Cambiar al estado de jugando!
        estado = ESTADO.JUGANDO;

        return false;
      }
    default:
  }
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    //-- Quitar velocidad de la raqueta
    raqI.v = 0;
  }

  if (e.key == "p" || e.key == "l") {
    raqD.v = 0;
  }
}

//-- Botón de arranque
const start = document.getElementById("Start");

start.onclick = () => {
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

//-- Boton de stop
const stop = document.getElementById("Stop");

stop.onclick = () => {
  //-- Volver al estado inicial
  estado = ESTADO.INIT;
  bola.init();
  start.disabled = false;
}
animacion();
