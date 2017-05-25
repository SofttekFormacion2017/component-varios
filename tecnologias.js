angular
  .module('ghr.varios', [])
  .component('ghrTecnologias', {
    templateUrl: '../bower_components/component-varios/tecnologias.html',
    controller: formularioTecnologiaController
  })
  .factory('tecnologiasFactory', function crearTecnologias() {
      // nombres y descripciones para crear las tecnologias con datos aleatorios
    var nombres = ['java', 'javaScript', 'CSS', 'HTML', 'Angular', 'XML', 'C++', 'PHP', 'Pascal', 'Ajax', 'Assembly',
      'Scheme', 'Arduino', 'Python', 'Forth', 'Swift', 'Cuda', 'Delphi', '.NET', 'Cobol', 'Visual Basic', 'WebDNA', 'Groovy',
      'Smalltalk', 'Active Server Page', 'Scratch', 'Objective-C', 'TCL'];
    var descripciones = ['muy usado', 'poco usado'];
    var arrayTecnologias = [];
    for (var i = 1; i < 200; i++) {
      arrayTecnologias.push(crearTecnologia(i));
        // enviamos la i como id de la tecnologia creada, llena el arrayTecnologias.
    }
    function _getReferenceById(id) {
      var tecnologia;
      for (i = 0; (i < arrayTecnologias.length) && (tecnologia == undefined); i++) {
        if (arrayTecnologias[i].id == id) {
          tecnologia = arrayTecnologias[i];
        }
      }
      return tecnologia;
    }
    return {
        // sistema CRUD de tecnologias
      getAll: function getAll() {
        return angular.copy(arrayTecnologias);
      },
      create: function create(tecnologia) {
        console.log(tecnologia);
        tecnologia.id = arrayTecnologias.length + 1;
        arrayTecnologias.push(angular.copy(tecnologia));
      },
        /**
         * [read description]
         * @method read
         * @param  {number} id id tecnologia
         * @return {tecno}    [description]
         */
      read: function read(id) {
        return angular.copy(_getReferenceById(id));
      },
      update: function update(tecnologia) {
        if (!tecnologia.id) {
          console.log(tecnologia);
          throw 'el objeto carece de id y no se actualiza' + JSON.stringify(tecnologia);
        }
        oldTecno = _getReferenceById(tecnologia.id);
        if (oldTecno) {
          var indice = arrayTecnologias.indexOf(oldTecno);
          var newTecno = arrayTecnologias[indice] = angular.copy(tecnologia);
          return angular.copy(newTecno);
        }
        throw 'el objeto carece de id y no se actualiza ' + JSON.stringify(tecnologia);
      },
      delete: function _delete(tecnologia) {
        if (!tecnologia.id) {
          throw 'el objeto carece de id y no se borra' + JSON.stringify(tecnologia);
        }
        oldTecno = _getReferenceById(tecnologia.id);
        if (oldTecno) {
          var indice = arrayTecnologias.indexOf(oldTecno);
          if (indice > -1) {
            arrayTecnologias.splice(indice, 1);
          } else {
            throw 'el objeto carece de id y no se borra' + JSON.stringify(tecnologia);
          }
        }
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
          $value: 'cancel'
        });
      };
    }
  });
function formularioTecnologiaController($stateParams, tecnologiasFactory, $state) {
  const vm = this;
  console.log($stateParams); // Imprime por pantalla $stateParams
  console.log(tecnologiasFactory.getAll()); // Imprime por pantalla la factoria de tecnologia en un objeto
  console.log(tecnologiasFactory.read($stateParams.id)); // Imprime por pantalla los valores de la tabla tecnologia
  vm.tecnologia = tecnologiasFactory.read($stateParams.id);
  vm.update = function (user) {
  //   var x = (tecnologiasFactory.getAll().length)+1;
  //   console.log('ultimo objeto:' + tecnologia.id+'=' + = (tecnologiasFactory.getAll().length)+1;);
  //   console.log('longitudad del array:'+ tecnologiasFactory.getAll().length);
    console.log('tecnologia id que le paso:' + $stateParams.id);
    if ($stateParams.id == 0) {
    //   tecnologia.id = tecnologiasFactory.getAll().length+1;
      tecnologiasFactory.create(vm.tecnologia);
      $state.go($state.current, {id: vm.tecnologia.id});
    } else {
      console.log('hola');
      tecnologiasFactory.update(vm.tecnologia);
    }
  };

  vm.reset = function (form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    vm.tecnologia = angular.copy(vm.original);
  };
}
function generarTecnologias(tecnologiasFactory, $uibModal, $log, $document) {
  const vm = this;
  vm.arrayTecnologias = tecnologiasFactory.getAll();
  vm.totalItems = vm.arrayTecnologias.length;
  vm.currentPage = 1;
  vm.setPage = function (pageNo) {
    vm.currentPage = pageNo;
  };
  vm.maxSize = 10;  // Elementos mostrados por página
  vm.animationsEnabled = true;
  vm.open = function (id, nombre) {
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      component: 'eliminarTecnologiaModal',
      resolve: {
        seleccionado: function () {
          return id;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      tecnologiasFactory.delete(tecnologiasFactory.read(selectedItem));
      vm.arrayTecnologias = tecnologiasFactory.getAll();
    });
  };
}
