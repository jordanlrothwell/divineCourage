const arrayByFrequency = function (object) {
  const masterArray = [];

  const arrayForKey = function (object, i) {
    return Array(object[Object.keys(object)[i]]).fill(Object.keys(object)[i]);
  };

  for (let i = 0; i < Object.keys(object).length; i++) {
    const itemFrequencyArray = arrayForKey(object, i);
    for (const element of itemFrequencyArray) {
      masterArray.push(element);
    }
  }

  return masterArray;
};

module.exports = arrayByFrequency;
