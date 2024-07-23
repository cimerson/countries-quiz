export const pickRandomCountry = (countries) => {
  const randomCountry =
    countries.length > 0
      ? countries[Math.floor(Math.random() * countries.length)]
      : null
  if (randomCountry) {
    return randomCountry
  }
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getShuffledArr = (arr) => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
  }
  return newArr
}

export const getQustionByType = ( option, capital ) => {
  if(option === 1){
    return 'Which country does this flag belong to?'
  }
  return `${capital} is the capital of`
}


