const shuffle = require('./shuffle');

module.exports = (participants) => {
  const result = [];
  const shuffled = shuffle(participants);
  const total = shuffled.length;

  for (let i = 0; i < total - 1; i++) {
    result.push({
      giver: shuffled[i], // o cara que voi sorteado na posição atual
      receiver: shuffled[i + 1] // array embaralhado na posição seguinte
    });
  };

  result.push({
    giver: shuffled[total - 1], // pegar ultima posição do array(começa no 0)
    receiver: shuffled[0],
  });

  return result;
};