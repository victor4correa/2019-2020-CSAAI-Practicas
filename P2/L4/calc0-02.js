console.log("Ejecutando JS...");

display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

//-- Estados de la calculadora
const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2_INIT: 3,
  OP2: 4,
}
var estado = ESTADO.INIT;
//-- Ha llegado un dígito
function number(num)
{
  //-- Segun el estado hacemos una cosa u otra
  if (estado == ESTADO.INIT || estado == ESTADO.OP1 ) {
    display.innerHTML = num;
    estado = ESTADO.OP1;
  }else if (estado == ESTADO.OPERATION){
    display.innerHTML += num;
    estado = ESTADO.OP2_INIT;
  }else if(estado == ESTADO.OP2_INIT || estado == ESTADO.OP2){
    display.innerHTML += num;
    estado = ESTADO.OP2;
  }
}

function operador (op){
  //-- Segun el estado hacemos una cosa u otra
  if (estado == ESTADO.OP1){
    display.innerHTML += op;
    estado = ESTADO.OPERATION;
  }else if(estado == ESTADO.OP2_INIT){
    display.innerHTML += op;
    estado = ESTADO.OP1;
  }else if (estado == ESTADO.OP2){
    display.innerHTML += op;
    estado = ESTADO.OP1;
  }
}

function resultado(){
  if (estado == ESTADO.OP2 || estado == ESTADO.OP2_INIT){
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.OP1;
  }
}

//-- Crear un array con todos los elementos
//-- de la clase digito
digito = document.getElementsByClassName("digito")

for (i=0; i<digito.length; i++) {
  digito[i].onclick = (ev) => {
    number(ev.target.value)
  }
}

//-- Insertar simbolo de sumar
suma.onclick = (ev) => {
  operador(ev.target.value);
}

//-- Evaluar la expresion
igual.onclick = () => {
  resultado();
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}
