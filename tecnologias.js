angular
  .module('ghr.varios', [])
  .component('ghrTecnologias', {
    templateUrl: '../bower_components/component-varios/tecnologias.html',
    controller: controlTecto
  })
  .factory('tecnologiasFactory', function crearTecnologias() {
      // nombres y descripciones para crear las tecnologias con datos aleatorios
      var nombres = ['java', 'javaScript', 'CSS', 'HTML',
      'Angular', 'XML','C++','PHP','Pascal','Ajax','Assembly',
      'Scheme','Arduino','Python','Forth','Swift','Cuda','Delphi',
      '.NET','Cobol','Visual Basic','WebDNA','Groovy','Smalltalk',
      'Active Server Page','Scratch','Objective-C','TCL'];
      var descripciones = ['descripcion1', 'descripcion2', 'descripcion3',
      'descripcion4', 'descripcion5', 'descripcion6', 'descripcion7', 'descripcion8', 'descripcion9'];
      var arrayTecnologias = [];
      for (var i = 1; i < 200; i++) {
        arrayTecnologias.push(crearTecnologia(i)); // enviamos la i como id de la tecnologia creada, llena el arrayTecnologias.
      }

      return arrayTecnologias;


    // creacion de un objeto tecnologia
    function crearTecnologia(i) {
      tecnologia = {
        id: i,
        nombre: obtenerValor(nombres),
        descripcion: obtenerValor(descripciones)
      };
      return tecnologia;
    }


    // numero aleatorio para seleccionar un nombre y una descripcion de sus arrays.

    function aleatorio(rango) {
      return Math.floor(Math.random() * rango);
    }

    function obtenerValor(array) {
      return array[aleatorio(array.length)];
    }

  })
  .component('ghrTecnologiasList', {
    templateUrl: '../bower_components/component-varios/tecnologia.html',
    controller: generarTecnologias
  })
  .component('eliminarTecnologiaModal', {
      templateUrl: '../bower_components/component-varios/eliminadoTecnologiaModal.html',
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      },
      controller: function () {
        var vm = this;
        vm.$onInit = function () {
          vm.selected = vm.resolve.seleccionado;
        };

        vm.ok = function (seleccionado) {
         vm.close({
          $value: seleccionado
         });
      };

      vm.cancel = function () {
        vm.dismiss({
          $value : 'cancel'
        });
      };
    }
  });

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


function generarTecnologias(tecnologiasFactory,$uibModal, $log, $document) {
  const vm = this;
  vm.arrayTecnologias = tecnologiasFactory;
  vm.totalItems = vm.arrayTecnologias.length;
  vm.currentPage = 1;

  vm.setPage = function (pageNo) {
    vm.currentPage = pageNo ;
  };

  vm.maxSize = 10;  //Elementos mostrados por página
  vm.animationsEnabled = true;
  vm.open = function (id, nombre) {
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      component: 'eliminarTecnologiaModal',
      resolve: {
        seleccionado: function () {
          return id,nombre;
        }

      }
    });

    modalInstance.result.then(function (selectedItem) {
      vm.selected = selectedItem;
      var eliminado;
      for(var i = 0;i< vm.arrayTecnologias.length;i++){
        if(vm.arrayTecnologias[i].id === selectedItem)
        eliminado = vm.arrayTecnologias[i];
      }
      vm.arrayTecnologias.splice(vm.arrayTecnologias.indexOf(eliminado),1);
    });
  }

}
