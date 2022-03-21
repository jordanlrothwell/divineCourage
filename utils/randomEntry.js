const randomEntry = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

module.exports = randomEntry;
