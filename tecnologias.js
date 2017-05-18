angular
  .module('ghr.varios', [])
  .component('ghrTecnologias', {
    templateUrl: '../bower_components/component-varios/tecnologias.html',
    controller: controlTecto
  })
  .component('tecnologiasList', {
    templateUrl: '../bower_components/component-varios/tecnologia.html',
    controller: generarTecnologias
  })
  ;

function controlTecto() {
  const vm = this;
  vm.master = {};
  vm.update = function (user) {
    vm.master = angular.copy(user);
  };
  vm.reset = function (form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    vm.user = angular.copy(vm.master);
  };
  vm.reset();
}

function generarTecnologias() {
  const vm = this;
  vm.arrayTecnologias = crearTecnologias();
  console.log(vm.arrayTecnologias);
  vm.totalItems = vm.arrayTecnologias.length;
  vm.currentPage = 1;

  vm.setPage = function (pageNo) {
    vm.currentPage = pageNo;
  };

  vm.maxSize = 5;
  //INTENTO DE BOTON
  // vm.items = [
  //   'opcion 1',
  //   'opcion 2',
  //   'opcion 3'
  // ],
  // vm.status ={
  //   isopen = false;
  // },
  // vm.toggleDropdown = function($event) {
  //   vm.preventDefault();
  //   vm.stopPropagation();
  //   vm.status.isopen = !$vm.status.isopen;
  // }
  //FIN DE BOTÓN
}

var nombres = ['java', 'javaScript', 'CSS', 'HTML',
 'Angular', 'XML','C++','PHP','Pascal','Ajax','Assembly',
 'Scheme','Arduino','Python','Forth','Swift','Cuda','Delphi',
'.NET','Cobol','Visual Basic','WebDNA','Groovy','Smalltalk',
'Active Server Page','Scratch','Objective-C','TCL'];
var descripciones = ['descripcion1', 'descripcion2', 'descripcion3',
  'descripcion4', 'descripcion5', 'descripcion6', 'descripcion7', 'descripcion8', 'descripcion9'];

function crearTecnologias() {
  var arrayTecnologias = [];
  for (var i = 0; i < 200; i++) {
    arrayTecnologias.push(crearTecnologia(i));
  }
  return arrayTecnologias;
}

function crearTecnologia(i) {
  tecnologia = {
    id: i-5,
    nombre: obtenerValor(nombres),
    descripcion: obtenerValor(descripciones)
  };
  return tecnologia;
}

function aleatorio(rango) {
  return Math.floor(Math.random() * rango);
}

function obtenerValor(array) {
  return array[aleatorio(array.length)];
}
