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
    const numMatch = input.match(/^[\d.\/]+/);
    if (!numMatch) return 1;
    const part = numMatch[0];
    const slashCount = (part.match(/\//g) || []).length;
    if (slashCount > 1) return null;

    if (slashCount === 1) {
      const [a, b] = part.split('/');
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      if (isNaN(numA) || isNaN(numB)) return null;
      return numA / numB;
    }

    const value = parseFloat(part);
    return isNaN(value) ? null : value;
  };

  this.getUnit = function(input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return null;
    let unit = unitMatch[0].toLowerCase();
    if (unit === 'l') unit = 'L';
    return ['gal', 'L', 'mi', 'km', 'lbs', 'kg'].includes(unit) ? unit : null;
  };

  this.getReturnUnit = function(initUnit) {
    return units[initUnit]?.returnUnit || null;
  };

  this.spellOutUnit = function(unit) {
    return units[unit]?.spellOut || null;
  };

  this.convert = function(initNum, initUnit) {
    const u = units[initUnit];
    if (!u) return null;
    return initNum * u.factor;
  };

  this.getString = function(initNum, returnNum, initUnit, returnUnit) {
    const initFull = this.spellOutUnit(initUnit);
    const returnFull = this.spellOutUnit(returnUnit);
    return `${initNum} ${initFull} converts to ${returnNum.toFixed(5)} ${returnFull}`;
  };
}

module.exports = ConvertHandler;
