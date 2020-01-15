const fs = require("fs").promises;

const c_to_f = num => {
  //(0°C × 9/5) + 32 = 32°F
  let d = (num * 9) / 5 + 32;
  return d;
};

const f_to_c = num => {
  // (32°F − 32) × 5/9 = 0°C
  let d = ((num - 32) * 5) / 9;
  return d;
};

const degree_convertion = str => {
  let d = 0;
  str.includes("c")
    ? (d = c_to_f(str.slice(0, -1)))
    : (d = f_to_c(str.slice(0, -1)));
  return Math.round(d);
};

module.exports = degree_convertion;