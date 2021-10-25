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

module.exports.formatDate = (date) => {
  const dateReversed = date.split(`-`).reverse().join(`.`);
  const now = new Date();

  return `${dateReversed}, ${now.getHours()}:${now.getMinutes()}`;
};


module.exports.formatDateToISO = (date) => {
  const d = new Date();
  const now = new Date(
      `${date}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  );

  return now.toISOString();
};
