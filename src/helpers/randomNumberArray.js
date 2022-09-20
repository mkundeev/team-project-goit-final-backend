function randomNumberArray(number, totalNumber) {
  const set = new Set();
  let arr = [];
  while (arr.length < number) {
    set.add(Math.floor(Math.random() * totalNumber));
    arr = [...set];
  }
  return arr;
}

module.exports = {
  randomNumberArray,
};
