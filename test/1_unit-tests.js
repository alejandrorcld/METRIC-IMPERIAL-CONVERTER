const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

describe('Unit Tests', function() {

  it('Debe leer correctamente un número entero', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  it('Debe leer correctamente un número decimal', function() {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  it('Debe leer correctamente una fracción', function() {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  it('Debe leer correctamente una fracción con decimal', function() {
    assert.equal(convertHandler.getNum('2.5/5kg'), 0.5);
  });

  it('Debe devolver error en fracción doble', function() {
    assert.isNull(convertHandler.getNum('3/2/3kg'));
  });

  it('Debe devolver 1 si no hay número', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  it('Debe leer correctamente cada unidad válida', function() {
    const input = ['gal','L','mi','km','lbs','kg','GAL','l','MI','KM','LBS','KG'];
    input.forEach(function(ele) {
      assert.isNotNull(convertHandler.getUnit(ele));
    });
  });

  it('Debe devolver error en unidad inválida', function() {
    assert.isNull(convertHandler.getUnit('32g'));
  });

  it('Debe devolver la unidad de retorno correcta', function() {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expect = ['L','gal','km','mi','kg','lbs'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
    });
  });

  it('Debe devolver la unidad escrita correctamente', function() {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
  });

  it('Debe convertir gal a L', function() {
    assert.approximately(convertHandler.convert(1,'gal'), 3.78541, 0.1);
  });

  it('Debe convertir L a gal', function() {
    assert.approximately(convertHandler.convert(1,'L'), 0.26417, 0.1);
  });

  it('Debe convertir mi a km', function() {
    assert.approximately(convertHandler.convert(1,'mi'), 1.60934, 0.1);
  });

  it('Debe convertir km a mi', function() {
    assert.approximately(convertHandler.convert(1,'km'), 0.62137, 0.1);
  });

  it('Debe convertir lbs a kg', function() {
    assert.approximately(convertHandler.convert(1,'lbs'), 0.453592, 0.1);
  });

  it('Debe convertir kg a lbs', function() {
    assert.approximately(convertHandler.convert(1,'kg'), 2.20462, 0.1);
  });

});
