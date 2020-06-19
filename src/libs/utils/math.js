const getRandomNumber = function (max) {
  return (Math.floor(Math.random() * max));
};


const getNextRoundRobin = function (total, current) {
  return (current === total - 1 ? 0 : current + 1);
};
export { getRandomNumber, getNextRoundRobin };
