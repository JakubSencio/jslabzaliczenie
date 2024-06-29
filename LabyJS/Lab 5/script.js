// adding nmbr
const asyncAdd = async (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return Promise.reject('Argumenty muszą mieć typ number!');
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 100);
  });
};
  
// timer
const measureTime = async (fn, ...args) => {
  const start = Date.now();
  const result = await fn(...args);
  const end = Date.now();
  console.log(`Czas wykonania: ${end - start}ms`);
  return result;
};
  
// adding async
const asyncSum = async (numbers) => {
  if (numbers.length === 0) {
    return 0;
  }
  if (numbers.length === 1) {
    return numbers[0];
  }

  
const [first, second, ...rest] = numbers;
const partialSum = await asyncAdd(first, second);
  return asyncSum([partialSum, ...rest]);
};
  
const addNumbersAsync = async (...args) => {
  return measureTime(asyncSum, args);
};
  
addNumbersAsync(1, 2, 3, 4, 5)
  .then(result => console.log(`Wynik: ${result}`))
addNumbersAsync(5, 7, 9, 13, 21)
  .then(result => console.log(`Wynik: ${result}`))