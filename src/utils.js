'use strict';

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (min + max + 1)) + min;
};

module.exports.shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [arr[i], arr[randomPosition]] = [arr[randomPosition], arr[i]];
  }

  return arr;
};

module.exports.ensureArray = (value) => Array.isArray(value) ? value : [value];
