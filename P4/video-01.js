console.log("Ejecutando JS...");

//----- Obtener elemento de video y configurarlo
const video1 = document.getElementById("video1")
const video2 = document.getElementById("video2")
const video3 = document.getElementById("video3")
const mainvideo = document.getElementById("mainvideo")

video1.width=300;  //-- Tamaño de la pantalla de video
video1.height=200;
video2.width=300;
video2.height=200;
video3.width=300;
video3.height=200;
mainvideo.height=500;
mainvideo.width=600;


//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
video1.poster="https://github.com/myTeachingURJC/2019-2020-CSAAI/raw/master/L10/test.png";
video2.poster="http://2.bp.blogspot.com/-X0ONQBX-Fbw/Vn1j-pZ8cqI/AAAAAAAABtY/QsyjjRv4M8c/s1600/carta%2Bde%2Bajuste%2Brmtv.jpg";
video3.poster="https://www.cienciatk.csic.es/uploads/prevs/0cartadeajuste.jpg";
mainvideo.poster = "https://naftic.com/wp-content/uploads/2018/06/facebook-live-crossposting.jpg"
//-- Obtener los botones
const play1 = document.getElementById("play1")
const stop1 = document.getElementById("stop1")
const play2 = document.getElementById("play2")
const stop2 = document.getElementById("stop2")
const play3 = document.getElementById("play3")
const stop3 = document.getElementById("stop3")

video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4"
//-- Función de retrollamada del botón de ver
play1.onclick = () => {
  console.log("Click!");
  document.getElementById("video1").classList.add("borderColor");
  document.getElementById("video2").classList.remove("borderColor");
  document.getElementById("video3").classList.remove("borderColor");

  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
  video1.play();
  mainvideo.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
  mainvideo.play();
};

//-- Funcion de retrollamada del boton de parar
stop1.onclick = () => {
  video1.pause();
  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  video1.src=null;
}
//-- Función de retrollamada del botón de ver
play2.onclick = () => {
  console.log("Click!");
  document.getElementById("video2").classList.add("borderColor");
  document.getElementById("video1").classList.remove("borderColor");
  document.getElementById("video3").classList.remove("borderColor");

  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
  video2.play();
  mainvideo.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
  mainvideo.play();
};

//-- Funcion de retrollamada del boton de parar
stop2.onclick = () => {
  video2.pause();
  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  video2.src=null;
}
//-- Función de retrollamada del botón de ver
play3.onclick = () => {
  console.log("Click!");
  document.getElementById("video3").classList.add("borderColor");
  document.getElementById("video2").classList.remove("borderColor");
  document.getElementById("video1").classList.remove("borderColor");
  
  video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4"
  video3.play();
  mainvideo.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4"
  mainvideo.play();
};

//-- Funcion de retrollamada del boton de parar
stop3.onclick = () => {
  video3.pause();
  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  video3.src=null;
}
