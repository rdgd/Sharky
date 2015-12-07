class Util {
  static extendObj (out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i]) {
        continue;
      }

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          out[key] = arguments[i][key];
        }
      }
    }

    return out;
  }
}

export default Util;

// Attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // If the other array is a falsy value, return
  if (!array) { return false; }

  // Compare lengths - can save a lot of time
  if (this.length != array.length) { return false; }
  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // Recurse into the nested arrays
      if (!this[i].equals(array[i])) { return false; }
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', { enumerable: false });
