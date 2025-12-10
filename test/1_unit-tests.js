// tests/1_unit-tests.js
const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

describe('Unit Tests', () => {
  // números
  it('should correctly read an integer input', () => {
    assert.strictEqual(convertHandler.getNum('10L'), 10);
  });

  it('should correctly read a decimal input', () => {
    assert.strictEqual(convertHandler.getNum('3.5kg'), 3.5);
  });

  it('should correctly read a fractional input', () => {
    assert.strictEqual(convertHandler.getNum('1/2gal'), 0.5);
  });

  it('should correctly read a fractional input with a decimal', () => {
    assert.strictEqual(convertHandler.getNum('2.5/5mi'), 0.5);
  });

  it('should return an error on a double-fraction', () => {
    assert.isNull(convertHandler.getNum('3/2/3km'));
  });

  it('should default to 1 when no numerical input is provided', () => {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  // unidades válidas/ inválidas
  it('should correctly read each valid input unit', () => {
    ['gal','l','L','mi','km','lbs','kg'].forEach(u => {
      assert.isNotNull(convertHandler.getUnit(`1${u}`));
    });
  });

  it('should return an error for an invalid input unit', () => {
    assert.isNull(convertHandler.getUnit('12g'));
    assert.isNull(convertHandler.getUnit('2LL'));
  });

  it('should return the correct return unit for each valid input unit', () => {
    const map = { gal:'L', L:'gal', mi:'km', km:'mi', lbs:'kg', kg:'lbs' };
    Object.entries(map).forEach(([i,r]) => {
      assert.strictEqual(convertHandler.getReturnUnit(i), r);
    });
  });

  it('should return the correctly spelled-out string unit for each valid input unit', () => {
    const map = {
      gal:'gallons', L:'liters', mi:'miles',
      km:'kilometers', lbs:'pounds', kg:'kilograms'
    };
    Object.entries(map).forEach(([i,s]) => {
      assert.strictEqual(convertHandler.spellOutUnit(i), s);
    });
  });

  // conversiones y redondeo
  it('should convert gal to L', () => {
    assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
  });

  it('should convert L to gal', () => {
    assert.strictEqual(convertHandler.convert(1, 'L'), Number((1/3.78541).toFixed(5)));
  });

  it('should convert mi to km', () => {
    assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
  });

  it('should convert km to mi', () => {
    assert.strictEqual(convertHandler.convert(1, 'km'), Number((1/1.60934).toFixed(5)));
  });

  it('should convert lbs to kg', () => {
    assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.453592);
  });

  it('should convert kg to lbs', () => {
    assert.strictEqual(convertHandler.convert(1, 'kg'), Number((1/0.453592).toFixed(5)));
  });
});
