export const getImages = async (page: number) => {
  let avatars: Array<string> = [];
  const itemCount = 9;
  let intervalStart = page * itemCount;
  let intervalEnd = page * itemCount + itemCount;

  if (page === 1) {
    intervalStart = 1;
    intervalEnd = 10;
  }

  for (let i = intervalStart; i < intervalEnd; i++) {
    let image = `https://raw.githubusercontent.com/pain4metoo/words-data/master/avatars/${i}.jpg`;
    await fetch(image).then((response) => avatars.push(response.url));
  }

  return avatars;
};
