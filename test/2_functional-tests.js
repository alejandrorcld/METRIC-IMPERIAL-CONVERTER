const chai = require('chai');
const chaiHttp = require('chai-http');   // importar el plugin
const server = require('../server');     // tu app exportada en server.js

chai.use(chaiHttp);                      // activar el plugin

const assert = chai.assert;

describe('Functional Tests', function() {

  it('Convierte una entrada válida: 10L', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '10L'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  it('Convierte una unidad inválida: 32g', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '32g'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid unit');
        done();
      });
  });

  it('Convierte un número inválido: 3/7.2/4kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kg'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number');
        done();
      });
  });

  it('Convierte número y unidad inválidos: 3/7.2/4kilomegagram', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/7.2/4kilomegagram'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number and unit');
        done();
      });
  });

  it('Convierte sin número: kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: 'kg'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        done();
      });
  });

});
