angular
.module('ghr.varios', [])
.component('ghrContactos', {
  templateUrl: '../bower_components/component-varios/varios.html',
  controller() {
    const vm = this;
    vm.master = {};

    vm.update = function (contacto) {
      vm.master = angular.copy(contacto);
      console.log(contacto.idCandidato + '\n' + contacto.valor + '\n' + contacto.tipo + '\nENVIADO');
    };
    vm.reset = function (form) {
      console.log('antes del if');
      if (form) {
        console.log('despues del if');
        form.$setPristine();
        form.$setUntouched();
      }

      vm.contacto = angular.copy(vm.master);
    };
    vm.reset();
  }
});
