angular
  .module('ghr.varios.technologias', [])
  .component('ghrTecnologias', {
    templateUrl: '../bower_components/component-varios/tecnologia.template.html',
    controller: controlTecto
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
