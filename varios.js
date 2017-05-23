angular
.module('ghr.idioma', ['ui.bootstrap'])
.component('ghrIdiomas', {
  templateUrl: '../bower_components/component-varios/lista.idioma.html',
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
})
.component('componenteLista',{
  templateUrl: '../bower_components/component-varios/lista.idioma.html',
  controller: generadorIdiomas
});

function generadorIdiomas(){
    const idioma = this;
    idioma.arrayIdiomas=
    [
      {
        idCandidato: 1,
        idioma: 'ingles',
        nivel: 'B3',
        descripcion: 'Intermedio superior'
      },
      {
        idCandidato: 2,
        idioma: 'frances',
        nivel: 'B2',
        descripcion: 'Intermedio superior'
      },
      {
        idCandidato: 3,
        idioma: 'chino',
        nivel: 'A1',
        descripcion: 'Básico'
      },
      {
        idCandidato: 4,
        idioma: 'ingles',
        nivel: 'A2',
        descripcion: 'Elemental'
      },
      {
        idCandidato: 5,
        idioma: 'aleman',
        nivel: 'A1',
        descripcion: 'Básico'
      },
      {
        idCandidato: 6,
        idioma: 'frances',
        nivel: 'C1',
        descripcion: 'Avanzado'
      },
      {
        idCandidato: 7,
        idioma: 'chino',
        nivel: 'C1',
        descripcion: 'Avanzado'
      },
      {
        idCandidato: 8,
        idioma: 'ingles',
        nivel: 'C2',
        descripcion: 'Superior'
      },
      {
        idCandidato: 9,
        idioma: 'aleman',
        nivel: 'A1',
        descripcion: 'Básico'
      },
      {
        idCandidato: 10,
        idioma: 'frances',
        nivel: 'B2',
        descripcion: 'Intermedio superior'
      },
      {
        idCandidato: 11,
        idioma: 'ingles',
        nivel: 'C2',
        descripcion: 'Superior'
      },
      {
        idCandidato: 12,
        idioma: 'frances',
        nivel: 'C1',
        descripcion: 'Avanzado'
      },
      {
        idCandidato: 13,
        idioma: 'aleman',
        nivel: 'A2',
        descripcion: 'Elemental'
      },
      {
        idCandidato: 14,
        idioma: 'frances',
        nivel: 'A2',
        descripcion: 'Elemental'
      },
      {
        idCandidato: 15,
        idioma: 'chino',
        nivel: 'B1',
        descripcion: 'Pre-intermedio'
      },
    ];
};
