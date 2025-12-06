function ConvertHandler() {
  const units = {
    gal: { returnUnit: 'L', spellOut: 'gallons', factor: 3.78541 },
    L:   { returnUnit: 'gal', spellOut: 'liters', factor: 0.26417 },
    mi:  { returnUnit: 'km', spellOut: 'miles', factor: 1.60934 },
    km:  { returnUnit: 'mi', spellOut: 'kilometers', factor: 0.62137 },
    lbs: { returnUnit: 'kg', spellOut: 'pounds', factor: 0.453592 },
    kg:  { returnUnit: 'lbs', spellOut: 'kilograms', factor: 2.20462 }
  };

  this.getNum = function(input) {
    const numRegex = /^[\d/.]+/;
    const match = input.match(numRegex);
    if (!match) return 1; // default
    const result = match[0];
    if (result.split('/').length > 2) return null; // double fraction error
    try {
      return eval(result);
    } catch {
      return null;
    }
  };

  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    if (!match) return null;
    let unit = match[0].toLowerCase();
    if (unit === 'l') unit = 'L'; // litro siempre mayúscula
    return units[unit] ? unit : null;
  };

  this.getReturnUnit = function(initUnit) {
    return units[initUnit]?.returnUnit || null;
  };

  this.spellOutUnit = function(unit) {
    return units[unit]?.spellOut || null;
  };

  this.convert = function(initNum, initUnit) {
    if (!units[initUnit]) return null;
    return initNum * units[initUnit].factor;
  };

  this.getString = function(initNum, returnNum, initUnit, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
