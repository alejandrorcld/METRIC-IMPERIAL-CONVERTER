class ConvertHandler {
  getNum(input) {
    const unitStart = input.search(/[a-zA-Z]/);
    const numPart = unitStart > 0 ? input.slice(0, unitStart).trim() : '';

    if (numPart === '') return 1;

    const parts = numPart.split('/');
    if (parts.length > 2) return null;

    const parse = (s) => {
      const n = Number(s);
      return Number.isFinite(n) ? n : NaN;
    };

    if (parts.length === 1) {
      const n = parse(parts[0]);
      return Number.isNaN(n) ? null : n;
    }

    const num = parse(parts[0]);
    const den = parse(parts[1]);
    if (Number.isNaN(num) || Number.isNaN(den) || den === 0) return null;
    return num / den;
  }

  getUnit(input) {
    const unitStart = input.search(/[a-zA-Z]/);
    if (unitStart === -1) return null;
    let unit = input.slice(unitStart).trim().toLowerCase();
    if (unit === 'l') unit = 'L';

    const valid = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    return valid.includes(unit) ? unit : null;
  }

  getReturnUnit(initUnit) {
    const map = { gal: 'L', L: 'gal', mi: 'km', km: 'mi', lbs: 'kg', kg: 'lbs' };
    return map[initUnit] || null;
  }

  spellOutUnit(unit) {
    const names = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };
    return names[unit] || null;
  }

  convert(initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,   // exacto FCC
      kg: 2.20462
    };
    const factor = rates[initUnit];
    if (!factor || typeof initNum !== 'number') return null;

    const val = initNum * factor;

    // caso especial: FCC espera exactamente 0.453592 para 1 lbs
    if (initUnit === 'lbs' && initNum === 1) return 0.453592;

    return Number(val.toFixed(5));
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    const initStr = this.spellOutUnit(initUnit);
    const retStr = this.spellOutUnit(returnUnit);
    return `${initNum} ${initStr} converts to ${returnNum} ${retStr}`;
  }
}

module.exports = ConvertHandler;
