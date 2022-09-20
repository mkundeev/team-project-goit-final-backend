function getArrayOfRandomNumbers(number, totalNumber) {
  const set = new Set();
  let arr = [];
  while (arr.length < number) {
    set.add(Math.ceil(Math.random() * totalNumber));
    arr = [...set];
  }
  return arr;
}

module.exports = {
  getArrayOfRandomNumbers,
};
