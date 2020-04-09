/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.cambioEnPregunta = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.respuestaVotada= new Evento(this);
  this.obtenerLocalStorage();

};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    ultimoId = 0;
        for (var i = 0; i < this.preguntas.length; i++) {
            if (this.preguntas[i].id > ultimoId) {
                ultimoId = this.preguntas[i].id;
            }
        }
        return ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    // debugger;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function (id) {
    this.preguntas = this.preguntas.filter((pregunta) => {
        return pregunta.id != id;
    });
    this.guardar();
    this.preguntaEliminada.notificar();
  },
  sumarVoto: function (nombrePregunta, respuestaSeleccionada) {
    this.preguntas.forEach(element=>{
      if(element.textoPregunta===nombrePregunta){
        element.cantidadPorRespuesta.forEach(ele =>{
          if(ele.textoRespuesta===respuestaSeleccionada){
            ele.cantidad++;
          }
        })
      }

    });
    this.guardar();
    // console.log(this.sumarVoto());
    this.votoAgregado.notificar();
  },


  editarPregunta: function (id) {
  if(id){
    let edicion = prompt('Editar pregunta');
  
    if(edicion){    
      let pregunta = this.preguntas.find((pregunta) => {
        return pregunta.id === id;
      });
    pregunta.textoPregunta = edicion;
    this.guardar();
    this.cambioEnPregunta.notificar();
  }
  } else {
    alert("Debe seleccionar una pregunta.")
  }

  },
  borrarTodo: function () {
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    var arrayPreguntas=JSON.stringify(this.preguntas);
    localStorage.setItem("preguntas",arrayPreguntas);
  },
  obtenerLocalStorage: function(){
    var arrayGuardado=localStorage.getItem("preguntas");
    var arrayGuardadoObjeto=JSON.parse(arrayGuardado);
    this.preguntas=arrayGuardadoObjeto;
    this.cambioEnPregunta.notificar();
  },
};
