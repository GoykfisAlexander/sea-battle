let pc = false;

export const pcFlot: {
  [key in string]: number[][];
} = { 1: [], 2: [], 3: [], 4: [] };
export const playerFlot: {
  [key in string]: number[][];
} = { 1: [], 2: [], 3: [], 4: [] };
export const randomField = () => {
  const field = Array(100).fill(0);

  const reserved: {
    [key in string]: boolean;
  } = {};
  const deck = (amount: number) => {
    const reserv: number[] = [];
    const idDeck = Math.floor(Math.random() * 100);
    const coordinateDeck = Math.random() < 0.5 ? true : false;
    const more = Math.random() < 0.5 ? true : false;
    let step = 1;
    for (let i = 0; i < amount; i++) {
      let z = true;
      if (coordinateDeck) {
        const x = idDeck + (more ? i : -i);
        if (Math.floor(x / 10) < Math.floor(idDeck / 10)) {
          reserv.push(idDeck + step);
          step++;
          z = false;
        }
        if (Math.floor(x / 10) > Math.floor(idDeck / 10)) {
          reserv.push(idDeck - step);
          step++;
          z = false;
        }
        if (z) {
          reserv.push(x);
        }
      } else {
        const y = idDeck + (more ? i * 10 : -i * 10);
        if (y < 0) {
          reserv.push(idDeck + step * 10);
          step++;
          z = false;
        }
        if (y > 99) {
          reserv.push(idDeck - step * 10);
          step++;
          z = false;
        }
        if (z) {
          reserv.push(y);
        }
      }
    }
    return reserv;
  };
  const reservedPush = (e: number) => {
    reserved[e] = true;
    reserved[e % 10 === 0 ? NaN : e - 1] = true;
    reserved[e % 10 === 9 ? NaN : e + 1] = true;
    reserved[e + 10] = true;
    reserved[e - 10] = true;
    reserved[e % 10 === 0 ? NaN : e - 11] = true;
    reserved[e % 10 === 9 ? NaN : e + 11] = true;
    reserved[e % 10 === 0 ? NaN : e + 9] = true;
    reserved[e % 10 === 9 ? NaN : e - 9] = true;
  };
  for (let i = 1; i < 5; i++) {
    const numberOfDecks = 5 - i;
    for (let ii = 0; ii < i; ii++) {
      const ship: number[] = [];
      let x = true;
      while (x) {
        const y = deck(numberOfDecks);
        if (y.every((e) => !reserved[e])) {
          x = false;
          y.forEach((e) => {
            field[e] = numberOfDecks;
            reservedPush(e);
            ship.push(e);
          });
        }
      }
      if (pc) {
        pcFlot[numberOfDecks].push(ship);
      } else {
        playerFlot[numberOfDecks].push(ship);
      }
    }
  }
  pc = true;
  return field;
};
