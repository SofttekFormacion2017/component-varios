angular
  .module('ghr.varios', [])
  .component('ghrTecnologias', {
    templateUrl: '../bower_components/component-varios/tecnologias.html',
    controller: formularioTecnologiaController
  })
  .factory('tecnologiasFactory', function crearTecnologias() {
      // nombres y descripciones para crear las tecnologias con datos aleatorios
      var nombres = ['java', 'javaScript', 'CSS', 'HTML','Angular', 'XML','C++','PHP','Pascal','Ajax','Assembly',
      'Scheme','Arduino','Python','Forth','Swift','Cuda','Delphi','.NET','Cobol','Visual Basic','WebDNA','Groovy',
      'Smalltalk','Active Server Page','Scratch','Objective-C','TCL'];
      var descripciones = ['muy usado','poco usado'];
      var arrayTecnologias = [];
      for (var i = 1; i < 200; i++) {
        arrayTecnologias.push(crearTecnologia(i));
        // enviamos la i como id de la tecnologia creada, llena el arrayTecnologias.
      }

      return {
        getAll: function getAll(){
          return angular.copy(arrayTecnologias);
        },
        getById: function getById(id){
          var tecno;
          id = parseInt(id);
          for (i=0; (i<arrayTecnologias.length) && (tecno===undefined); i++){
            if (arrayTecnologias[i].id === id){
              tecno=arrayTecnologias[i];
            }
          }
          return tecno;
        }
      };

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


function formularioTecnologiaController($stateParams,tecnologiasFactory) {
  const vm = this;
  //console.log($stateParams); Imprime por pantalla $stateParams
  //console.log(tecnologiasFactory.getAll()); Imprime por pantalla la factoria de tecnologia en un objeto
  //console.log(tecnologiasFactory.getById($stateParams.id)); Imprime por pantalla los valores de la tabla tecnologia
  vm.tecnologia = tecnologiasFactory.getById($stateParams.id);

  // tecnologiasFactory.reduce(function(acc,v,i){
  // }, {})

  vm.update = function (user) {
    vm.original = vm.tecnologia
    // console.log(angular.copy(user));
  };
  vm.reset = function (form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    vm.tecnologia = angular.copy(vm.original);
  };
  //vm.reset();
}


function generarTecnologias(tecnologiasFactory,$uibModal, $log, $document) {
  const vm = this;
  vm.arrayTecnologias = tecnologiasFactory.getAll();
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
