/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function () {
    contexto.reconstruirLista();
  });
  this.modelo.preguntasBorradas.suscribir(function () {
    contexto.reconstruirLista();
  });
  this.modelo.cambioEnPregunta.suscribir(function () {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {

    this.reconstruirLista();
    this.configuracionDeBotones();
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    // this.modelo.obtenerLocalStorage();

  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem= $('<li></li>').addClass("list-group-item").text(pregunta.textoPregunta).attr("id",pregunta.id);
    //completar


    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');

    
    
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar
        var respuesta = $(this).val();

        if (respuesta.length > 0) {
          respuestas.push({
            'textoRespuesta': respuesta,
            'cantidad': 0
          });
        }
      })
      // contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(() => {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });
    e.borrarTodo.click(() => {
      contexto.controlador.borrarTodo();
    });
    e.botonEditarPregunta.click(() => {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.editarPregunta(id);
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};

