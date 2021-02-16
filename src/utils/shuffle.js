module.exports = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // Emquanto existir elementos para embaralhar...
  while (currentIndex !== 0) {

    // Pegue um elemento aleatoriamente
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // E troque a posição com o elemento atual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };

  return array;
};