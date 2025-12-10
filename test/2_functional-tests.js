// tests/2_functional-tests.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

describe('Functional Tests', () => {
  it('Convert a valid input such as 10L: GET /api/convert', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.strictEqual(res.body.initNum, 10);
        assert.strictEqual(res.body.initUnit, 'L');
        assert.strictEqual(res.body.returnUnit, 'gal');
        assert.approximately(res.body.returnNum, 2.64172, 0.00001);
        assert.match(res.body.string, /10 liters converts to 2\.64172 gallons/);
        done();
      });
  });

  it('Convert an invalid unit such as 32g: GET /api/convert', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, 'invalid unit');
        done();
      });
  });

  it('Convert an invalid number such as 3/7.2/4kg: GET /api/convert', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, 'invalid number');
        done();
      });
  });

  it('Convert invalid number AND unit such as 3/7.2/4kilomegagram: GET /api/convert', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, 'invalid number and unit');
        done();
      });
  });

  it('Convert with no number such as kg: GET /api/convert', (done) => {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isObject(res.body);
        assert.strictEqual(res.body.initNum, 1);
        assert.strictEqual(res.body.initUnit, 'kg');
        assert.strictEqual(res.body.returnUnit, 'lbs');
        assert.approximately(res.body.returnNum, 2.20462, 0.00001);
        assert.match(res.body.string, /1 kilograms converts to 2\.20462 pounds/);
        done();
      });
  });
});
