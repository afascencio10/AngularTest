'use strict';
module.exports = function(app) {
  var modelNames = Object.keys(app.models);
  var models = [];
  modelNames.forEach(function(m) {
    var modelName = app.models[m].modelName;
    if (models.indexOf(modelName) === -1) {
      models.push(modelName);
    }
  });
  console.log('Models:', models);

  var fs = require('fs');
  var parse = require('csv-parse');
  var _ = require("underscore");
  var app = require('../../server/server');

  var contactosContratistas = '././client/files/contactosContratistas.csv';
  var vehiculosContratistas = '././client/files/vehiculosContratistas.csv';
  var trabajadoresContratis = '././client/files/trabajadores.csv';

  var events = [];
  var contactos = [];
  var vehiculos = [];
  var trabajadores = [];
  var contratistas = [];
  var servVehiculos = [];
  var funcionesTrab = [];
  var contratistasModel = app.models.contratista;
  var contactosModel = app.models.contacto;
  var contactoContraModel = app.models.contacto_contratista;
  var funcionesModel = app.models.funcion;
  var funcionesTrabajadorModel = app.models.funcion_trabajador;
  var contratistaTrabajadorModel = app.models.contratista_trabajador;
  var serviciosVehiculoModel = app.models.servicios_vehiculos;
  var servicioVehiculoModel = app.models.servicio_vehiculo;
  var vehiculoModel = app.models.vehiculo;
  var vehiculoContratistaModel = app.models.vehiculo_contratista;
  var trabajadorModel = app.models.trabajador;

  // loadData();

  function loadData() {
    contratistasModel.find(function (err, contrats) {
      contratistas = contrats;
      //cargarContactos();
      serviciosVehiculoModel.find(function (err, serv) {
        servVehiculos = serv;
        //cargarVehiculos();
      });
      funcionesModel.find(function (err, funciones) {
        funcionesTrab = funciones;
        // cargarTrabajadores();
      });
    });
  }

  function cargarContactos() {
    fs.createReadStream(contactosContratistas)
      .pipe(parse({delimiter: ','}))
      .on('data', function(csvrow) {
        var contacto = {rut: '', tipo_localizacion: '',localizacion: '', cargo: '', nombre: '', apellido: '', movil: '', telefono: '', correo: '', activo: true};
        contacto.rut = csvrow[0];
        contacto.tipo_localizacion = csvrow[2];
        contacto.localizacion = csvrow[3];
        contacto.cargo = csvrow[4];
        contacto.nombre = csvrow[5];
        contacto.apellido = csvrow[6];
        contacto.movil = csvrow[7];
        contacto.telefono = csvrow[8];
        contacto.correo = csvrow[9];
        contactos.push(contacto);
      })
      .on('end', function() {
        crearContactos(contactos);
      });
  };

  function crearContactos(contactos) {
    contactosModel.create(contactos, function (err, model) {
      if(!err){
        var contsCont = [];
        _.each(model, function (contacto, index) {
          var contacto_cont = {id_contratista: 0, id_contacto: 0};
          var contratista = _.filter(contratistas, function (cont) {
            return cont.rut == contactos[index].rut;
          });
          contacto_cont.id_contratista = contratista[0].id;
          contacto_cont.id_contacto = contacto.id;
          contsCont.push(contacto_cont);
        });
        contactoContraModel.create(contsCont);
      }
    });
  }

  function cargarTrabajadores(){
    fs.createReadStream(trabajadoresContratis)
      .pipe(parse({delimiter: ','}))
      .on('data', function(csvrow) {
        var trabajador = {rut: '', nombre: '', apellido: '', rut_contratista: '', funciones: []};
        trabajador.rut = csvrow[2];
        trabajador.nombre = csvrow[3];
        trabajador.apellido = csvrow[4];
        trabajador.rut_contratista = csvrow[0];
        if (csvrow[5] != 'sin') {
          trabajador.funciones.push(csvrow[5]);
        }
        if (csvrow[6] != 'sin') {
          trabajador.funciones.push(csvrow[6]);
        }
        if (csvrow[7] != 'sin') {
          trabajador.funciones.push(csvrow[7]);
        }
        trabajadores.push(trabajador);
      })
      .on('end', function() {
        crearTrabajadores(trabajadores);
      });
  }

  function crearTrabajadores(trabajadores) {
    trabajadorModel.create(trabajadores, function (err, model) {
      var tipos = ["Principal", "Secundaria", "Tercera"];
      _.forEach(model, function(traba, index) {
        var funcionesTrabajador = [];
        var trabajadorContratista = [];
        var trabCont = {id_trabajador: traba.id, id_contratista: 0, fecha_inicio: new Date()};
        var contratista = _.filter(contratistas, function (cont) {
          return cont.rut == trabajadores[index].rut_contratista;
        });
        if (contratista[0]) {
          trabCont.id_contratista = contratista[0].id;
          trabajadorContratista.push(trabCont);
        }
        var funciones = _.filter(funcionesTrab, function(func) {
          return _.contains(trabajadores[index].funciones, func.nombre);
        });
        _.forEach(funciones, function(func, index) {
          var funcionTrab = {id_trabajador: traba.id, id_funcion: func.id, fecha_inicio: new Date(), tipo: tipos[index]};
          funcionesTrabajador.push(funcionTrab);
        });
        funcionesTrabajadorModel.create(funcionesTrabajador, function (err, model) {
          //console.log(err, model.length);
        });
        contratistaTrabajadorModel.create(trabajadorContratista, function (err, model) {
          //console.log(err, model.length);
        });
      });
    });
  }

  function cargarVehiculos(){
    fs.createReadStream(vehiculosContratistas)
      .pipe(parse({delimiter: ','}))
      .on('data', function(csvrow) {
        var vehiculo = {rut: '', tipo: '', placa_patente: '', anio: '', activo: true};
        vehiculo.rut = csvrow[0];
        vehiculo.placa_patente = csvrow[2];
        vehiculo.anio = new Date().setYear(csvrow[3]);
        vehiculo.tipo = csvrow[4];
        vehiculos.push(vehiculo);
      })
      .on('end', function() {
        crearVehiculos(vehiculos);
      });
  }

  function crearVehiculos(vehiculos) {
    vehiculoModel.create(vehiculos, function (err, model) {
        var servsVehiculo = [];
        var vehiculoContr = [];
        _.forEach(model, function (vehiculo, index) {
          //console.log(vehiculo);
          var vehCont = {id_vehiculo: vehiculo.id, id_contratista: 0};
          var servVeh = {id_vehiculo: vehiculo.id, id_servicio_vehiculos: 0};
          var contratista = _.filter(contratistas, function (cont) {
            return cont.rut == vehiculos[index].rut;
          });
          if(contratista[0]){
            vehCont.id_contratista = contratista[0].id;
            vehiculoContr.push(vehCont);
          }
          var servicio = _.filter(servVehiculos, function (serv) {
            return serv.nombre == vehiculos[index].tipo;
          });
          if(servicio[0]){
            servVeh.id_servicio_vehiculos = servicio[0].id;
            servsVehiculo.push(servVeh);
          }else{
          }
        });
        servicioVehiculoModel.create(servsVehiculo, function (err, model) {
          console.log(err, model.length);
        });
        vehiculoContratistaModel.create(vehiculoContr, function (err, model){
          console.log(err, model.length);
        });
    });
  }
};
